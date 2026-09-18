'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef } from 'react';
import {
  PdfOptions,
  PdfPageSize,
  PdfOrientation,
  PdfFit,
  PdfMargin,
  calculatePageDimensions,
  calculateImagePlacement,
  sanitizePdfFilename,
  createPdfFromImageSource,
  formatBytes,
  downloadBlob,
  revokeObjectUrl,
  validateImageFile,
  loadImageElement
} from '@webtools/shared';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import {
  FileText,
  Download,
  Trash2,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Maximize2,
  CheckCircle2,
  Sliders,
  Eye,
  FileCheck
} from 'lucide-react';

interface LoadedImageState {
  file: File;
  previewUrl: string;
  imgElement: HTMLImageElement;
  width: number;
  height: number;
}

export function ScreenshotPdfTool() {
  const [loadedImage, setLoadedImage] = useState<LoadedImageState | null>(null);
  const [pageSize, setPageSize] = useState<PdfPageSize>('a4');
  const [orientation, setOrientation] = useState<PdfOrientation>('auto');
  const [fit, setFit] = useState<PdfFit>('fit');
  const [margin, setMargin] = useState<PdfMargin>('small');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPdfBlob, setGeneratedPdfBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Track preview object URLs to revoke
  const activeUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (activeUrlRef.current) {
        revokeObjectUrl(activeUrlRef.current);
      }
    };
  }, []);

  const handleFilesSelected = async (files: File[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setError(null);
    setGeneratedPdfBlob(null);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid image file.');
      return;
    }

    try {
      if (activeUrlRef.current) {
        revokeObjectUrl(activeUrlRef.current);
      }

      const { img, objectUrl } = await loadImageElement(file);
      activeUrlRef.current = objectUrl;

      setLoadedImage({
        file,
        previewUrl: objectUrl,
        imgElement: img,
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    } catch (err) {
      setError('Unable to load image. The file may be corrupted or unreadable.');
    }
  };

  const handleRemove = () => {
    if (activeUrlRef.current) {
      revokeObjectUrl(activeUrlRef.current);
      activeUrlRef.current = null;
    }
    setLoadedImage(null);
    setGeneratedPdfBlob(null);
    setError(null);
  };

  // Live dimensions preview
  const previewDims = React.useMemo(() => {
    if (!loadedImage) return null;
    const pageDims = calculatePageDimensions(
      pageSize,
      orientation,
      loadedImage.width,
      loadedImage.height
    );
    const placement = calculateImagePlacement(
      pageDims.width,
      pageDims.height,
      loadedImage.width,
      loadedImage.height,
      fit,
      margin
    );
    return { pageDims, placement };
  }, [loadedImage, pageSize, orientation, fit, margin]);

  const handleGeneratePdf = async () => {
    if (!loadedImage) return;
    setIsGenerating(true);
    setError(null);

    try {
      const options: PdfOptions = {
        pageSize,
        orientation,
        fit,
        margin
      };

      const pdfBlob = await createPdfFromImageSource(loadedImage.imgElement, options, 0.95);
      setGeneratedPdfBlob(pdfBlob);

      const downloadName = sanitizePdfFilename(loadedImage.file.name);
      downloadBlob(pdfBlob, downloadName);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Error notification */}
      {error && (
        <Alert type="error" title="Error" message={error} onClose={() => setError(null)} />
      )}

      {/* Upload Zone (when no image selected) */}
      {!loadedImage ? (
        <div className="space-y-4">
          <FileDropzone
            onFilesSelected={handleFilesSelected}
            accept="image/png,image/jpeg,image/webp"
            multiple={false}
            subtitle="Drag & drop any screenshot or image (PNG, JPG, WebP) up to 50MB"
          />

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>100% Client-Side PDF Synthesis • No files leave your computer</span>
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              A4 • US Letter • Original Size
            </span>
          </div>
        </div>
      ) : (
        /* Image Preview & Settings Studio */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Image Preview & File Meta */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-xs">
                      {loadedImage.file.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {loadedImage.width} × {loadedImage.height} px • {formatBytes(loadedImage.file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors">
                    <RefreshCw size={13} />
                    <span>Change</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) handleFilesSelected(Array.from(e.target.files));
                      }}
                    />
                  </label>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemove}
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 p-1.5"
                    title="Remove Image"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              {/* Preview Container with paper simulation */}
              <div className="p-6 bg-slate-100/70 dark:bg-slate-950/70 flex items-center justify-center min-h-[360px] overflow-hidden">
                <div
                  className="bg-white dark:bg-slate-900 rounded-sm shadow-xl p-3 border border-slate-300 dark:border-slate-700 flex items-center justify-center transition-all duration-200"
                  style={{
                    aspectRatio: previewDims
                      ? `${previewDims.pageDims.width} / ${previewDims.pageDims.height}`
                      : 'auto',
                    maxWidth: '100%',
                    maxHeight: '400px'
                  }}
                >
                  <img
                    src={loadedImage.previewUrl}
                    alt="Screenshot Preview"
                    className="object-contain max-h-[360px] rounded shadow-xs"
                    style={{
                      width:
                        fit === 'fill'
                          ? '100%'
                          : fit === 'fit'
                          ? 'auto'
                          : undefined
                    }}
                  />
                </div>
              </div>

              {/* Dynamic Page Layout Stats */}
              {previewDims && (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
                  <span className="flex items-center space-x-1.5">
                    <Eye size={14} className="text-blue-500" />
                    <span>
                      Page: <strong>{Math.round(previewDims.pageDims.width)} × {Math.round(previewDims.pageDims.height)} pt</strong> ({previewDims.pageDims.orientation})
                    </span>
                  </span>
                  <span>
                    Rendered image: <strong>{Math.round(previewDims.placement.width)} × {Math.round(previewDims.placement.height)} pt</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: PDF Configuration Controls */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Sliders size={18} className="text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    PDF Document Settings
                  </h3>
                </div>
              </div>

              {/* Page Size */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'a4', label: 'ISO A4' },
                    { id: 'letter', label: 'US Letter' },
                    { id: 'original', label: 'Image Size' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPageSize(item.id as PdfPageSize)}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                        pageSize === item.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orientation */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Orientation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'auto', label: 'Auto Detect' },
                    { id: 'portrait', label: 'Portrait' },
                    { id: 'landscape', label: 'Landscape' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOrientation(item.id as PdfOrientation)}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                        orientation === item.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit Mode */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Image Scaling / Fit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fit', label: 'Fit to Page' },
                    { id: 'fill', label: 'Fill Page' },
                    { id: 'original', label: 'Original 1:1' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFit(item.id as PdfFit)}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                        fit === item.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Margins */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Margins
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'None (0pt)' },
                    { id: 'small', label: 'Small (0.25")' },
                    { id: 'medium', label: 'Medium (0.5")' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMargin(item.id as PdfMargin)}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                        margin === item.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate & Download CTA */}
              <div className="pt-2 space-y-3">
                <Button
                  onClick={handleGeneratePdf}
                  disabled={isGenerating}
                  className="w-full py-3 text-sm font-bold flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Synthesizing PDF Document...</span>
                    </>
                  ) : generatedPdfBlob ? (
                    <>
                      <FileCheck size={16} />
                      <span>Download PDF Again</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      <span>Generate & Download PDF</span>
                    </>
                  )}
                </Button>

                {generatedPdfBlob && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center space-x-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                    <span>
                      PDF generated successfully ({formatBytes(generatedPdfBlob.size)}). Check your downloads folder!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy Guarantee Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-700 dark:text-slate-300">
                <ShieldCheck size={15} className="text-emerald-500" />
                <span>Zero Uploads Guarantee</span>
              </div>
              <p className="leading-relaxed">
                Images are converted to vector PDF streams entirely within your browser&apos;s sandbox. No data is transmitted to external servers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
