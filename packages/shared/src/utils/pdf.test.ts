import { describe, it, expect } from 'vitest';
import {
  calculatePageDimensions,
  calculateImagePlacement,
  getMarginPoints,
  sanitizePdfFilename,
  generatePdfFromJpegBytes,
  PAGE_SIZES,
  MARGIN_POINTS
} from './pdf';
import { PdfOptions } from '../types/pdf';

describe('PDF Utilities', () => {
  describe('Page Size and Orientation Calculations', () => {
    it('calculates A4 portrait dimensions', () => {
      const dims = calculatePageDimensions('a4', 'portrait', 800, 600);
      expect(dims.width).toBeCloseTo(PAGE_SIZES.a4.width, 1);
      expect(dims.height).toBeCloseTo(PAGE_SIZES.a4.height, 1);
      expect(dims.orientation).toBe('portrait');
    });

    it('calculates A4 landscape dimensions', () => {
      const dims = calculatePageDimensions('a4', 'landscape', 800, 600);
      expect(dims.width).toBeCloseTo(PAGE_SIZES.a4.height, 1);
      expect(dims.height).toBeCloseTo(PAGE_SIZES.a4.width, 1);
      expect(dims.orientation).toBe('landscape');
    });

    it('calculates Letter portrait and landscape dimensions', () => {
      const portrait = calculatePageDimensions('letter', 'portrait', 100, 200);
      expect(portrait.width).toBe(612);
      expect(portrait.height).toBe(792);
      expect(portrait.orientation).toBe('portrait');

      const landscape = calculatePageDimensions('letter', 'landscape', 200, 100);
      expect(landscape.width).toBe(792);
      expect(landscape.height).toBe(612);
      expect(landscape.orientation).toBe('landscape');
    });

    it('handles auto orientation correctly based on aspect ratio', () => {
      // Landscape image (width > height) -> auto chooses landscape
      const wide = calculatePageDimensions('a4', 'auto', 1200, 800);
      expect(wide.orientation).toBe('landscape');
      expect(wide.width).toBeGreaterThan(wide.height);

      // Tall image (height > width) -> auto chooses portrait
      const tall = calculatePageDimensions('a4', 'auto', 800, 1200);
      expect(tall.orientation).toBe('portrait');
      expect(tall.height).toBeGreaterThan(tall.width);
    });

    it('handles original size page matching image dimensions', () => {
      const original = calculatePageDimensions('original', 'portrait', 1920, 1080);
      expect(original.width).toBe(1920);
      expect(original.height).toBe(1080);
    });
  });

  describe('Margin and Image Placement', () => {
    it('returns correct margin points', () => {
      expect(getMarginPoints('none')).toBe(0);
      expect(getMarginPoints('small')).toBe(18);
      expect(getMarginPoints('medium')).toBe(36);
    });

    it('preserves aspect ratio with fit option', () => {
      const placement = calculateImagePlacement(
        600, // page width
        800, // page height
        1000, // image width (2:1 aspect ratio)
        500,  // image height
        'fit',
        'none'
      );

      // Page is 600x800. Image is 2:1.
      // Width fits at 600, scaled height becomes 300.
      expect(placement.width).toBe(600);
      expect(placement.height).toBe(300);
      // Centered vertically: (800 - 300) / 2 = 250
      expect(placement.x).toBe(0);
      expect(placement.y).toBe(250);
    });

    it('applies margins correctly to image placement', () => {
      const margin = 'small'; // 18 pt
      const marginPts = MARGIN_POINTS[margin];
      const placement = calculateImagePlacement(
        600,
        600,
        200,
        200,
        'fit',
        margin
      );

      const avail = 600 - 2 * marginPts;
      // Image is 1:1, available is avail x avail -> width and height will both be avail
      expect(placement.width).toBe(avail);
      expect(placement.height).toBe(avail);
      expect(placement.x).toBe(marginPts);
      expect(placement.y).toBe(marginPts);
    });

    it('handles fill page option', () => {
      const placement = calculateImagePlacement(
        500,
        700,
        1200,
        300,
        'fill',
        'none'
      );

      expect(placement.width).toBe(500);
      expect(placement.height).toBe(700);
      expect(placement.x).toBe(0);
      expect(placement.y).toBe(0);
    });
  });

  describe('Filename Sanitization', () => {
    it('sanitizes unsafe characters and ensures .pdf extension', () => {
      expect(sanitizePdfFilename('my screenshot (1).png')).toBe('my-screenshot-1.pdf');
      expect(sanitizePdfFilename('webpage/test:2*?.jpg')).toBe('webpage-test-2.pdf');
      expect(sanitizePdfFilename('already-clean.pdf')).toBe('already-clean.pdf');
      expect(sanitizePdfFilename('')).toBe('screenshot.pdf');
    });
  });

  describe('PDF Binary Generation', () => {
    it('generates a valid PDF-1.4 file structure from JPEG bytes', () => {
      const mockJpegBytes = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
      const options: PdfOptions = {
        pageSize: 'a4',
        orientation: 'portrait',
        fit: 'fit',
        margin: 'small'
      };

      const pdfBytes = generatePdfFromJpegBytes(mockJpegBytes, 800, 600, options);
      const pdfText = new TextDecoder('latin1').decode(pdfBytes);

      expect(pdfText.startsWith('%PDF-1.4')).toBe(true);
      expect(pdfText).toContain('/Type /Catalog');
      expect(pdfText).toContain('/Type /Pages');
      expect(pdfText).toContain('/Type /Page');
      expect(pdfText).toContain('/Type /XObject');
      expect(pdfText).toContain('/Subtype /Image');
      expect(pdfText).toContain('/Filter /DCTDecode');
      expect(pdfText).toContain('xref');
      expect(pdfText).toContain('trailer');
      expect(pdfText).toContain('startxref');
      expect(pdfText.trim().endsWith('%%EOF')).toBe(true);
    });
  });
});
