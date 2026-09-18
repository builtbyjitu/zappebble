import React, { useState, useEffect } from 'react';
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
  downloadBlob,
  formatBytes
} from '@webtools/shared';
import {
  ArrowLeft,
  ExternalLink,
  Camera,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Upload,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenWeb: () => void;
}

export const ScreenshotPdfView: React.FC<Props> = ({ onBack, onOpenWeb }) => {
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number; filename: string } | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // PDF settings
  const [pageSize, setPageSize] = useState<PdfPageSize>('a4');
  const [orientation, setOrientation] = useState<PdfOrientation>('auto');
  const [fit, setFit] = useState<PdfFit>('fit');
  const [margin, setMargin] = useState<PdfMargin>('small');

  // Trigger capture visible tab on mount if in Chrome extension environment
  useEffect(() => {
    handleCaptureVisibleTab();
  }, []);

  const handleCaptureVisibleTab = () => {
    setError(null);
    setIsCapturing(true);

    if (typeof chrome !== 'undefined' && chrome.tabs?.captureVisibleTab) {
      chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
        if (chrome.runtime.lastError || !dataUrl) {
          setIsCapturing(false);
          setError(
            chrome.runtime.lastError?.message ||
              'Unable to capture current tab. Chrome restricts capture on system or store pages. You can upload an image below.'
          );
          return;
        }

        const img = new Image();
        img.onload = () => {
          setScreenshotDataUrl(dataUrl);
          setImageMeta({
            width: img.naturalWidth,
            height: img.naturalHeight,
            filename: `tab-capture-${Date.now()}.png`
          });
          setIsCapturing(false);
        };
        img.onerror = () => {
          setIsCapturing(false);
          setError('Failed to process captured tab screenshot.');
        };
        img.src = dataUrl;
      });
    } else {
      setIsCapturing(false);
      setError('Tab capture API is only available inside active browser extensions. Please upload an image.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        setScreenshotDataUrl(dataUrl);
        setImageMeta({
          width: img.naturalWidth,
          height: img.naturalHeight,
          filename: file.name
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleGeneratePdf = async () => {
    if (!screenshotDataUrl || !imageMeta) return;

    setIsGenerating(true);
    setError(null);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        const options: PdfOptions = {
          pageSize,
          orientation,
          fit,
          margin
        };

        const pdfBlob = await createPdfFromImageSource(img, options, 0.95);
        const downloadName = sanitizePdfFilename(imageMeta.filename);
        downloadBlob(pdfBlob, downloadName);
        setIsGenerating(false);
      };
      img.onerror = () => {
        setIsGenerating(false);
        setError('Failed to decode screenshot image.');
      };
      img.src = screenshotDataUrl;
    } catch (err) {
      console.error('PDF generation error in extension:', err);
      setIsGenerating(false);
      setError('Failed to generate PDF document.');
    }
  };

  const handleReset = () => {
    setScreenshotDataUrl(null);
    setImageMeta(null);
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
          Screenshot to PDF
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
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Capture / Upload Bar */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCaptureVisibleTab}
            disabled={isCapturing}
            className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Camera size={13} />
            <span>{isCapturing ? 'Capturing...' : 'Capture Tab'}</span>
          </button>

          <label className="py-2 px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-colors">
            <Upload size={13} />
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* Preview Container */}
        {screenshotDataUrl && imageMeta ? (
          <div className="space-y-2">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-800 flex items-center justify-center max-h-48 overflow-hidden">
              <img
                src={screenshotDataUrl}
                alt="Captured Screenshot"
                className="max-h-44 max-w-full object-contain rounded shadow-xs"
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono px-1">
              <span>
                {imageMeta.width} × {imageMeta.height} px
              </span>
              <button
                onClick={handleReset}
                className="text-slate-400 hover:text-red-500 flex items-center space-x-0.5"
              >
                <RotateCcw size={10} />
                <span>Clear</span>
              </button>
            </div>
          </div>
        ) : (
          !isCapturing && (
            <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-center space-y-1">
              <Camera size={24} className="mx-auto text-slate-400 opacity-60" />
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Visible Tab Screenshot
              </p>
              <p className="text-[10px] text-slate-400">
                Click &quot;Capture Tab&quot; or upload any screenshot to create PDF
              </p>
            </div>
          )
        )}

        {/* Compact PDF Settings */}
        <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs shadow-xs">
          <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
            <Sliders size={12} />
            <span>PDF Layout</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Page Size */}
            <div>
              <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">
                Page Size
              </label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as PdfPageSize)}
                className="w-full px-2 py-1 text-[11px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200"
              >
                <option value="a4">ISO A4</option>
                <option value="letter">US Letter</option>
                <option value="original">Image Size</option>
              </select>
            </div>

            {/* Orientation */}
            <div>
              <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">
                Orientation
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as PdfOrientation)}
                className="w-full px-2 py-1 text-[11px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200"
              >
                <option value="auto">Auto Detect</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            {/* Fit */}
            <div>
              <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">
                Fit Mode
              </label>
              <select
                value={fit}
                onChange={(e) => setFit(e.target.value as PdfFit)}
                className="w-full px-2 py-1 text-[11px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200"
              >
                <option value="fit">Fit to Page</option>
                <option value="fill">Fill Page</option>
                <option value="original">Original 1:1</option>
              </select>
            </div>

            {/* Margin */}
            <div>
              <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">
                Margins
              </label>
              <select
                value={margin}
                onChange={(e) => setMargin(e.target.value as PdfMargin)}
                className="w-full px-2 py-1 text-[11px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200"
              >
                <option value="none">None (0pt)</option>
                <option value="small">Small (0.25&quot;)</option>
                <option value="medium">Medium (0.5&quot;)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGeneratePdf}
          disabled={!screenshotDataUrl || isGenerating}
          className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-1.5 transition-all"
        >
          <Download size={14} />
          <span>{isGenerating ? 'Generating PDF...' : 'Download PDF'}</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
        <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <ShieldCheck size={11} />
          <span>Local PDF Generator</span>
        </span>
        <button
          onClick={onOpenWeb}
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-0.5"
        >
          <span>Web Studio</span>
          <ExternalLink size={9} />
        </button>
      </div>
    </div>
  );
};
