'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  FileCheck,
  RotateCcw
} from 'lucide-react';

interface LoadedImageState {
  file: File;
  previewUrl: string;
  imgElement: HTMLImageElement;
  width: number;
  height: number;
}

const PAGE_SIZE_OPTIONS: { id: PdfPageSize; label: string; desc: string }[] = [
  { id: 'a4', label: 'ISO A4', desc: '210 × 297 mm' },
  { id: 'letter', label: 'US Letter', desc: '8.5 × 11 in' },
  { id: 'original', label: 'Image Size', desc: 'Exact dimensions' }
];

const ORIENTATION_OPTIONS: { id: PdfOrientation; label: string; desc: string }[] = [
  { id: 'auto', label: 'Auto Detect', desc: 'Matches image' },
  { id: 'portrait', label: 'Portrait', desc: 'Vertical' },
  { id: 'landscape', label: 'Landscape', desc: 'Horizontal' }
];

const FIT_OPTIONS: { id: PdfFit; label: string; desc: string }[] = [
  { id: 'fit', label: 'Fit to Page', desc: 'Best fit' },
  { id: 'fill', label: 'Fill Page', desc: 'Edge-to-edge' },
  { id: 'original', label: 'Original 1:1', desc: 'Exact scale' }
];

const MARGIN_OPTIONS: { id: PdfMargin; label: string; desc: string }[] = [
  { id: 'none', label: 'None', desc: '0 pt' },
  { id: 'small', label: 'Small', desc: '0.25 in' },
  { id: 'medium', label: 'Medium', desc: '0.5 in' }
];

export function ScreenshotPdfTool() {
  const [loadedImage, setLoadedImage] = useState<LoadedImageState | null>(null);
  const [customFilename, setCustomFilename] = useState<string>('');
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

      // Default filename to file's basename without extension
      setCustomFilename(file.name.replace(/\.[^/.]+$/, ''));
    } catch {
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
    setCustomFilename('');
  };

  // Live dimensions preview
  const previewDims = useMemo(() => {
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
    if (!loadedImage || isGenerating) return;
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

      const baseName = customFilename.trim() || loadedImage.file.name;
      const downloadName = sanitizePdfFilename(baseName);
      downloadBlob(pdfBlob, downloadName);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error notification */}
      {error && (
        <Alert type="error" title="Notice" message={error} onClose={() => setError(null)} />
      )}

      {/* Screen reader live status announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {isGenerating && 'Synthesizing PDF document in your browser...'}
        {!isGenerating && generatedPdfBlob && 'PDF document generated and downloaded successfully'}
      </div>

      {/* Upload Zone (when no image selected) */}
      {!loadedImage ? (
        <div className="space-y-4">
          <FileDropzone
            onFilesSelected={handleFilesSelected}
            accept=".png,.jpg,.jpeg,.webp"
            multiple={false}
            maxSizeMB={50}
            title="Drop your screenshot or image here"
            subtitle="Supports PNG, JPG, and WebP • Up to 50MB • 100% Client-Side"
          />

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
              <span>100% Client-Side PDF Synthesis • No files leave your computer</span>
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              ISO A4 • US Letter • Original Size
            </span>
          </div>
        </div>
      ) : (
        /* Image Preview & Settings Studio */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Paper Simulation Preview & File Meta */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden">
              {/* Image Info Top Bar */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {loadedImage.file.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {loadedImage.width} × {loadedImage.height} px • {formatBytes(loadedImage.file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <label className="cursor-pointer inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors">
                    <RefreshCw size={12} />
                    <span>Change</span>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp"
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
                    aria-label="Remove Image"
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              </div>

              {/* Realistic Paper Simulation Preview */}
              <div className="p-6 sm:p-8 bg-slate-100/80 dark:bg-slate-950/80 flex items-center justify-center min-h-[380px] overflow-hidden">
                <div
                  className="bg-white dark:bg-slate-900 rounded-sm shadow-xl p-3 border border-slate-300 dark:border-slate-700 flex items-center justify-center transition-all duration-200 relative"
                  style={{
                    aspectRatio: previewDims
                      ? `${previewDims.pageDims.width} / ${previewDims.pageDims.height}`
                      : 'auto',
                    maxWidth: '100%',
                    maxHeight: '380px'
                  }}
                >
                  <img
                    src={loadedImage.previewUrl}
                    alt={loadedImage.file.name}
                    className="object-contain max-h-[340px] rounded-xs shadow-2xs transition-all"
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
                    <Eye size={13} className="text-blue-500" />
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

          {/* Right Column: PDF Configuration Controls Studio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Sliders size={16} className="text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    PDF Document Settings
                  </h3>
                </div>
              </div>

              {/* Custom Document Filename */}
              <fieldset className="space-y-1.5">
                <label
                  htmlFor="pdf-custom-filename"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Document Filename
                </label>
                <div className="flex items-center">
                  <input
                    id="pdf-custom-filename"
                    type="text"
                    value={customFilename}
                    onChange={(e) => setCustomFilename(e.target.value)}
                    placeholder="screenshot"
                    className="w-full h-9 px-3 text-xs rounded-l-lg border border-r-0 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
                  />
                  <span className="h-9 px-3 text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-r-lg text-slate-500 flex items-center shrink-0">
                    .pdf
                  </span>
                </div>
              </fieldset>

              {/* Page Size */}
              <fieldset className="space-y-2">
                <legend className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Size
                </legend>
                <div
                  role="radiogroup"
                  aria-label="Page Size"
                  className="grid grid-cols-3 gap-2"
                >
                  {PAGE_SIZE_OPTIONS.map((item) => {
                    const isSelected = pageSize === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setPageSize(item.id)}
                        className={`p-2.5 text-center rounded-xl border transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs">{item.label}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Page Orientation */}
              <fieldset className="space-y-2">
                <legend className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Orientation
                </legend>
                <div
                  role="radiogroup"
                  aria-label="Page Orientation"
                  className="grid grid-cols-3 gap-2"
                >
                  {ORIENTATION_OPTIONS.map((item) => {
                    const isSelected = orientation === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setOrientation(item.id)}
                        className={`p-2.5 text-center rounded-xl border transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs">{item.label}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Image Scaling / Fit */}
              <fieldset className="space-y-2">
                <legend className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Image Scaling / Fit
                </legend>
                <div
                  role="radiogroup"
                  aria-label="Image Scaling / Fit"
                  className="grid grid-cols-3 gap-2"
                >
                  {FIT_OPTIONS.map((item) => {
                    const isSelected = fit === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setFit(item.id)}
                        className={`p-2.5 text-center rounded-xl border transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs">{item.label}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Page Margins */}
              <fieldset className="space-y-2">
                <legend className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Margins
                </legend>
                <div
                  role="radiogroup"
                  aria-label="Page Margins"
                  className="grid grid-cols-3 gap-2"
                >
                  {MARGIN_OPTIONS.map((item) => {
                    const isSelected = margin === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setMargin(item.id)}
                        className={`p-2.5 text-center rounded-xl border transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs">{item.label}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Generate & Download CTA */}
              <div className="pt-2 space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleGeneratePdf}
                  disabled={isGenerating}
                  isLoading={isGenerating}
                  leftIcon={generatedPdfBlob ? <FileCheck size={16} /> : <Download size={16} />}
                  className="w-full py-3 text-sm font-bold shadow-xs"
                >
                  {isGenerating
                    ? 'Synthesizing PDF Document...'
                    : generatedPdfBlob
                    ? 'Download PDF Again'
                    : 'Generate & Download PDF'}
                </Button>

                {generatedPdfBlob && (
                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-300">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                      <span>
                        PDF synthesized ({formatBytes(generatedPdfBlob.size)}).
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemove}
                      leftIcon={<RotateCcw size={12} />}
                      className="text-xs"
                    >
                      Convert Another
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy Guarantee Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-700 dark:text-slate-300">
                <ShieldCheck size={15} className="text-emerald-500" />
                <span>Zero Uploads Guarantee</span>
              </div>
              <p className="leading-relaxed">
                Images are converted to vector PDF streams entirely within your browser sandbox. No image or PDF data ever leaves your computer.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
