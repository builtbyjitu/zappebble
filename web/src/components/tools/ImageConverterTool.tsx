'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ImageFileItem,
  ImageProcessOptions,
  SupportedImageMime,
  validateImageFile,
  loadImageElement,
  processImage,
  formatBytes,
  calculateScaledDimensions,
  createZipArchive,
  downloadBlob,
  revokeObjectUrl,
  formatMimeLabel
} from '@webtools/shared';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import {
  RefreshCw,
  Sparkles,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Maximize2,
  Lock,
  Unlock,
  Archive,
  Image as ImageIcon,
  ArrowRight,
  RotateCcw,
  Check
} from 'lucide-react';

const FORMAT_OPTIONS: { mime: SupportedImageMime; label: string; desc: string }[] = [
  { mime: 'image/webp', label: 'WebP', desc: 'Modern & small (Best for web)' },
  { mime: 'image/png', label: 'PNG', desc: 'Lossless with transparency' },
  { mime: 'image/jpeg', label: 'JPG', desc: 'Universal compatibility' }
];

export function ImageConverterTool() {
  const [items, setItems] = useState<ImageFileItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<SupportedImageMime>('image/webp');
  const [quality, setQuality] = useState<number>(85);
  const [resizeEnabled, setResizeEnabled] = useState<boolean>(false);
  const [targetWidth, setTargetWidth] = useState<string>('');
  const [targetHeight, setTargetHeight] = useState<string>('');
  const [lockAspect, setLockAspect] = useState<boolean>(true);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentProcessIndex, setCurrentProcessIndex] = useState<number>(0);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        revokeObjectUrl(item.previewUrl);
        if (item.result?.url) {
          revokeObjectUrl(item.result.url);
        }
      });
    };
  }, []);

  const handleFilesAdded = useCallback(async (newFiles: File[]) => {
    setGeneralError(null);
    const validItems: ImageFileItem[] = [];
    const errors: string[] = [];

    for (const file of newFiles) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        errors.push(`${file.name}: ${validation.error}`);
        continue;
      }

      try {
        const { img, objectUrl } = await loadImageElement(file);
        const origW = img.naturalWidth || img.width;
        const origH = img.naturalHeight || img.height;

        validItems.push({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          name: file.name,
          originalSize: file.size,
          originalFormat: file.type.replace('image/', '').toUpperCase() || 'IMAGE',
          originalMime: file.type,
          originalDimensions: { width: origW, height: origH },
          previewUrl: objectUrl,
          status: 'pending'
        });
      } catch (err) {
        errors.push(`${file.name}: ${(err as Error).message}`);
      }
    }

    if (errors.length > 0) {
      setGeneralError(errors.join(' | '));
    }

    if (validItems.length > 0) {
      setItems((prev) => [...prev, ...validItems]);
      if (!targetWidth && !targetHeight && validItems[0].originalDimensions) {
        setTargetWidth(validItems[0].originalDimensions.width.toString());
        setTargetHeight(validItems[0].originalDimensions.height.toString());
      }
    }
  }, [targetWidth, targetHeight]);

  const removeItem = (id: string) => {
    setItems((prev) => {
      const itemToRemove = prev.find((item) => item.id === id);
      if (itemToRemove) {
        revokeObjectUrl(itemToRemove.previewUrl);
        if (itemToRemove.result?.url) {
          revokeObjectUrl(itemToRemove.result.url);
        }
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((item) => {
      revokeObjectUrl(item.previewUrl);
      if (item.result?.url) {
        revokeObjectUrl(item.result.url);
      }
    });
    setItems([]);
    setGeneralError(null);
    setIsProcessing(false);
  };

  const runConversion = async () => {
    if (items.length === 0 || isProcessing) return;

    setIsProcessing(true);
    setCurrentProcessIndex(0);
    setGeneralError(null);

    const parsedWidth = targetWidth ? parseInt(targetWidth, 10) : undefined;
    const parsedHeight = targetHeight ? parseInt(targetHeight, 10) : undefined;

    const options: ImageProcessOptions = {
      quality: quality / 100,
      format: targetFormat,
      resizeEnabled,
      targetWidth: isNaN(parsedWidth!) ? undefined : parsedWidth,
      targetHeight: isNaN(parsedHeight!) ? undefined : parsedHeight,
      lockAspectRatio: lockAspect
    };

    for (let i = 0; i < items.length; i++) {
      setCurrentProcessIndex(i + 1);
      const currentItem = items[i];

      setItems((prev) =>
        prev.map((item, idx) => (idx === i ? { ...item, status: 'processing' } : item))
      );

      try {
        const result = await processImage(currentItem.file, options);

        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: 'done', result } : item
          )
        );
      } catch (err) {
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? {
                  ...item,
                  status: 'error',
                  errorMessage: (err as Error).message || 'Failed to convert image'
                }
              : item
          )
        );
      }
    }

    setIsProcessing(false);
  };

  const downloadAllAsZip = async () => {
    const completedItems = items.filter((item) => item.status === 'done' && item.result);
    if (completedItems.length === 0) return;

    if (completedItems.length === 1) {
      const item = completedItems[0];
      if (item.result) {
        downloadBlob(item.result.blob, item.result.filename);
      }
      return;
    }

    setIsZipping(true);
    try {
      const zipEntries = completedItems.map((item) => ({
        name: item.result!.filename,
        blob: item.result!.blob
      }));

      const zipBlob = await createZipArchive(zipEntries);
      downloadBlob(zipBlob, `zappebble-converted-images-${Date.now()}.zip`);
    } catch (err) {
      setGeneralError('Failed to create ZIP archive: ' + (err as Error).message);
    } finally {
      setIsZipping(false);
    }
  };

  const completedCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="space-y-6">
      {/* 1. File Upload Dropzone when empty */}
      {items.length === 0 && (
        <FileDropzone
          onFilesSelected={handleFilesAdded}
          accept=".jpg,.jpeg,.png,.webp"
          multiple={true}
          maxSizeMB={50}
          title="Drop your images here to convert"
          subtitle="Convert between JPG, PNG, and WebP formats • Up to 50MB per file • 100% Local"
        />
      )}

      {/* Error Alert */}
      {generalError && (
        <Alert
          type="error"
          title="Notice"
          message={generalError}
          onClose={() => setGeneralError(null)}
        />
      )}

      {/* Screen Reader Live Status Announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {isProcessing && `Converting image ${currentProcessIndex} of ${items.length} to ${formatMimeLabel(targetFormat)}`}
        {!isProcessing && completedCount > 0 && `Conversion complete for ${completedCount} images`}
      </div>

      {items.length > 0 && (
        <div className="space-y-6">
          {/* 2. Top Selected Files Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                {items.length}
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {items.length === 1 ? '1 Image to Convert' : `${items.length} Images to Convert`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target format: <span className="font-bold text-blue-600 dark:text-blue-400">{formatMimeLabel(targetFormat)}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.jpg,.jpeg,.png,.webp';
                  input.multiple = true;
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files) handleFilesAdded(Array.from(files));
                  };
                  input.click();
                }}
                className="text-xs"
              >
                {items.length === 1 ? 'Change / Add Image' : 'Add More Images'}
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={clearAll}
                leftIcon={<Trash2 size={13} />}
                className="text-xs"
              >
                Clear
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={runConversion}
                disabled={isProcessing}
                isLoading={isProcessing}
                leftIcon={<RefreshCw size={15} />}
                className="font-semibold shadow-xs"
              >
                {isProcessing
                  ? `Converting ${currentProcessIndex}/${items.length}...`
                  : `Convert to ${formatMimeLabel(targetFormat)}`}
              </Button>
            </div>
          </div>

          {/* 3. Conversion Configuration Settings */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center">
              <Sparkles size={14} className="mr-1.5 text-blue-500" />
              <span>Conversion Settings</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 3A. Target Format Selection with Visual Radio Indicators */}
              <fieldset className="space-y-2.5">
                <legend className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center">
                  <RefreshCw size={13} className="mr-1.5 text-blue-500" />
                  <span>Select Target Format</span>
                </legend>
                <div
                  role="radiogroup"
                  aria-label="Target format"
                  className="grid grid-cols-3 gap-2"
                >
                  {FORMAT_OPTIONS.map((fmt) => {
                    const isSelected = targetFormat === fmt.mime;
                    return (
                      <button
                        key={fmt.mime}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setTargetFormat(fmt.mime)}
                        className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-slate-900 dark:text-white shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-sm font-bold">{fmt.label}</span>
                          {/* Visual Radio Indicator */}
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 dark:border-slate-600 bg-transparent'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                          {fmt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* 3B. Quality Slider */}
              <fieldset className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="converter-quality-slider"
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Quality: {quality}%
                  </label>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded">
                    {targetFormat === 'image/png' ? 'Lossless RGBA' : `${quality}% Encoding`}
                  </span>
                </div>
                <input
                  id="converter-quality-slider"
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  disabled={targetFormat === 'image/png'}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-valuemin={1}
                  aria-valuemax={100}
                  aria-valuenow={quality}
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {targetFormat === 'image/png'
                    ? 'PNG format uses lossless compression (quality setting disabled).'
                    : 'Adjust encoding quality for JPG and WebP outputs.'}
                </p>
              </fieldset>

              {/* 3C. Optional Resize Controls */}
              <fieldset className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center">
                    <Maximize2 size={13} className="mr-1.5 text-blue-500" />
                    <span>Optional Resize</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={resizeEnabled}
                      onChange={(e) => setResizeEnabled(e.target.checked)}
                      className="sr-only peer"
                      aria-label="Enable image resizing during conversion"
                    />
                    <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600 relative"></div>
                    <span className="ml-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                      {resizeEnabled ? 'Active' : 'Off'}
                    </span>
                  </label>
                </div>

                {resizeEnabled ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Width (px)"
                        value={targetWidth}
                        onChange={(e) => setTargetWidth(e.target.value)}
                        className="w-full h-8 px-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        aria-label="Target width in pixels"
                      />
                      <input
                        type="number"
                        placeholder="Height (px)"
                        value={targetHeight}
                        onChange={(e) => setTargetHeight(e.target.value)}
                        className="w-full h-8 px-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        aria-label="Target height in pixels"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setLockAspect(!lockAspect)}
                      className="flex items-center space-x-1.5 text-[11px] text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      {lockAspect ? (
                        <Lock size={12} className="text-blue-500" />
                      ) : (
                        <Unlock size={12} className="text-slate-400" />
                      )}
                      <span>{lockAspect ? 'Aspect ratio locked' : 'Free aspect ratio'}</span>
                    </button>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Original pixel dimensions are preserved during conversion.
                  </p>
                )}
              </fieldset>
            </div>
          </div>

          {/* 4. Conversion Result Banner */}
          {completedCount > 0 && (
            <div
              role="status"
              className="p-5 sm:p-6 rounded-2xl bg-linear-to-r from-blue-500/10 via-indigo-500/10 to-teal-500/10 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {completedCount === items.length
                      ? `All ${items.length} ${items.length === 1 ? 'image' : 'images'} converted to ${formatMimeLabel(targetFormat)}!`
                      : `${completedCount} of ${items.length} images converted`}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Ready to download. Files are packaged and saved directly in your browser.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  onClick={downloadAllAsZip}
                  isLoading={isZipping}
                  leftIcon={completedCount > 1 ? <Archive size={15} /> : <Download size={15} />}
                  className="w-full sm:w-auto shadow-xs font-semibold"
                >
                  {completedCount > 1 ? 'Download All as ZIP' : 'Download Converted Image'}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={clearAll}
                  leftIcon={<RotateCcw size={14} />}
                  className="w-full sm:w-auto text-xs"
                >
                  Convert More
                </Button>
              </div>
            </div>
          )}

          {/* 5. Converted / Queued Items List */}
          <div className="space-y-3">
            {items.map((item) => {
              const isDone = item.status === 'done';
              const isError = item.status === 'error';
              const isItemProcessing = item.status === 'processing';

              return (
                <div
                  key={item.id}
                  className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 shadow-2xs"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                      {item.previewUrl ? (
                        <img
                          src={isDone && item.result?.url ? item.result.url : item.previewUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <ImageIcon size={20} />
                        </div>
                      )}
                      {isDone && (
                        <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-1 rounded-tl">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                          {item.originalFormat}
                        </span>
                        {isDone && item.result && (
                          <>
                            <ArrowRight size={12} className="text-slate-400" />
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 shrink-0">
                              {formatMimeLabel(item.result.mimeType)}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        {item.originalDimensions && (
                          <span>
                            {item.originalDimensions.width} × {item.originalDimensions.height} px
                          </span>
                        )}
                        <span>Original: {formatBytes(item.originalSize)}</span>

                        {isDone && item.result && (
                          <>
                            <span>→ Result:</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {formatBytes(item.result.compressedSize)}
                            </span>
                          </>
                        )}
                      </div>

                      {isError && (
                        <p className="text-xs text-red-500 mt-1 flex items-center">
                          <AlertTriangle size={12} className="mr-1" />
                          {item.errorMessage || 'Error converting file'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    {isDone && item.result && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => downloadBlob(item.result!.blob, item.result!.filename)}
                        leftIcon={<Download size={13} />}
                        className="text-xs font-semibold"
                      >
                        Download
                      </Button>
                    )}

                    {isItemProcessing && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center font-medium">
                        <RefreshCw size={13} className="animate-spin mr-1.5" />
                        Converting...
                      </span>
                    )}

                    {!isProcessing && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Remove image"
                        aria-label="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

