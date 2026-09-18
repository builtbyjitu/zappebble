import { describe, it, expect } from 'vitest';
import {
  validateImageFile,
  calculateScaledDimensions,
  mimeToExtension,
  formatMimeLabel,
  getOutputFilename,
  MAX_FILE_SIZE_BYTES
} from './image';

describe('image utils', () => {
  it('validates supported image files correctly', () => {
    const validJpg = new File(['mock'], 'test.jpg', { type: 'image/jpeg' });
    const validPng = new File(['mock'], 'test.png', { type: 'image/png' });
    const validWebp = new File(['mock'], 'test.webp', { type: 'image/webp' });
    const invalidPdf = new File(['mock'], 'doc.pdf', { type: 'application/pdf' });
    const emptyFile = new File([], 'empty.jpg', { type: 'image/jpeg' });

    expect(validateImageFile(validJpg).valid).toBe(true);
    expect(validateImageFile(validPng).valid).toBe(true);
    expect(validateImageFile(validWebp).valid).toBe(true);
    expect(validateImageFile(invalidPdf).valid).toBe(false);
    expect(validateImageFile(emptyFile).valid).toBe(false);
  });

  it('rejects files larger than 50MB', () => {
    const hugeFile = {
      name: 'large.jpg',
      type: 'image/jpeg',
      size: MAX_FILE_SIZE_BYTES + 1024
    } as unknown as File;

    const result = validateImageFile(hugeFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('50MB');
  });

  it('calculates scaled dimensions with aspect ratio preserved', () => {
    // 1920x1080 scaled to width 960 -> height should be 540
    const dims = calculateScaledDimensions(1920, 1080, 960, undefined, true);
    expect(dims.width).toBe(960);
    expect(dims.height).toBe(540);

    // 1920x1080 scaled to height 540 -> width should be 960
    const dims2 = calculateScaledDimensions(1920, 1080, undefined, 540, true);
    expect(dims2.width).toBe(960);
    expect(dims2.height).toBe(540);

    // 1920x1080 scaled within 800x800 box
    const dims3 = calculateScaledDimensions(1920, 1080, 800, 800, true);
    expect(dims3.width).toBe(800);
    expect(dims3.height).toBe(450);

    // Unlocked aspect ratio
    const dims4 = calculateScaledDimensions(1920, 1080, 500, 500, false);
    expect(dims4.width).toBe(500);
    expect(dims4.height).toBe(500);
  });

  it('formats mime labels and extensions properly', () => {
    expect(mimeToExtension('image/jpeg')).toBe('jpg');
    expect(mimeToExtension('image/png')).toBe('png');
    expect(mimeToExtension('image/webp')).toBe('webp');

    expect(formatMimeLabel('image/jpeg')).toBe('JPG');
    expect(formatMimeLabel('image/png')).toBe('PNG');
    expect(formatMimeLabel('image/webp')).toBe('WebP');
  });

  it('constructs correct output filenames', () => {
    expect(getOutputFilename('banner.png', 'image/jpeg', '-compressed')).toBe('banner-compressed.jpg');
    expect(getOutputFilename('photo.jpg', 'image/webp', '')).toBe('photo.webp');
    expect(getOutputFilename('image.webp', 'image/png', '-compressed')).toBe('image-compressed.png');
  });
});
