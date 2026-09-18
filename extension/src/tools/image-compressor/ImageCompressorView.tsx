import React, { useState, useEffect, useRef } from 'react';
import {
  ImageFileItem,
  OutputFormatOption,
  validateImageFile,
  loadImageElement,
  processImage,
  formatBytes,
  downloadBlob,
  createZipArchive,
  revokeObjectUrl
} from '@webtools/shared';
import {
  Sliders,
  Sparkles,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  UploadCloud,
  Archive,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenWeb: () => void;
}

export const ImageCompressorView: React.FC<Props> = ({ onBack, onOpenWeb }) => {
  const [items, setItems] = useState<ImageFileItem[]>([]);
  const [quality, setQuality] = useState<number>(80);
  const [outputFormat, setOutputFormat] = useState<OutputFormatOption>('original');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        revokeObjectUrl(item.previewUrl);
        if (item.result?.url) revokeObjectUrl(item.result.url);
      });
    };
  }, []);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMsg(null);

    const newItems: ImageFileItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setErrorMsg(validation.error || 'Invalid file');
        continue;
      }

      try {
        const { img, objectUrl } = await loadImageElement(file);
        newItems.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          originalSize: file.size,
          originalFormat: file.type.replace('image/', '').toUpperCase() || 'IMAGE',
          originalMime: file.type,
          originalDimensions: {
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height
          },
          previewUrl: objectUrl,
          status: 'pending'
        });
      } catch (err) {
        setErrorMsg((err as Error).message);
      }
    }

    if (newItems.length > 0) {
      setItems((prev) => [...prev, ...newItems]);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        revokeObjectUrl(target.previewUrl);
        if (target.result?.url) revokeObjectUrl(target.result.url);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const runCompression = async () => {
    if (items.length === 0 || isProcessing) return;
    setIsProcessing(true);
    setErrorMsg(null);

    for (let i = 0; i < items.length; i++) {
      setItems((prev) =>
        prev.map((item, idx) => (idx === i ? { ...item, status: 'processing' } : item))
      );

      try {
        const result = await processImage(items[i].file, {
          quality: quality / 100,
          format: outputFormat
        });

        setItems((prev) =>
          prev.map((item, idx) => (idx === i ? { ...item, status: 'done', result } : item))
        );
      } catch (err) {
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? { ...item, status: 'error', errorMessage: (err as Error).message }
              : item
          )
        );
      }
    }
    setIsProcessing(false);
  };

  const downloadAllZip = async () => {
    const doneItems = items.filter((i) => i.status === 'done' && i.result);
    if (doneItems.length === 0) return;

    if (doneItems.length === 1 && doneItems[0].result) {
      downloadBlob(doneItems[0].result.blob, doneItems[0].result.filename);
      return;
    }

    try {
      const zipBlob = await createZipArchive(
        doneItems.map((i) => ({ name: i.result!.filename, blob: i.result!.blob }))
      );
      downloadBlob(zipBlob, `compressed-images-${Date.now()}.zip`);
    } catch (err) {
      setErrorMsg('ZIP generation failed: ' + (err as Error).message);
    }
  };

  const completedCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="flex flex-col h-full">
      {/* Tool Header */}
      <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="flex items-center space-x-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <h2 className="text-xs font-bold text-slate-800 dark:text-white">
          Image Compressor
        </h2>

        <button
          onClick={onOpenWeb}
          className="text-slate-400 hover:text-blue-600 p-1"
          title="Open in Web App"
        >
          <ExternalLink size={14} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
        {/* Upload Button/Zone */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        {items.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-xl p-6 text-center cursor-pointer bg-white dark:bg-slate-900 transition-all"
          >
            <UploadCloud size={28} className="mx-auto text-blue-500 mb-2" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Click to select images
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              JPG, PNG, WebP • 100% Client-Side
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Quick Controls Card */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center">
                  <Sliders size={12} className="mr-1 text-blue-500" />
                  Quality: {quality}%
                </span>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                  {quality >= 80 ? 'High' : 'Compact'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">Output:</span>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as OutputFormatOption)}
                  className="text-xs rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1"
                >
                  <option value="original">Original format</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/webp">WebP</option>
                  <option value="image/png">PNG</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={runCompression}
                disabled={isProcessing}
                className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 disabled:opacity-50 shadow-sm"
              >
                {isProcessing ? (
                  <RefreshCw size={13} className="animate-spin" />
                ) : (
                  <Sparkles size={13} />
                )}
                <span>{isProcessing ? 'Compressing...' : 'Compress'}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Add more"
              >
                +
              </button>

              {completedCount > 1 && (
                <button
                  onClick={downloadAllZip}
                  className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center space-x-1"
                  title="Download All ZIP"
                >
                  <Archive size={13} />
                  <span>ZIP</span>
                </button>
              )}
            </div>

            {/* Items List */}
            <div className="space-y-2">
              {items.map((item) => {
                const isDone = item.status === 'done';
                return (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <img
                        src={isDone && item.result?.url ? item.result.url : item.previewUrl}
                        alt={item.name}
                        className="w-8 h-8 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 truncate text-[11px]">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {formatBytes(item.originalSize)}
                          {isDone && item.result && (
                            <span className="text-emerald-600 font-bold ml-1">
                              → {formatBytes(item.result.compressedSize)} (-
                              {item.result.formattedReduction})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 ml-2">
                      {isDone && item.result && (
                        <button
                          onClick={() => downloadBlob(item.result!.blob, item.result!.filename)}
                          className="p-1 rounded bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400 hover:bg-blue-600 hover:text-white"
                          title="Download"
                        >
                          <Download size={13} />
                        </button>
                      )}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 rounded text-slate-400 hover:text-red-500"
                        title="Remove"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 text-[11px] flex items-center">
            <AlertTriangle size={13} className="mr-1.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};
