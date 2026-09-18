import React, { useState, useEffect, useMemo } from 'react';
import {
  getColorFormats,
  calculateContrastRatio,
  isValidHex,
  normalizeHex,
  copyToClipboard
} from '@webtools/shared';
import {
  ArrowLeft,
  ExternalLink,
  Pipette,
  Copy,
  Check,
  History,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenWeb: () => void;
}

const STORAGE_KEY = 'webtools_color_history';
const DEFAULT_COLOR = '#3B82F6';

export const ColorPickerView: React.FC<Props> = ({ onBack, onOpenWeb }) => {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [eyeDropperSupported, setEyeDropperSupported] = useState<boolean>(false);
  const [isPicking, setIsPicking] = useState<boolean>(false);

  // Check EyeDropper support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      setEyeDropperSupported(true);
    }
  }, []);

  // Load color history from chrome.storage.local or localStorage
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.get([STORAGE_KEY], (res) => {
        if (Array.isArray(res[STORAGE_KEY])) {
          setHistory(res[STORAGE_KEY]);
        }
      });
    } else if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setHistory(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const saveHistory = (newHistory: string[]) => {
    setHistory(newHistory);
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.set({ [STORAGE_KEY]: newHistory });
    } else if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch {
        // ignore
      }
    }
  };

  const addToHistory = (hex: string) => {
    const norm = normalizeHex(hex);
    if (!norm) return;
    const filtered = history.filter((c) => c.toLowerCase() !== norm.toLowerCase());
    const updated = [norm, ...filtered].slice(0, 10);
    saveHistory(updated);
  };

  const formats = useMemo(() => {
    return getColorFormats(color);
  }, [color]);

  // WCAG contrasts with black and white
  const contrastWithWhite = useMemo(() => {
    if (!formats) return null;
    return calculateContrastRatio(formats.rgbObj, { r: 255, g: 255, b: 255 });
  }, [formats]);

  const contrastWithBlack = useMemo(() => {
    if (!formats) return null;
    return calculateContrastRatio(formats.rgbObj, { r: 0, g: 0, b: 0 });
  }, [formats]);

  const handlePickFromScreen = async () => {
    if (!eyeDropperSupported) return;
    try {
      setIsPicking(true);
      // @ts-expect-error EyeDropper is a modern Chromium API
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      if (result && result.sRGBHex) {
        setColor(result.sRGBHex);
        addToHistory(result.sRGBHex);
      }
    } catch {
      // EyeDropper cancelled or dismissed with Esc
    } finally {
      setIsPicking(false);
    }
  };

  const handleCopy = async (text: string, formatId: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedFormat(formatId);
      setTimeout(() => setCopiedFormat(null), 1800);
    }
  };

  const handleColorChange = (newHex: string) => {
    setColor(newHex);
    if (isValidHex(newHex)) {
      addToHistory(newHex);
    }
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
          Color Picker
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
        {/* Eyedropper CTA Button */}
        {eyeDropperSupported ? (
          <button
            onClick={handlePickFromScreen}
            disabled={isPicking}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
          >
            <Pipette size={15} />
            <span>{isPicking ? 'Hover & Click Anywhere...' : 'Pick Color From Webpage'}</span>
          </button>
        ) : (
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg flex items-center space-x-2 text-[11px] text-amber-700 dark:text-amber-300">
            <AlertCircle size={14} className="shrink-0" />
            <span>Screen pipette is active in Chromium browsers. Use palette below:</span>
          </div>
        )}

        {/* Live Color Swatch & Native Picker */}
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center space-x-3">
          <div className="relative shrink-0">
            <div
              className="w-14 h-14 rounded-xl shadow-md border-2 border-white dark:border-slate-800 overflow-hidden flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
            >
              <input
                type="color"
                value={formats?.hex || '#000000'}
                onChange={(e) => handleColorChange(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                title="Click to choose custom color"
              />
              <Pipette size={16} className="text-white drop-shadow-md pointer-events-none opacity-80" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Selected Color</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {contrastWithBlack && contrastWithWhite && (contrastWithBlack.ratio > contrastWithWhite.ratio ? 'Light shade' : 'Dark shade')}
              </span>
            </div>
            <div className="text-lg font-black font-mono tracking-tight text-slate-900 dark:text-white mt-0.5">
              {formats?.hex || color}
            </div>
            <div className="text-[11px] text-slate-500 font-mono truncate">
              {formats ? formats.rgb : ''}
            </div>
          </div>
        </div>

        {/* Formats List with 1-Click Copy */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 px-0.5">
            Color Formats
          </div>

          {[
            { id: 'hex', label: 'HEX', value: formats?.hex || '' },
            { id: 'rgb', label: 'RGB', value: formats?.rgb || '' },
            { id: 'hsl', label: 'HSL', value: formats?.hsl || '' }
          ].map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs"
            >
              <div className="flex items-center space-x-2 min-w-0 pr-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase w-7 shrink-0">
                  {item.label}
                </span>
                <span className="text-xs font-mono text-slate-800 dark:text-slate-200 truncate">
                  {item.value}
                </span>
              </div>

              <button
                onClick={() => handleCopy(item.value, item.id)}
                className="flex items-center space-x-1 px-2 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors shrink-0"
              >
                {copiedFormat === item.id ? (
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
            </div>
          ))}
        </div>

        {/* WCAG Contrast Previews */}
        <div className="grid grid-cols-2 gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">
              On White
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono">
              {contrastWithWhite ? contrastWithWhite.formattedRatio : '—'}
            </span>
            <div className="mt-1">
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  contrastWithWhite?.normalTextPassAA
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                }`}
              >
                {contrastWithWhite?.normalTextPassAA ? 'AA Pass' : 'Low'}
              </span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">
              On Black
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono">
              {contrastWithBlack ? contrastWithBlack.formattedRatio : '—'}
            </span>
            <div className="mt-1">
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  contrastWithBlack?.normalTextPassAA
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                }`}
              >
                {contrastWithBlack?.normalTextPassAA ? 'AA Pass' : 'Low'}
              </span>
            </div>
          </div>
        </div>

        {/* Color History */}
        {history.length > 0 && (
          <div className="space-y-1.5 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                <History size={12} />
                <span>Recent Colors</span>
              </div>
              <button
                onClick={() => saveHistory([])}
                className="text-[10px] text-slate-400 hover:text-red-500"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
              {history.map((hex, idx) => (
                <button
                  key={`${hex}-${idx}`}
                  onClick={() => setColor(hex)}
                  title={`Select ${hex}`}
                  className="w-6 h-6 rounded-md shadow-xs border border-slate-300 dark:border-slate-700 shrink-0 hover:scale-110 transition-transform"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
        <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <ShieldCheck size={11} />
          <span>Local Color Palette Engine</span>
        </span>
        <button
          onClick={onOpenWeb}
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-0.5"
        >
          <span>Advanced Contrast Studio</span>
          <ExternalLink size={9} />
        </button>
      </div>
    </div>
  );
};
