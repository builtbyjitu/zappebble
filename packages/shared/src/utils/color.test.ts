import { describe, it, expect } from 'vitest';
import {
  isValidHex,
  normalizeHex,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  calculateContrastRatio,
  getColorFormats
} from './color';

describe('color utils', () => {
  it('validates and normalizes 3-digit and 6-digit hex values', () => {
    expect(isValidHex('#fff')).toBe(true);
    expect(isValidHex('fff')).toBe(true);
    expect(isValidHex('#2563EB')).toBe(true);
    expect(isValidHex('2563eb')).toBe(true);
    expect(isValidHex('#zzz')).toBe(false);
    expect(isValidHex('#12345')).toBe(false);

    expect(normalizeHex('#fff')).toBe('#FFFFFF');
    expect(normalizeHex('2563eb')).toBe('#2563EB');
  });

  it('converts HEX to RGB accurately', () => {
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#2563EB')).toEqual({ r: 37, g: 99, b: 235 });
  });

  it('converts RGB to HEX accurately', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 255, 255)).toBe('#FFFFFF');
    expect(rgbToHex(37, 99, 235)).toBe('#2563EB');
  });

  it('converts RGB to HSL accurately', () => {
    // Pure Red
    expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
    // Pure Green
    expect(rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
    // Pure Blue
    expect(rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
    // White
    expect(rgbToHsl(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 });
    // Black
    expect(rgbToHsl(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 });
  });

  it('performs HSL to RGB conversion correctly', () => {
    expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
    expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
    expect(hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('calculates WCAG 2.1 contrast ratios accurately for known combinations', () => {
    const black = { r: 0, g: 0, b: 0 };
    const white = { r: 255, g: 255, b: 255 };

    // Black on White is standard 21.00:1
    const bwContrast = calculateContrastRatio(black, white);
    expect(bwContrast.ratio).toBe(21);
    expect(bwContrast.formattedRatio).toBe('21.00:1');
    expect(bwContrast.normalTextPassAA).toBe(true);
    expect(bwContrast.normalTextPassAAA).toBe(true);

    // Identical colors have 1.00:1 ratio
    const sameContrast = calculateContrastRatio(white, white);
    expect(sameContrast.ratio).toBe(1);
    expect(sameContrast.normalTextPassAA).toBe(false);

    // Blue #2563EB on white
    const blue = { r: 37, g: 99, b: 235 };
    const blueWhiteContrast = calculateContrastRatio(blue, white);
    expect(blueWhiteContrast.ratio).toBeGreaterThan(4.0);
  });

  it('generates complete color formats bundle', () => {
    const formats = getColorFormats('#2563EB');
    expect(formats).not.toBeNull();
    expect(formats?.hex).toBe('#2563EB');
    expect(formats?.rgb).toBe('rgb(37, 99, 235)');
    expect(formats?.hsl).toContain('hsl(');
  });
});
