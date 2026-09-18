import React, { useState } from 'react';
import {
  ScanResult,
  scanImageSource,
  copyToClipboard
} from '@webtools/shared';
import {
  ArrowLeft,
  ExternalLink,
  ScanBarcode,
  Upload,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Camera,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenWeb: () => void;
}

export const QrScannerView: React.FC<Props> = ({ onBack, onOpenWeb }) => {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [noResult, setNoResult] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setNoResult(false);
    setResults([]);
    setIsScanning(true);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);

      const img = new Image();
      img.onload = async () => {
        try {
          const detected = await scanImageSource(img, { returnMultiple: true });
          if (detected.length > 0) {
            setResults(detected);
            setNoResult(false);
          } else {
            setResults([]);
            setNoResult(true);
          }
        } catch (err) {
          console.error('Extension scan error:', err);
          setError('Unable to analyze image.');
        } finally {
          setIsScanning(false);
        }
      };
      img.onerror = () => {
        setIsScanning(false);
        setError('Failed to load image.');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = async (val: string, idx: number) => {
    const ok = await copyToClipboard(val);
    if (ok) {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setResults([]);
    setNoResult(false);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="flex items-center space-x-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <h2 className="text-xs font-bold text-slate-800 dark:text-white">
          QR & Barcode Scanner
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
        {/* Error notification */}
        {error && (
          <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg text-[11px] text-amber-800 dark:text-amber-300 flex items-start space-x-2">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload & Camera Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <label className="py-2.5 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-colors">
            <Upload size={14} />
            <span>Upload & Scan</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          <button
            onClick={onOpenWeb}
            className="py-2.5 px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Camera size={14} />
            <span>Live Camera</span>
          </button>
        </div>

        {/* Preview or Empty prompt */}
        {imagePreview ? (
          <div className="space-y-2">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-800 flex items-center justify-center max-h-40 overflow-hidden">
              <img
                src={imagePreview}
                alt="Uploaded code"
                className="max-h-36 max-w-full object-contain rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="text-[10px] text-slate-400 hover:text-red-500 flex items-center space-x-0.5"
              >
                <RotateCcw size={10} />
                <span>Scan Another</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-center space-y-1">
            <ScanBarcode size={24} className="mx-auto text-slate-400 opacity-60" />
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Scan from Image File
            </p>
            <p className="text-[10px] text-slate-400">
              Upload any screenshot or photo with a QR code or barcode
            </p>
          </div>
        )}

        {/* Scanning Spinner */}
        {isScanning && (
          <div className="py-6 text-center text-xs text-slate-500 font-medium flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Analyzing image...</span>
          </div>
        )}

        {/* Results */}
        {!isScanning && results.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={13} />
              <span>Decoded Successfully</span>
            </div>

            {results.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    {item.format}
                  </span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded font-mono text-xs text-slate-900 dark:text-slate-100 break-all select-all max-h-28 overflow-y-auto">
                  {item.value}
                </div>

                <div className="flex items-center space-x-1.5 pt-0.5">
                  <button
                    onClick={() => handleCopy(item.value, idx)}
                    className="flex-1 py-1 px-2 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded flex items-center justify-center space-x-1 transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check size={11} className="text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {item.isUrl && (
                    <a
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1 px-2.5 text-[10px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center space-x-1 transition-colors"
                    >
                      <span>Open Link</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Result */}
        {!isScanning && noResult && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-center space-y-1">
            <AlertTriangle size={18} className="mx-auto text-amber-600" />
            <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
              No Code Detected
            </p>
            <p className="text-[10px] text-amber-700 dark:text-amber-400">
              Try an image with better lighting or higher resolution.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
        <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <ShieldCheck size={11} />
          <span>Local Code Engine</span>
        </span>
        <button
          onClick={onOpenWeb}
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-0.5"
        >
          <span>Web Camera Studio</span>
          <ExternalLink size={9} />
        </button>
      </div>
    </div>
  );
};
