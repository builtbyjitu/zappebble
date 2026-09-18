'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ImageFileItem,
  ImageProcessOptions,
  OutputFormatOption,
  validateImageFile,
  loadImageElement,
  processImage,
  formatBytes,
  calculateScaledDimensions,
  createZipArchive,
  downloadBlob,
  revokeObjectUrl
} from '@webtools/shared';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import {
  Sliders,
  Sparkles,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Maximize2,
  Lock,
  Unlock,
  Archive,
  Image as ImageIcon
} from 'lucide-react';

export function ImageCompressorTool() {
  const [items, setItems] = useState<ImageFileItem[]>([]);
  const [quality, setQuality] = useState<number>(80);
  const [outputFormat, setOutputFormat] = useState<OutputFormatOption>('original');
  const [resizeEnabled, setResizeEnabled] = useState<boolean>(false);
  const [targetWidth, setTargetWidth] = useState<string>('');
  const [targetHeight, setTargetHeight] = useState<string>('');
  const [lockAspect, setLockAspect] = useState<boolean>(true);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentProcessIndex, setCurrentProcessIndex] = useState<number>(0);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  // Keep references to revoke URLs on unmount
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    return () => {
      // Cleanup all object URLs
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
      // If resize width/height not set, initialize to first image dims
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

  const runCompression = async () => {
    if (items.length === 0 || isProcessing) return;

    setIsProcessing(true);
    setCurrentProcessIndex(0);
    setGeneralError(null);

    const parsedWidth = targetWidth ? parseInt(targetWidth, 10) : undefined;
    const parsedHeight = targetHeight ? parseInt(targetHeight, 10) : undefined;

    const options: ImageProcessOptions = {
      quality: quality / 100,
      format: outputFormat,
      resizeEnabled,
      targetWidth: isNaN(parsedWidth!) ? undefined : parsedWidth,
      targetHeight: isNaN(parsedHeight!) ? undefined : parsedHeight,
      lockAspectRatio: lockAspect
    };

    for (let i = 0; i < items.length; i++) {
      setCurrentProcessIndex(i + 1);
      const currentItem = items[i];

      // Mark as processing
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
                  errorMessage: (err as Error).message || 'Failed to compress image'
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
      // Direct download if single item
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
      downloadBlob(zipBlob, `zappebble-compressed-images-${Date.now()}.zip`);
    } catch (err) {
      setGeneralError('Failed to create ZIP archive: ' + (err as Error).message);
    } finally {
      setIsZipping(false);
    }
  };

  const completedCount = items.filter((i) => i.status === 'done').length;
  const totalOriginalBytes = items
    .filter((i) => i.status === 'done' && i.result)
    .reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressedBytes = items
    .filter((i) => i.status === 'done' && i.result)
    .reduce((acc, curr) => acc + curr.result!.compressedSize, 0);
  const totalSavedBytes = Math.max(0, totalOriginalBytes - totalCompressedBytes);
  const totalReduction =
    totalOriginalBytes > 0 ? ((totalSavedBytes / totalOriginalBytes) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-8">
      {/* Upload Zone when empty */}
      {items.length === 0 && (
        <FileDropzone
          onFilesSelected={handleFilesAdded}
          accept=".jpg,.jpeg,.png,.webp"
          multiple={true}
          maxSizeMB={50}
          title="Drop your images here, or click to browse"
          subtitle="Supports JPG, PNG, and WebP • Multiple files supported"
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
          {/* Top Action Bar & Settings Summary */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                {items.length}
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {items.length === 1 ? '1 Image Selected' : `${items.length} Images Selected`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total raw size: {formatBytes(items.reduce((acc, i) => acc + i.originalSize, 0))}
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
                onClick={runCompression}
                isLoading={isProcessing}
                leftIcon={<Sparkles size={16} />}
                className="grow md:grow-0"
              >
                {isProcessing
                  ? `Compressing ${currentProcessIndex}/${items.length}...`
                  : 'Compress All Images'}
              </Button>
            </div>
          </div>

          {/* Compression Configuration Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            {/* 1. Quality Slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center">
                  <Sliders size={14} className="mr-1.5 text-blue-500" />
                  Quality: {quality}%
                </label>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                  {quality >= 85 ? 'High Quality' : quality >= 65 ? 'Balanced' : 'Max Compression'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Higher quality produces larger files. Lossy for JPG/WebP, lossless optimization for PNG.
              </p>
            </div>

            {/* 2. Output Format Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center">
                <RefreshCw size={14} className="mr-1.5 text-blue-500" />
                Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormatOption)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="original">Same as original format</option>
                <option value="image/jpeg">JPG (Best for photos & small files)</option>
                <option value="image/webp">WebP (Modern high-efficiency format)</option>
                <option value="image/png">PNG (Preserves transparency)</option>
              </select>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Select format or keep original. Converting transparent PNGs to JPG sets a white background.
              </p>
            </div>

            {/* 3. Optional Resize Controls */}
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
                    <div>
                      <input
                        type="number"
                        placeholder="Width (px)"
                        value={targetWidth}
                        onChange={(e) => setTargetWidth(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Height (px)"
                        value={targetHeight}
                        onChange={(e) => setTargetHeight(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                    </div>
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
                    <span>{lockAspect ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}</span>
                  </button>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Preserving original pixel dimensions. Toggle on to scale resolution down.
                </p>
              )}
            </div>
          </div>

          {/* Aggregate Savings Summary Banner (if completed items exist) */}
          {completedCount > 0 && (
            <div className="p-6 rounded-2xl bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {completedCount === items.length
                      ? `All ${items.length} images compressed successfully!`
                      : `${completedCount} of ${items.length} images processed`}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Original: <span className="font-semibold">{formatBytes(totalOriginalBytes)}</span> → Compressed:{' '}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatBytes(totalCompressedBytes)}</span>{' '}
                  • Saved: <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatBytes(totalSavedBytes)} ({totalReduction}%)</span>
                </p>
              </div>

              <Button
                variant="success"
                size="md"
                onClick={downloadAllAsZip}
                isLoading={isZipping}
                leftIcon={<Archive size={16} />}
                className="w-full sm:w-auto shadow-md"
              >
                {completedCount > 1 ? 'Download All as ZIP' : 'Download Compressed Image'}
              </Button>
            </div>
          )}

          {/* Image Cards List */}
          <div className="space-y-3">
            {items.map((item, index) => {
              const isDone = item.status === 'done';
              const isError = item.status === 'error';
              const isItemProcessing = item.status === 'processing';

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-xs"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                    {/* Thumbnail preview (Before / After) */}
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
                        <span className="absolute bottom-0 right-0 bg-emerald-600 text-white text-[9px] font-bold px-1 rounded-tl">
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
                            <span>→</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {formatBytes(item.result.compressedSize)}
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                              -{item.result.formattedReduction}
                            </span>
                          </>
                        )}
                      </div>

                      {isError && (
                        <p className="text-xs text-red-500 mt-1 flex items-center">
                          <AlertTriangle size={12} className="mr-1" />
                          {item.errorMessage || 'Error compressing file'}
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
                        leftIcon={<Download size={14} />}
                      >
                        Download
                      </Button>
                    )}

                    {isItemProcessing && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center font-medium">
                        <RefreshCw size={13} className="animate-spin mr-1" />
                        Processing...
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
