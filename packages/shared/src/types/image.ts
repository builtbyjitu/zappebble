export type SupportedImageMime = 'image/jpeg' | 'image/png' | 'image/webp';

export type OutputFormatOption = 'original' | SupportedImageMime;

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageProcessOptions {
  quality: number; // 0.01 to 1.0 (e.g. 0.8 for 80%)
  format: OutputFormatOption;
  resizeEnabled?: boolean;
  targetWidth?: number;
  targetHeight?: number;
  lockAspectRatio?: boolean;
}

export interface ImageProcessResult {
  blob: Blob;
  url: string;
  filename: string;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  reductionPercent: number;
  formattedReduction: string;
  mimeType: string;
}

export interface ImageFileItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalFormat: string;
  originalMime: string;
  originalDimensions?: ImageDimensions;
  previewUrl: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  errorMessage?: string;
  result?: ImageProcessResult;
}
