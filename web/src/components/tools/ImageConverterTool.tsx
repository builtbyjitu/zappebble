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
  ArrowRight
} from 'lucide-react';

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
    <div className="space-y-8">
      {items.length === 0 && (
        <FileDropzone
          onFilesSelected={handleFilesAdded}
          accept=".jpg,.jpeg,.png,.webp"
          multiple={true}
          maxSizeMB={50}
          title="Drop your images here to convert"
          subtitle="Convert between JPG, PNG, and WebP formats • Up to 50MB per file"
        />
      )}

      {generalError && (
        <Alert
          type="error"
          title="Notice"
          message={generalError}
          onClose={() => setGeneralError(null)}
        />
      )}

      {items.length > 0 && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
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

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
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
              >
                Add More Images
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={clearAll}
                leftIcon={<Trash2 size={14} />}
              >
                Clear All
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={runConversion}
                isLoading={isProcessing}
                leftIcon={<RefreshCw size={16} />}
                className="grow md:grow-0"
              >
                {isProcessing
                  ? `Converting ${currentProcessIndex}/${items.length}...`
                  : `Convert to ${formatMimeLabel(targetFormat)}`}
              </Button>
            </div>
          </div>

          {/* Configuration Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            {/* 1. Target Format Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center">
                <RefreshCw size={14} className="mr-1.5 text-blue-500" />
                Select Target Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { mime: 'image/webp' as SupportedImageMime, label: 'WebP', desc: 'Modern & small' },
                  { mime: 'image/png' as SupportedImageMime, label: 'PNG', desc: 'Transparent' },
                  { mime: 'image/jpeg' as SupportedImageMime, label: 'JPG', desc: 'Universal' }
                ].map((fmt) => (
                  <button
                    key={fmt.mime}
                    type="button"
                    onClick={() => setTargetFormat(fmt.mime)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      targetFormat === fmt.mime
                        ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-sm">{fmt.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{fmt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Quality Slider (for lossy formats) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Quality: {quality}%
                </label>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                  {targetFormat === 'image/png' ? 'Lossless RGBA' : `${quality}% Encoding`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                disabled={targetFormat === 'image/png'}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-40"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {targetFormat === 'image/png'
                  ? 'PNG format uses lossless compression.'
                  : 'Adjust encoding quality for JPG and WebP outputs.'}
              </p>
            </div>

            {/* 3. Optional Resize */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center">
                  <Maximize2 size={14} className="mr-1.5 text-blue-500" />
                  Optional Resize
                </label>
                <label className="inline-flex items-center cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={resizeEnabled}
                    onChange={(e) => setResizeEnabled(e.target.checked)}
                    className="sr-only peer"
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
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                    <input
                      type="number"
                      placeholder="Height (px)"
                      value={targetHeight}
                      onChange={(e) => setTargetHeight(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setLockAspect(!lockAspect)}
                    className="flex items-center space-x-1.5 text-[11px] text-slate-500 hover:text-blue-600"
                  >
                    {lockAspect ? (
                      <Lock size={12} className="text-blue-500" />
                    ) : (
                      <Unlock size={12} className="text-slate-400" />
                    )}
                    <span>{lockAspect ? 'Lock aspect ratio' : 'Free aspect ratio'}</span>
                  </button>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Preserve original dimensions during conversion.
                </p>
              )}
            </div>
          </div>

          {/* Batch Download Banner */}
          {completedCount > 0 && (
            <div className="p-6 rounded-2xl bg-linear-to-r from-blue-500/10 via-indigo-500/10 to-teal-500/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <CheckCircle2 size={18} className="text-blue-500" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {completedCount === items.length
                      ? `All ${items.length} images converted to ${formatMimeLabel(targetFormat)}!`
                      : `${completedCount} of ${items.length} images converted`}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Download all converted files in one local ZIP package.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={downloadAllAsZip}
                isLoading={isZipping}
                leftIcon={<Archive size={16} />}
                className="w-full sm:w-auto shadow-md"
              >
                {completedCount > 1 ? 'Download All as ZIP' : 'Download Converted Image'}
              </Button>
            </div>
          )}

          {/* Items List */}
          <div className="space-y-3">
            {items.map((item) => {
              const isDone = item.status === 'done';
              const isError = item.status === 'error';
              const isItemProcessing = item.status === 'processing';

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                      <img
                        src={isDone && item.result?.url ? item.result.url : item.previewUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
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

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
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

                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    {isDone && item.result && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => downloadBlob(item.result!.blob, item.result!.filename)}
                        leftIcon={<Download size={14} />}
                      >
                        Download
                      </Button>
                    )}

                    {isItemProcessing && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center font-medium">
                        <RefreshCw size={13} className="animate-spin mr-1" />
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
