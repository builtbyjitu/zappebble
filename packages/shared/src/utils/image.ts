import {
  ImageDimensions,
  ImageProcessOptions,
  ImageProcessResult,
  SupportedImageMime
} from '../types/image';
import { calculateReduction, formatBytes } from './format';

export const SUPPORTED_IMAGE_TYPES: Record<string, SupportedImageMime> = {
  'image/jpeg': 'image/jpeg',
  'image/jpg': 'image/jpeg',
  'image/png': 'image/png',
  'image/webp': 'image/webp'
};

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

/**
 * Validates whether the given file is an acceptable image.
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  if (file.size === 0) {
    return { valid: false, error: 'The selected file is empty (0 bytes).' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 50MB limit for browser processing (${formatBytes(file.size)}).`
    };
  }

  const mime = file.type.toLowerCase();
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

  const isMimeSupported = Boolean(SUPPORTED_IMAGE_TYPES[mime]);
  const isExtSupported = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);

  if (!isMimeSupported && !isExtSupported) {
    return {
      valid: false,
      error: `This file format is not supported. Please upload a JPG, PNG, or WebP file.`
    };
  }

  return { valid: true };
}

/**
 * Loads an HTMLImageElement safely from a File.
 */
export function loadImageElement(file: File): Promise<{ img: HTMLImageElement; objectUrl: string }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({ img, objectUrl });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("We couldn't read this image. The file may be corrupted or unreadable."));
    };

    img.src = objectUrl;
  });
}

/**
 * Reads original width and height of an image file.
 */
export async function getImageDimensions(file: File): Promise<ImageDimensions> {
  const { img, objectUrl } = await loadImageElement(file);
  const dims = { width: img.naturalWidth || img.width, height: img.naturalHeight || img.height };
  URL.revokeObjectURL(objectUrl);
  return dims;
}

/**
 * Calculates target dimensions preserving aspect ratio if locked.
 */
export function calculateScaledDimensions(
  origW: number,
  origH: number,
  targetW?: number,
  targetH?: number,
  lockAspect = true
): ImageDimensions {
  if (!targetW && !targetH) {
    return { width: origW, height: origH };
  }

  let finalW = targetW ? Math.max(1, Math.round(targetW)) : origW;
  let finalH = targetH ? Math.max(1, Math.round(targetH)) : origH;

  if (lockAspect && origW > 0 && origH > 0) {
    const ratio = origW / origH;
    if (targetW && !targetH) {
      finalH = Math.max(1, Math.round(targetW / ratio));
    } else if (targetH && !targetW) {
      finalW = Math.max(1, Math.round(targetH * ratio));
    } else if (targetW && targetH) {
      // If both supplied with lock, fit within bounding box
      const wRatio = targetW / origW;
      const hRatio = targetH / origH;
      const scale = Math.min(wRatio, hRatio);
      finalW = Math.max(1, Math.round(origW * scale));
      finalH = Math.max(1, Math.round(origH * scale));
    }
  }

  return { width: finalW, height: finalH };
}

/**
 * Maps format string or mime to output extension.
 */
export function mimeToExtension(mime: string): string {
  switch (mime) {
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/jpeg':
    default:
      return 'jpg';
  }
}

/**
 * Creates friendly label for a MIME type.
 */
export function formatMimeLabel(mime: string): string {
  switch (mime) {
    case 'image/png':
      return 'PNG';
    case 'image/webp':
      return 'WebP';
    case 'image/jpeg':
      return 'JPG';
    default:
      return mime.replace('image/', '').toUpperCase();
  }
}

/**
 * Constructs destination filename with suffix or converted extension.
 */
export function getOutputFilename(
  originalName: string,
  targetMime: string,
  suffix = '-compressed'
): string {
  const dotIdx = originalName.lastIndexOf('.');
  const baseName = dotIdx !== -1 ? originalName.slice(0, dotIdx) : originalName;
  const targetExt = mimeToExtension(targetMime);

  return `${baseName}${suffix}.${targetExt}`;
}

/**
 * Yields control to the main thread to prevent UI freezing during batch operations.
 */
export function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => resolve());
    } else {
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Safely revokes an object URL if valid.
 */
export function revokeObjectUrl(url?: string): void {
  if (url && url.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      // Ignore
    }
  }
}

/**
 * Primary client-side image processing engine (handles compression and format conversion).
 */
export async function processImage(
  file: File,
  options: ImageProcessOptions
): Promise<ImageProcessResult> {
  // Validate file
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid file.');
  }

  // Determine output MIME type
  let targetMime: SupportedImageMime = 'image/jpeg';
  if (options.format === 'original') {
    const rawMime = file.type.toLowerCase();
    targetMime = SUPPORTED_IMAGE_TYPES[rawMime] || 'image/jpeg';
  } else {
    targetMime = options.format;
  }

  // Load image
  const { img, objectUrl } = await loadImageElement(file);

  try {
    const origW = img.naturalWidth || img.width;
    const origH = img.naturalHeight || img.height;

    // Calculate dimensions
    const dims = options.resizeEnabled
      ? calculateScaledDimensions(
          origW,
          origH,
          options.targetWidth,
          options.targetHeight,
          options.lockAspectRatio ?? true
        )
      : { width: origW, height: origH };

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = dims.width;
    canvas.height = dims.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Unable to initialize 2D canvas context.');
    }

    // When saving as JPEG, fill background with white if source has transparency
    if (targetMime === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, dims.width, dims.height);
    }

    // High quality scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw image onto canvas
    ctx.drawImage(img, 0, 0, dims.width, dims.height);

    // Yield before encoding
    await yieldToMain();

    // Convert canvas to Blob
    const clampedQuality = Math.min(1.0, Math.max(0.01, options.quality));

    const resultBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Browser canvas encoding failed.'));
          }
        },
        targetMime,
        clampedQuality
      );
    });

    // Cleanup canvas
    canvas.width = 0;
    canvas.height = 0;

    const originalSize = file.size;
    const compressedSize = resultBlob.size;
    const reduction = calculateReduction(originalSize, compressedSize);

    const isFormatConverted = targetMime !== (SUPPORTED_IMAGE_TYPES[file.type.toLowerCase()] || '');
    const filenameSuffix = isFormatConverted ? '' : '-compressed';
    const finalFilename = getOutputFilename(file.name, targetMime, filenameSuffix);
    const resultUrl = URL.createObjectURL(resultBlob);

    return {
      blob: resultBlob,
      url: resultUrl,
      filename: finalFilename,
      width: dims.width,
      height: dims.height,
      originalSize,
      compressedSize,
      savedBytes: reduction.savedBytes,
      reductionPercent: reduction.percent,
      formattedReduction: reduction.formattedPercent,
      mimeType: targetMime
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
