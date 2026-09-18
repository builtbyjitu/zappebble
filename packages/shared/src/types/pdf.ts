export type PdfPageSize = 'a4' | 'letter' | 'original';
export type PdfOrientation = 'portrait' | 'landscape' | 'auto';
export type PdfFit = 'fit' | 'fill' | 'original';
export type PdfMargin = 'none' | 'small' | 'medium';

export interface PdfOptions {
  pageSize: PdfPageSize;
  orientation: PdfOrientation;
  fit: PdfFit;
  margin: PdfMargin;
}

export interface PageDimensions {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
}

export interface ImagePlacement {
  x: number;
  y: number;
  width: number;
  height: number;
  pageWidth: number;
  pageHeight: number;
}
