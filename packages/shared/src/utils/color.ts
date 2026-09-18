import { ColorFormats, HSLColor, RGBColor, WCAGContrastResult } from '../types/color';

/**
 * Validates if string is a 3 or 6 digit hex color (with or without #).
 */
export function isValidHex(hex: string): boolean {
  if (!hex) return false;
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex.trim());
}

/**
 * Normalizes hex code to standard uppercase 6-digit #RRGGBB format.
 */
export function normalizeHex(hex: string): string {
  let clean = hex.trim().replace(/^#/, '');

  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (clean.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(clean)) {
    return '#000000';
  }

  return `#${clean.toUpperCase()}`;
}

/**
 * Converts Hex string to RGBColor object.
 */
export function hexToRgb(hex: string): RGBColor | null {
  if (!isValidHex(hex)) return null;

  const normalized = normalizeHex(hex).slice(1);
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return { r, g, b };
}

/**
 * Converts RGB numbers to 6-digit Hex string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (num: number) => Math.min(255, Math.max(0, Math.round(num)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0').toUpperCase();

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts RGB numbers to HSL values (h: 0-360, s: 0-100, l: 0-100).
 */
export function rgbToHsl(r: number, g: number, b: number): HSLColor {
  const rNorm = Math.min(255, Math.max(0, r)) / 255;
  const gNorm = Math.min(255, Math.max(0, g)) / 255;
  const bNorm = Math.min(255, Math.max(0, b)) / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / delta + 2) * 60;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h) % 360,
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Converts HSL values to RGB values.
 */
export function hslToRgb(h: number, s: number, l: number): RGBColor {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = Math.min(100, Math.max(0, s)) / 100;
  const lNorm = Math.min(100, Math.max(0, l)) / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hNorm < 60) {
    rPrime = c;
    gPrime = x;
  } else if (hNorm < 120) {
    rPrime = x;
    gPrime = c;
  } else if (hNorm < 180) {
    gPrime = c;
    bPrime = x;
  } else if (hNorm < 240) {
    gPrime = x;
    bPrime = c;
  } else if (hNorm < 300) {
    rPrime = x;
    bPrime = c;
  } else {
    rPrime = c;
    bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255)
  };
}

/**
 * Compiles all color formats for a given Hex color.
 */
export function getColorFormats(hexInput: string): ColorFormats | null {
  const rgb = hexToRgb(hexInput);
  if (!rgb) return null;

  const hex = normalizeHex(hexInput);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return {
    hex,
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    rgbObj: rgb,
    hslObj: hsl
  };
}

/**
 * Computes WCAG 2.1 relative luminance for an sRGB color.
 */
export function calculateRelativeLuminance(rgb: RGBColor): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };

  const rLin = channel(rgb.r);
  const gLin = channel(rgb.g);
  const bLin = channel(rgb.b);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Calculates WCAG contrast ratio between foreground and background colors.
 */
export function calculateContrastRatio(
  foregroundRgb: RGBColor,
  backgroundRgb: RGBColor
): WCAGContrastResult {
  const lumA = calculateRelativeLuminance(foregroundRgb);
  const lumB = calculateRelativeLuminance(backgroundRgb);

  const l1 = Math.max(lumA, lumB);
  const l2 = Math.min(lumA, lumB);

  const ratio = (l1 + 0.05) / (l2 + 0.05);
  const roundedRatio = parseFloat(ratio.toFixed(2));

  return {
    ratio: roundedRatio,
    formattedRatio: `${roundedRatio.toFixed(2)}:1`,
    normalTextPassAA: ratio >= 4.5,
    normalTextPassAAA: ratio >= 7.0,
    largeTextPassAA: ratio >= 3.0,
    largeTextPassAAA: ratio >= 4.5
  };
}
