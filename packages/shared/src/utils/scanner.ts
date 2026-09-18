import jsQR from 'jsqr';
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
// QR Code Decoding via jsQR (with preprocessing & inversion attempts)
// ---------------------------------------------------------------------------

/**
 * Decodes a QR code directly from an RGBA Uint8ClampedArray pixel buffer.
 */
export function decodeQrFromImageData(
  data: Uint8ClampedArray,
  width: number,
  height: number
): string | null {
  try {
    const code = jsQR(data, width, height, {
      inversionAttempts: 'attemptBoth'
    });
    return code?.data || null;
  } catch {
    return null;
  }
}

/**
 * Prepares an HTML canvas for scanning from an image, canvas, or video source.
 * Automatically paints a solid white background to ensure transparent PNGs decode properly.
 */
export function prepareCanvasForScanning(
  source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  targetWidth?: number,
  targetHeight?: number
): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;

  const naturalW =
    'videoWidth' in source && source.videoWidth
      ? source.videoWidth
      : 'naturalWidth' in source
      ? source.naturalWidth
      : source.width;
  const naturalH =
    'videoHeight' in source && source.videoHeight
      ? source.videoHeight
      : 'naturalHeight' in source
      ? source.naturalHeight
      : source.height;

  if (!naturalW || !naturalH || naturalW <= 0 || naturalH <= 0) {
    return null;
  }

  const w = targetWidth || naturalW;
  const h = targetHeight || naturalH;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  // Fill with solid white background to guarantee transparent PNGs have high-contrast background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(source, 0, 0, w, h);

  return canvas;
}

/**
 * Scans a visual source for a QR code using multi-pass resolution and contrast adjustments.
 */
export function scanQrCode(
  source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
): string | null {
  const naturalW =
    'videoWidth' in source && source.videoWidth
      ? source.videoWidth
      : 'naturalWidth' in source
      ? source.naturalWidth
      : source.width;
  const naturalH =
    'videoHeight' in source && source.videoHeight
      ? source.videoHeight
      : 'naturalHeight' in source
      ? source.naturalHeight
      : source.height;

  if (!naturalW || !naturalH) return null;

  const maxDimension = Math.max(naturalW, naturalH);

  // Pass 1: Original size (clamped to max 1600px for safety against huge phone captures)
  let w1 = naturalW;
  let h1 = naturalH;
  if (maxDimension > 1600) {
    const scale = 1600 / maxDimension;
    w1 = Math.round(naturalW * scale);
    h1 = Math.round(naturalH * scale);
  }

  const canvas1 = prepareCanvasForScanning(source, w1, h1);
  if (canvas1) {
    const ctx1 = canvas1.getContext('2d', { willReadFrequently: true });
    if (ctx1) {
      const imgData1 = ctx1.getImageData(0, 0, w1, h1);
      const res1 = decodeQrFromImageData(imgData1.data, w1, h1);
      if (res1) return res1;
    }
  }

  // Pass 2: Normalized size (800px) - effectively removes subpixel camera noise
  if (maxDimension > 900) {
    const scale2 = 800 / maxDimension;
    const w2 = Math.max(1, Math.round(naturalW * scale2));
    const h2 = Math.max(1, Math.round(naturalH * scale2));

    const canvas2 = prepareCanvasForScanning(source, w2, h2);
    if (canvas2) {
      const ctx2 = canvas2.getContext('2d', { willReadFrequently: true });
      if (ctx2) {
        const imgData2 = ctx2.getImageData(0, 0, w2, h2);
        const res2 = decodeQrFromImageData(imgData2.data, w2, h2);
        if (res2) return res2;
      }
    }
  }

  // Pass 3: Upscaling for tiny thumbnails (< 320px)
  if (maxDimension < 320) {
    const scale3 = 640 / maxDimension;
    const w3 = Math.round(naturalW * scale3);
    const h3 = Math.round(naturalH * scale3);

    const canvas3 = prepareCanvasForScanning(source, w3, h3);
    if (canvas3) {
      const ctx3 = canvas3.getContext('2d', { willReadFrequently: true });
      if (ctx3) {
        ctx3.imageSmoothingEnabled = false;
        ctx3.fillStyle = '#FFFFFF';
        ctx3.fillRect(0, 0, w3, h3);
        ctx3.drawImage(source, 0, 0, w3, h3);

        const imgData3 = ctx3.getImageData(0, 0, w3, h3);
        const res3 = decodeQrFromImageData(imgData3.data, w3, h3);
        if (res3) return res3;
      }
    }
  }

  return null;
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

  const sorted = [...runs].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const threshold = median * 1.5;

  const bits = runs.map((r) => (r > threshold ? '1' : '0'));
  let index = 0;
  let decoded = '';

  while (index + 9 <= bits.length) {
    const pattern = bits.slice(index, index + 9).join('');
    if (CODE39_REVERSE[pattern] === '*') {
      index += 10;
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
      return decoded.length > 0 ? decoded : null;
    }
    decoded += char;
    index += 10;
  }

  return null;
}

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
  if (bits.length < 95) return null;

  const startIdx = bits.indexOf('101');
  if (startIdx === -1 || startIdx + 95 > bits.length) return null;

  const dataBits = bits.slice(startIdx, startIdx + 95);

  if (dataBits.slice(45, 50) !== '01010') return null;
  if (dataBits.slice(92, 95) !== '101') return null;

  let leftType = '';
  let leftDigits = '';
  let rightDigits = '';

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

  for (let i = 0; i < 6; i++) {
    const mod = dataBits.slice(50 + i * 7, 50 + (i + 1) * 7);
    const rIdx = EAN_R_CODES.indexOf(mod);
    if (rIdx === -1) return null;
    rightDigits += rIdx.toString();
  }

  const firstDigit = EAN_FIRST_DIGIT[leftType];
  if (firstDigit === undefined) return null;

  const candidate = `${firstDigit}${leftDigits}${rightDigits}`;

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
    const bit = lum < luminanceThreshold ? 1 : 0;

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
 * Execution order:
 * 1. Native BarcodeDetector (if available in the browser)
 * 2. Fallback client-side QR Decoder (jsQR with multi-scale preprocessing)
 * 3. Fallback client-side 1D Barcode Decoder (Code 39, EAN-13, UPC-A)
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
      // Fallback to software decoders if BarcodeDetector throws or fails
    }
  }

  // 2. Fallback: Robust local QR Decoder (jsQR with multi-pass preprocessing)
  try {
    const qrText = scanQrCode(source);
    if (qrText) {
      return [
        {
          format: 'QR_CODE',
          value: qrText,
          isUrl: isValidWebUrl(qrText),
          timestamp: Date.now()
        }
      ];
    }
  } catch {
    // Continue to 1D barcodes
  }

  // 3. Fallback: Software 1D scanline decoding (Code 39, EAN-13, UPC-A)
  try {
    const canvas = prepareCanvasForScanning(source);
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
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
    }
  } catch {
    // Scanline attempt finished
  }

  return results;
}
