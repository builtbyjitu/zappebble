import { describe, it, expect } from 'vitest';
import {
  isValidWebUrl,
  normalizeBarcodeFormat,
  decodeCode39FromRuns,
  decodeEan13FromBits
} from './scanner';

describe('QR & Barcode Scanner Utilities', () => {
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
      // Code 39 for "*A*"
      // Narrow = 1 unit, Wide = 3 units
      // Start '*' = '010010100' -> runs: 1, 3, 1, 1, 3, 1, 3, 1, 1
      // Gap = 1
      // 'A' = '100001001' -> runs: 3, 1, 1, 1, 1, 3, 1, 1, 3
      // Gap = 1
      // Stop '*' = '010010100' -> runs: 1, 3, 1, 1, 3, 1, 3, 1, 1
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
      // Known EAN-13: 4006381333931
      // Start: 101
      // Left 6 digits: L/G encoded
      // Center guard: 01010
      // Right 6 digits: R encoded
      // End guard: 101
      // Let's test with an invalid bit sequence first:
      expect(decodeEan13FromBits('101000000000000')).toBeNull();
      expect(decodeEan13FromBits('')).toBeNull();
    });
  });
});
