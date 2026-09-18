export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  rgbObj: RGBColor;
  hslObj: HSLColor;
}

export interface WCAGContrastResult {
  ratio: number;
  formattedRatio: string;
  normalTextPassAA: boolean; // >= 4.5:1
  normalTextPassAAA: boolean; // >= 7.0:1
  largeTextPassAA: boolean; // >= 3.0:1
  largeTextPassAAA: boolean; // >= 4.5:1
}
