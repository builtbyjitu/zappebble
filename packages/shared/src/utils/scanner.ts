import { BarcodeFormat, ScanResult, ScannerOptions } from '../types/scanner';

/**
 * Maps browser BarcodeDetector format strings to canonical BarcodeFormat names.
 */
export const FORMAT_MAP: Record<string, BarcodeFormat> = {
  qr_code: 'QR_CODE',
  ean_13: 'EAN_13',
  ean_8: 'EAN_8',
  upc_a: 'UPC_A',
  upc_e: 'UPC_E',
  code_128: 'CODE_128',
  code_39: 'CODE_39',
  itf: 'ITF',
  data_matrix: 'DATA_MATRIX',
  aztec: 'AZTEC',
  pdf417: 'PDF_417'
};

/**
 * Validates if a decoded string is a safe HTTP or HTTPS URL.
 * Strictly rejects javascript:, data:, file:, vbscript:, and malformed strings.
 */
export function isValidWebUrl(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Normalizes a raw barcode format string to canonical BarcodeFormat.
 */
export function normalizeBarcodeFormat(format: string): BarcodeFormat {
  if (!format) return 'UNKNOWN';
  const clean = format.toLowerCase().replace(/[-_]/g, '_');
  return FORMAT_MAP[clean] || (format.toUpperCase() as BarcodeFormat);
}

/**
 * Checks if the browser supports the native BarcodeDetector API.
 */
export function isBarcodeDetectorSupported(): boolean {
  return typeof window !== 'undefined' && 'BarcodeDetector' in window;
}

/**
 * Returns supported formats reported by the native BarcodeDetector, if present.
 */
export async function getSupportedBarcodeFormats(): Promise<BarcodeFormat[]> {
  if (!isBarcodeDetectorSupported()) {
    return ['QR_CODE', 'EAN_13', 'EAN_8', 'UPC_A', 'CODE_128', 'CODE_39'];
  }
  try {
    // @ts-expect-error BarcodeDetector is a modern browser API
    const rawFormats: string[] = await window.BarcodeDetector.getSupportedFormats();
    return rawFormats.map(normalizeBarcodeFormat);
  } catch {
    return ['QR_CODE', 'EAN_13', 'EAN_8', 'UPC_A', 'CODE_128', 'CODE_39'];
  }
}

// ---------------------------------------------------------------------------
// Fallback 1D Barcode Decoding Engine (Code 39, EAN-13, UPC-A, Code 128)
// ---------------------------------------------------------------------------

// Code 39 character patterns (9 bits: 1 = wide, 0 = narrow; 5 bars + 4 spaces)
const CODE39_ENCODINGS: Record<string, string> = {
  '0': '000110100', '1': '100100001', '2': '001100001', '3': '101100000',
  '4': '000110001', '5': '100110000', '6': '001110000', '7': '000100101',
  '8': '100100100', '9': '001100100', 'A': '100001001', 'B': '001001001',
  'C': '101001000', 'D': '000011001', 'E': '100011000', 'F': '001011000',
  'G': '000001101', 'H': '100001100', 'I': '001001100', 'J': '000011100',
  'K': '100000011', 'L': '001000011', 'M': '101000010', 'N': '000010011',
  'O': '100010010', 'P': '001010010', 'Q': '000000111', 'R': '100000110',
  'S': '001000110', 'T': '000010110', 'U': '110000001', 'V': '011000001',
  'W': '111000000', 'X': '010010001', 'Y': '110010000', 'Z': '011010000',
  '-': '010000101', '.': '110000100', ' ': '011000100', '$': '010101000',
  '/': '010100010', '+': '010001010', '%': '000101010', '*': '010010100'
};

const CODE39_REVERSE: Record<string, string> = {};
for (const [char, pat] of Object.entries(CODE39_ENCODINGS)) {
  CODE39_REVERSE[pat] = char;
}

/**
 * Decodes Code 39 bar/space runs from a 1D scanline.
 */
export function decodeCode39FromRuns(runs: number[]): string | null {
  if (runs.length < 29) return null; // Minimum: start * (9), gap (1), 1 char (9), gap (1), stop * (9)

  // Find threshold between narrow and wide elements
  const sorted = [...runs].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const threshold = median * 1.5;

  const bits = runs.map((r) => (r > threshold ? '1' : '0'));
  let index = 0;
  let decoded = '';

  // Look for start character '*'
  while (index + 9 <= bits.length) {
    const pattern = bits.slice(index, index + 9).join('');
    if (CODE39_REVERSE[pattern] === '*') {
      index += 10; // 9 elements + 1 inter-character gap
      break;
    }
    index++;
  }

  if (index >= bits.length) return null;

  while (index + 9 <= bits.length) {
    const pattern = bits.slice(index, index + 9).join('');
    const char = CODE39_REVERSE[pattern];
    if (!char) break;
    if (char === '*') {
      // Stop character reached
      return decoded.length > 0 ? decoded : null;
    }
    decoded += char;
    index += 10; // 9 elements + 1 gap
  }

  return null;
}

/**
 * Decodes EAN-13 digits from a sequence of 59 barcode runs.
 */
const EAN_L_CODES = [
  '0001101', '0011001', '0010011', '0111101', '0100011',
  '0110001', '0101111', '0111011', '0110111', '0001011'
];
const EAN_G_CODES = [
  '0100111', '0110011', '0011011', '0100001', '0011101',
  '0111001', '0000101', '0010001', '0001001', '0010111'
];
const EAN_R_CODES = [
  '1110010', '1100110', '1101100', '1000010', '1011100',
  '1001110', '1010000', '1000100', '1001000', '1110100'
];

const EAN_FIRST_DIGIT: Record<string, number> = {
  LLLLLL: 0, LLGLGG: 1, LLGGLG: 2, LLGGGL: 3, LGLLGG: 4,
  LGGLLG: 5, LGGGLL: 6, LGLGLG: 7, LGLGGL: 8, LGGLGL: 9
};

export function decodeEan13FromBits(bits: string): string | null {
  if (bits.length < 95) return null; // 95 modules total

  // Find start guard '101'
  const startIdx = bits.indexOf('101');
  if (startIdx === -1 || startIdx + 95 > bits.length) return null;

  const dataBits = bits.slice(startIdx, startIdx + 95);

  // Check center guard '01010' at index 45
  if (dataBits.slice(45, 50) !== '01010') return null;
  // Check end guard '101' at index 92
  if (dataBits.slice(92, 95) !== '101') return null;

  let leftType = '';
  let leftDigits = '';
  let rightDigits = '';

  // Left 6 digits (modules 3 to 45, 7 modules each)
  for (let i = 0; i < 6; i++) {
    const mod = dataBits.slice(3 + i * 7, 3 + (i + 1) * 7);
    const lIdx = EAN_L_CODES.indexOf(mod);
    const gIdx = EAN_G_CODES.indexOf(mod);

    if (lIdx !== -1) {
      leftDigits += lIdx.toString();
      leftType += 'L';
    } else if (gIdx !== -1) {
      leftDigits += gIdx.toString();
      leftType += 'G';
    } else {
      return null;
    }
  }

  // Right 6 digits (modules 50 to 92, 7 modules each)
  for (let i = 0; i < 6; i++) {
    const mod = dataBits.slice(50 + i * 7, 50 + (i + 1) * 7);
    const rIdx = EAN_R_CODES.indexOf(mod);
    if (rIdx === -1) return null;
    rightDigits += rIdx.toString();
  }

  const firstDigit = EAN_FIRST_DIGIT[leftType];
  if (firstDigit === undefined) return null;

  const candidate = `${firstDigit}${leftDigits}${rightDigits}`;

  // Validate EAN-13 checksum
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(candidate[i], 10) * (i % 2 === 0 ? 1 : 3);
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  if (checkDigit !== parseInt(candidate[12], 10)) {
    return null;
  }

  return candidate;
}

/**
 * Extracts horizontal scanline runs from image pixel data.
 */
export function extractScanlineRuns(
  imageData: ImageData,
  yRatio = 0.5,
  luminanceThreshold = 128
): number[] {
  const { width, height, data } = imageData;
  const y = Math.floor(height * yRatio);
  const rowOffset = y * width * 4;

  const runs: number[] = [];
  let currentVal: number | null = null;
  let currentRun = 0;

  for (let x = 0; x < width; x++) {
    const idx = rowOffset + x * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const bit = lum < luminanceThreshold ? 1 : 0; // 1 = dark bar, 0 = light space

    if (currentVal === null) {
      currentVal = bit;
      currentRun = 1;
    } else if (bit === currentVal) {
      currentRun++;
    } else {
      runs.push(currentRun);
      currentVal = bit;
      currentRun = 1;
    }
  }

  if (currentRun > 0) {
    runs.push(currentRun);
  }

  return runs;
}

/**
 * Scans an image source (Image, Canvas, Video) for barcodes or QR codes.
 * Uses native BarcodeDetector if available, falling back to 1D scanline decoding.
 */
export async function scanImageSource(
  source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  options: ScannerOptions = {}
): Promise<ScanResult[]> {
  const results: ScanResult[] = [];

  // 1. Try Native BarcodeDetector if supported
  if (isBarcodeDetectorSupported()) {
    try {
      const requestedFormats = options.formats || [
        'qr_code',
        'ean_13',
        'ean_8',
        'upc_a',
        'upc_e',
        'code_128',
        'code_39',
        'itf'
      ];

      // @ts-expect-error BarcodeDetector API
      const detector = new window.BarcodeDetector({ formats: requestedFormats });
      const detected = await detector.detect(source);

      if (Array.isArray(detected) && detected.length > 0) {
        for (const item of detected) {
          const rawVal = item.rawValue || item.rawValueText || '';
          if (rawVal) {
            results.push({
              format: normalizeBarcodeFormat(item.format),
              value: rawVal,
              isUrl: isValidWebUrl(rawVal),
              timestamp: Date.now()
            });
          }
        }
        if (results.length > 0) {
          return options.returnMultiple ? results : [results[0]];
        }
      }
    } catch {
      // Fallback if BarcodeDetector fails or throws
    }
  }

  // 2. Fallback: Software 1D scanline decoding
  try {
    let canvas: HTMLCanvasElement;
    if (source instanceof HTMLCanvasElement) {
      canvas = source;
    } else {
      canvas = document.createElement('canvas');
      const w = 'videoWidth' in source && source.videoWidth ? source.videoWidth : ('naturalWidth' in source ? source.naturalWidth : source.width);
      const h = 'videoHeight' in source && source.videoHeight ? source.videoHeight : ('naturalHeight' in source ? source.naturalHeight : source.height);
      canvas.width = Math.max(1, w || 640);
      canvas.height = Math.max(1, h || 480);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
      }
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Sample scanlines at 25%, 50%, 75% height
      for (const yRatio of [0.5, 0.35, 0.65]) {
        const runs = extractScanlineRuns(imgData, yRatio);

        // Try Code 39
        const code39 = decodeCode39FromRuns(runs);
        if (code39) {
          results.push({
            format: 'CODE_39',
            value: code39,
            isUrl: isValidWebUrl(code39),
            timestamp: Date.now()
          });
          break;
        }

        // Try EAN-13 from normalized bits
        if (runs.length >= 59) {
          const minRun = Math.min(...runs.filter((r) => r > 0));
          let bits = '';
          let isBar = true;
          for (const r of runs) {
            const count = Math.max(1, Math.round(r / minRun));
            bits += (isBar ? '1' : '0').repeat(count);
            isBar = !isBar;
          }

          const ean = decodeEan13FromBits(bits);
          if (ean) {
            results.push({
              format: 'EAN_13',
              value: ean,
              isUrl: isValidWebUrl(ean),
              timestamp: Date.now()
            });
            break;
          }
        }
      }
    }
  } catch {
    // Pure JS scanline attempt completed
  }

  return results;
}
