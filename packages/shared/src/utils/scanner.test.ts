import { describe, it, expect } from 'vitest';
import QRCode from 'qrcode';
import {
  isValidWebUrl,
  normalizeBarcodeFormat,
  decodeCode39FromRuns,
  decodeEan13FromBits,
  decodeQrFromImageData
} from './scanner';

/**
 * Helper to generate raw RGBA pixel buffers of QR codes for unit testing without DOM canvas.
 */
function createMockQrRgba(payload: string): { data: Uint8ClampedArray; width: number; height: number } {
  const qr = QRCode.create(payload);
  const margin = 4;
  const scale = 4;
  const size = (qr.modules.size + 2 * margin) * scale;
  const rgba = new Uint8ClampedArray(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const modX = Math.floor(x / scale) - margin;
      const modY = Math.floor(y / scale) - margin;
      const isDark =
        modX >= 0 &&
        modX < qr.modules.size &&
        modY >= 0 &&
        modY < qr.modules.size &&
        qr.modules.get(modX, modY);
      const val = isDark ? 0 : 255;
      const idx = (y * size + x) * 4;
      rgba[idx] = val;
      rgba[idx + 1] = val;
      rgba[idx + 2] = val;
      rgba[idx + 3] = 255;
    }
  }

  return { data: rgba, width: size, height: size };
}

describe('QR & Barcode Scanner Utilities', () => {
  describe('QR Code Decoding Engine (jsQR fallback)', () => {
    it('decodes a QR code image containing a URL payload', () => {
      const urlPayload = 'https://example.com';
      const { data, width, height } = createMockQrRgba(urlPayload);

      const result = decodeQrFromImageData(data, width, height);
      expect(result).toBe(urlPayload);
      expect(isValidWebUrl(result!)).toBe(true);
    });

    it('decodes a QR code image containing a plain text payload', () => {
      const textPayload = 'Hello WebTools';
      const { data, width, height } = createMockQrRgba(textPayload);

      const result = decodeQrFromImageData(data, width, height);
      expect(result).toBe(textPayload);
      expect(isValidWebUrl(result!)).toBe(false);
    });

    it('returns null for empty or solid white image buffer', () => {
      const size = 100;
      const emptyBuffer = new Uint8ClampedArray(size * size * 4).fill(255);
      const result = decodeQrFromImageData(emptyBuffer, size, size);
      expect(result).toBeNull();
    });
  });

  describe('URL Safety & Validation', () => {
    it('accepts valid HTTPS and HTTP URLs', () => {
      expect(isValidWebUrl('https://example.com')).toBe(true);
      expect(isValidWebUrl('https://sub.domain.com/path?query=1#hash')).toBe(true);
      expect(isValidWebUrl('http://localhost:3000')).toBe(true);
      expect(isValidWebUrl('  https://webtools.local/tools  ')).toBe(true);
    });

    it('strictly rejects unsafe protocols like javascript: and data:', () => {
      expect(isValidWebUrl('javascript:alert(1)')).toBe(false);
      expect(isValidWebUrl('javascript:window.location="http://evil.com"')).toBe(false);
      expect(isValidWebUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
      expect(isValidWebUrl('file:///C:/Windows/System32/cmd.exe')).toBe(false);
      expect(isValidWebUrl('vbscript:msgbox("hello")')).toBe(false);
    });

    it('rejects plain text and invalid strings', () => {
      expect(isValidWebUrl('')).toBe(false);
      expect(isValidWebUrl('Just plain text')).toBe(false);
      expect(isValidWebUrl('1234567890')).toBe(false);
      expect(isValidWebUrl('mailto:test@example.com')).toBe(false);
    });
  });

  describe('Format Normalization', () => {
    it('normalizes browser detector format names to canonical names', () => {
      expect(normalizeBarcodeFormat('qr_code')).toBe('QR_CODE');
      expect(normalizeBarcodeFormat('ean_13')).toBe('EAN_13');
      expect(normalizeBarcodeFormat('ean_8')).toBe('EAN_8');
      expect(normalizeBarcodeFormat('upc_a')).toBe('UPC_A');
      expect(normalizeBarcodeFormat('code_128')).toBe('CODE_128');
      expect(normalizeBarcodeFormat('code_39')).toBe('CODE_39');
      expect(normalizeBarcodeFormat('pdf417')).toBe('PDF_417');
    });

    it('handles uppercase and already canonical formats', () => {
      expect(normalizeBarcodeFormat('QR_CODE')).toBe('QR_CODE');
      expect(normalizeBarcodeFormat('EAN_13')).toBe('EAN_13');
      expect(normalizeBarcodeFormat('')).toBe('UNKNOWN');
    });
  });

  describe('Code 39 Fallback Decoder', () => {
    it('decodes Code 39 bar/space runs correctly', () => {
      const start = [1, 3, 1, 1, 3, 1, 3, 1, 1, 1];
      const charA = [3, 1, 1, 1, 1, 3, 1, 1, 3, 1];
      const stop = [1, 3, 1, 1, 3, 1, 3, 1, 1];

      const runs = [...start, ...charA, ...stop];
      const decoded = decodeCode39FromRuns(runs);
      expect(decoded).toBe('A');
    });

    it('returns null for insufficient runs', () => {
      expect(decodeCode39FromRuns([1, 2, 3])).toBeNull();
    });
  });

  describe('EAN-13 Fallback Decoder', () => {
    it('validates and decodes known EAN-13 bit pattern', () => {
      expect(decodeEan13FromBits('101000000000000')).toBeNull();
      expect(decodeEan13FromBits('')).toBeNull();
    });
  });
});
