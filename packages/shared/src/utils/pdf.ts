import {
  ImagePlacement,
  PageDimensions,
  PdfFit,
  PdfMargin,
  PdfOptions,
  PdfOrientation,
  PdfPageSize
} from '../types/pdf';

// Standard paper dimensions in points (72 points per inch)
export const PAGE_SIZES: Record<'a4' | 'letter', { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 }, // 210mm x 297mm
  letter: { width: 612.0, height: 792.0 } // 8.5in x 11in
};

export const MARGIN_POINTS: Record<PdfMargin, number> = {
  none: 0,
  small: 18, // 0.25 inch
  medium: 36 // 0.5 inch
};

/**
 * Returns margin in PDF points.
 */
export function getMarginPoints(margin: PdfMargin): number {
  return MARGIN_POINTS[margin] ?? 0;
}

/**
 * Calculates page dimensions and orientation based on user settings and image aspect ratio.
 */
export function calculatePageDimensions(
  pageSize: PdfPageSize,
  orientation: PdfOrientation,
  imageWidth: number,
  imageHeight: number
): PageDimensions {
  const safeImgW = Math.max(1, imageWidth || 800);
  const safeImgH = Math.max(1, imageHeight || 600);

  // Determine resolved orientation
  let resolvedOrientation: 'portrait' | 'landscape';
  if (orientation === 'auto') {
    resolvedOrientation = safeImgW > safeImgH ? 'landscape' : 'portrait';
  } else {
    resolvedOrientation = orientation;
  }

  // If original, page dimensions match the image dimensions in points
  if (pageSize === 'original') {
    return {
      width: safeImgW,
      height: safeImgH,
      orientation: resolvedOrientation
    };
  }

  const base = PAGE_SIZES[pageSize] || PAGE_SIZES.a4;
  const shortSide = Math.min(base.width, base.height);
  const longSide = Math.max(base.width, base.height);

  if (resolvedOrientation === 'landscape') {
    return {
      width: longSide,
      height: shortSide,
      orientation: 'landscape'
    };
  }

  return {
    width: shortSide,
    height: longSide,
    orientation: 'portrait'
  };
}

/**
 * Computes the placement coordinates and scaled dimensions of the image on the PDF page.
 */
export function calculateImagePlacement(
  pageWidth: number,
  pageHeight: number,
  imageWidth: number,
  imageHeight: number,
  fit: PdfFit,
  margin: PdfMargin
): ImagePlacement {
  const safePageW = Math.max(1, pageWidth);
  const safePageH = Math.max(1, pageHeight);
  const safeImgW = Math.max(1, imageWidth);
  const safeImgH = Math.max(1, imageHeight);

  const marginPts = getMarginPoints(margin);
  const availW = Math.max(1, safePageW - 2 * marginPts);
  const availH = Math.max(1, safePageH - 2 * marginPts);

  let targetW: number;
  let targetH: number;
  let x: number;
  let y: number;

  switch (fit) {
    case 'fill': {
      // Scale to completely fill the available space (ignoring aspect ratio)
      targetW = availW;
      targetH = availH;
      x = marginPts;
      y = marginPts;
      break;
    }

    case 'original': {
      // Use original pixel dimensions as points
      targetW = safeImgW;
      targetH = safeImgH;
      // Center on page
      x = marginPts + (availW - targetW) / 2;
      y = marginPts + (availH - targetH) / 2;
      break;
    }

    case 'fit':
    default: {
      // Uniformly scale to fit within available space while preserving aspect ratio
      const scale = Math.min(availW / safeImgW, availH / safeImgH);
      targetW = safeImgW * scale;
      targetH = safeImgH * scale;
      // Center on page
      x = marginPts + (availW - targetW) / 2;
      y = marginPts + (availH - targetH) / 2;
      break;
    }
  }

  return {
    x,
    y,
    width: targetW,
    height: targetH,
    pageWidth: safePageW,
    pageHeight: safePageH
  };
}

/**
 * Sanitizes a filename for PDF export.
 * Replaces spaces/unsafe characters and ensures a .pdf extension.
 */
export function sanitizePdfFilename(filename: string): string {
  if (!filename || typeof filename !== 'string') {
    return 'screenshot.pdf';
  }

  // Remove extension
  const withoutExt = filename.replace(/\.[^/.]+$/, '').trim();
  // Replace unsafe characters
  const clean = withoutExt
    .replace(/[^\w.-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const base = clean || 'screenshot';
  return `${base}.pdf`;
}

/**
 * Encodes an ASCII string into a Uint8Array.
 */
function encodeAscii(str: string): Uint8Array {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i) & 0xff;
  }
  return bytes;
}

/**
 * Combines multiple Uint8Arrays into one.
 */
function concatUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  let totalLength = 0;
  for (const a of arrays) {
    totalLength += a.length;
  }
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const a of arrays) {
    result.set(a, offset);
    offset += a.length;
  }
  return result;
}

/**
 * Generates a valid, self-contained PDF-1.4 binary document from JPEG bytes.
 */
export function generatePdfFromJpegBytes(
  jpegBytes: Uint8Array,
  imageWidth: number,
  imageHeight: number,
  options: PdfOptions
): Uint8Array {
  const pageDims = calculatePageDimensions(
    options.pageSize,
    options.orientation,
    imageWidth,
    imageHeight
  );

  const placement = calculateImagePlacement(
    pageDims.width,
    pageDims.height,
    imageWidth,
    imageHeight,
    options.fit,
    options.margin
  );

  // PDF coordinate origin is bottom-left
  const pdfX = placement.x;
  const pdfY = pageDims.height - placement.y - placement.height;

  const contentStreamText =
    `q\n` +
    `${placement.width.toFixed(2)} 0 0 ${placement.height.toFixed(2)} ${pdfX.toFixed(2)} ${pdfY.toFixed(2)} cm\n` +
    `/Im1 Do\n` +
    `Q\n`;

  const contentStreamBytes = encodeAscii(contentStreamText);

  const parts: Uint8Array[] = [];
  const offsets: number[] = [0]; // index 0 unused, objects 1 to 5

  const append = (strOrBytes: string | Uint8Array) => {
    const b = typeof strOrBytes === 'string' ? encodeAscii(strOrBytes) : strOrBytes;
    parts.push(b);
  };

  const currentLength = () => {
    let len = 0;
    for (const p of parts) len += p.length;
    return len;
  };

  // Header
  append('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  // Object 1: Catalog
  offsets[1] = currentLength();
  append(
    `1 0 obj\n` +
    `<<\n` +
    `  /Type /Catalog\n` +
    `  /Pages 2 0 R\n` +
    `>>\n` +
    `endobj\n`
  );

  // Object 2: Pages
  offsets[2] = currentLength();
  append(
    `2 0 obj\n` +
    `<<\n` +
    `  /Type /Pages\n` +
    `  /Kids [3 0 R]\n` +
    `  /Count 1\n` +
    `>>\n` +
    `endobj\n`
  );

  // Object 3: Page
  offsets[3] = currentLength();
  append(
    `3 0 obj\n` +
    `<<\n` +
    `  /Type /Page\n` +
    `  /Parent 2 0 R\n` +
    `  /MediaBox [0 0 ${pageDims.width.toFixed(2)} ${pageDims.height.toFixed(2)}]\n` +
    `  /Contents 4 0 R\n` +
    `  /Resources <<\n` +
    `    /XObject <<\n` +
    `      /Im1 5 0 R\n` +
    `    >>\n` +
    `  >>\n` +
    `>>\n` +
    `endobj\n`
  );

  // Object 4: Content Stream
  offsets[4] = currentLength();
  append(
    `4 0 obj\n` +
    `<<\n` +
    `  /Length ${contentStreamBytes.length}\n` +
    `>>\n` +
    `stream\n`
  );
  append(contentStreamBytes);
  append(`endstream\nendobj\n`);

  // Object 5: Image XObject
  offsets[5] = currentLength();
  append(
    `5 0 obj\n` +
    `<<\n` +
    `  /Type /XObject\n` +
    `  /Subtype /Image\n` +
    `  /Width ${Math.round(imageWidth)}\n` +
    `  /Height ${Math.round(imageHeight)}\n` +
    `  /ColorSpace /DeviceRGB\n` +
    `  /BitsPerComponent 8\n` +
    `  /Filter /DCTDecode\n` +
    `  /Length ${jpegBytes.length}\n` +
    `>>\n` +
    `stream\n`
  );
  append(jpegBytes);
  append(`\nendstream\nendobj\n`);

  // Xref table
  const startXref = currentLength();
  append(`xref\n0 6\n`);
  append(`0000000000 65535 f \n`);
  for (let i = 1; i <= 5; i++) {
    const offStr = offsets[i].toString().padStart(10, '0');
    append(`${offStr} 00000 n \n`);
  }

  // Trailer
  append(
    `trailer\n` +
    `<<\n` +
    `  /Size 6\n` +
    `  /Root 1 0 R\n` +
    `>>\n` +
    `startxref\n` +
    `${startXref}\n` +
    `%%EOF\n`
  );

  return concatUint8Arrays(parts);
}

/**
 * Client-side helper that renders an HTML image or canvas into a JPEG Uint8Array,
 * then generates a PDF Blob ready for download.
 */
export async function createPdfFromImageSource(
  source: HTMLImageElement | HTMLCanvasElement,
  options: PdfOptions,
  quality = 0.92
): Promise<Blob> {
  const width = 'naturalWidth' in source ? source.naturalWidth : source.width;
  const height = 'naturalHeight' in source ? source.naturalHeight : source.height;

  // Create canvas to normalize image to standard JPEG bytes
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to acquire 2D canvas context for PDF generation.');
  }

  // Fill with white background in case of PNG/WebP transparency
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(source, 0, 0, width, height);

  // Convert to JPEG blob
  const jpegBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to encode image to JPEG for PDF embedding.'));
      },
      'image/jpeg',
      quality
    );
  });

  const arrayBuffer = await jpegBlob.arrayBuffer();
  const jpegBytes = new Uint8Array(arrayBuffer);

  const pdfBytes = generatePdfFromJpegBytes(jpegBytes, width, height, options);
  return new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
}
