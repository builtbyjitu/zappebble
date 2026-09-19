'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getColorFormats,
  calculateContrastRatio,
  hexToRgb,
  rgbToHex,
  hslToRgb,
  normalizeHex,
  isValidHex,
  copyToClipboard
} from '@webtools/shared';
import { Button } from '@/components/ui/Button';
import {
  Pipette,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Sliders,
  Sparkles,
  History,
  CheckCircle2,
  XCircle,
  Eye,
  Info
} from 'lucide-react';

const STORAGE_KEY = 'zappebble_color_history';
const LEGACY_STORAGE_KEY = 'webtools_color_history';

export function ColorPickerTool() {
  const [currentHex, setCurrentHex] = useState<string>('#2563EB');
  const [hexInput, setHexInput] = useState<string>('#2563EB');
  const [history, setHistory] = useState<string[]>([]);
  const [bgHexForContrast, setBgHexForContrast] = useState<string>('#FFFFFF');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [hasEyeDropper, setHasEyeDropper] = useState<boolean>(false);

  // Check for EyeDropper API support on client mount
  useEffect(() => {
    setHasEyeDropper(typeof window !== 'undefined' && 'EyeDropper' in window);
  }, []);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setHistory(parsed);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Compute color formats
  const formats = useMemo(() => {
    return getColorFormats(currentHex) || getColorFormats('#2563EB')!;
  }, [currentHex]);

  // Compute WCAG contrast ratio with chosen background
  const contrastResult = useMemo(() => {
    const fg = formats.rgbObj;
    const bg = hexToRgb(bgHexForContrast) || { r: 255, g: 255, b: 255 };
    return calculateContrastRatio(fg, bg);
  }, [formats.rgbObj, bgHexForContrast]);

  const updateColor = useCallback((newHex: string) => {
    if (isValidHex(newHex)) {
      const normalized = normalizeHex(newHex);
      setCurrentHex(normalized);
      setHexInput(normalized);

      // Add to history
      setHistory((prev) => {
        const filtered = prev.filter((c) => c !== normalized);
        const updated = [normalized, ...filtered].slice(0, 16);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore
        }
        return updated;
      });
    }
  }, []);

  const handleManualHexChange = (val: string) => {
    setHexInput(val);
    if (isValidHex(val)) {
      updateColor(val);
    }
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: number) => {
    const clamped = Math.min(255, Math.max(0, val || 0));
    const newRgb = { ...formats.rgbObj, [channel]: clamped };
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    updateColor(hex);
  };

  const handleHslChange = (channel: 'h' | 's' | 'l', val: number) => {
    const maxVal = channel === 'h' ? 360 : 100;
    const clamped = Math.min(maxVal, Math.max(0, val || 0));
    const newHsl = { ...formats.hslObj, [channel]: clamped };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    updateColor(hex);
  };

  const handleEyeDropper = async () => {
    if (!hasEyeDropper) return;
    try {
      // @ts-expect-error EyeDropper API
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      if (result?.sRGBHex) {
        updateColor(result.sRGBHex);
        setStatusMessage(`Picked color ${result.sRGBHex} from screen`);
      }
    } catch (err: any) {
      // Don't treat user escape/cancellation as an error
      if (err?.name !== 'AbortError') {
        console.error('EyeDropper failed:', err);
      }
    }
  };

  const copyValue = async (value: string, formatName: string) => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopiedFormat(formatName);
      setStatusMessage(`Copied ${formatName.toUpperCase()} value: ${value}`);
      setTimeout(() => setCopiedFormat(null), 1800);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setStatusMessage('Color history cleared');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Screen Reader Live Region */}
      <div className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </div>

      {/* Top Swatch & Color Value Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Swatch, EyeDropper & Native Picker */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-4">
            {/* Large Color Swatch Preview */}
            <div
              className="w-full h-44 rounded-2xl border border-black/10 dark:border-white/10 shadow-inner flex items-center justify-center relative overflow-hidden transition-all"
              style={{ backgroundColor: formats.hex }}
            >
              <span
                className="px-3.5 py-1.5 rounded-lg text-sm font-mono font-bold shadow-xs backdrop-blur-md transition-colors"
                style={{
                  backgroundColor:
                    formats.hslObj.l > 60 ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.75)',
                  color: formats.hslObj.l > 60 ? '#ffffff' : '#000000'
                }}
              >
                {formats.hex}
              </span>
            </div>

            {/* Native Color Input Bar */}
            <div className="flex items-center space-x-3 w-full">
              <label htmlFor="native-color-picker-input" className="sr-only">
                Choose color via color picker
              </label>
              <input
                id="native-color-picker-input"
                type="color"
                value={formats.hex}
                onChange={(e) => updateColor(e.target.value)}
                className="w-12 h-10 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-800 shrink-0"
              />
              <div className="relative flex-1">
                <label htmlFor="hex-code-text-input" className="sr-only">
                  Hex color code
                </label>
                <input
                  id="hex-code-text-input"
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleManualHexChange(e.target.value)}
                  placeholder="#2563EB"
                  className="w-full pl-3 pr-3 h-10 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
                />
              </div>
            </div>

            {/* EyeDropper Action or Fallback Notice */}
            {hasEyeDropper ? (
              <Button
                variant="outline"
                size="md"
                onClick={handleEyeDropper}
                leftIcon={<Pipette size={14} className="text-blue-500" />}
                className="w-full text-xs font-semibold shadow-xs"
              >
                Pick Color from Screen
              </Button>
            ) : (
              <div className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1.5 text-left">
                <Info size={14} className="shrink-0 text-blue-500" />
                <span className="text-[11px] leading-tight">
                  Screen color picking isn&apos;t supported in this browser. Use the color swatch or input above.
                </span>
              </div>
            )}
          </div>

          {/* Color History Palette */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center">
                <History size={13} className="mr-1.5 text-blue-500" />
                Recent Palettes ({history.length})
              </span>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={clearHistory}
                  className="text-[11px] text-slate-400 hover:text-red-500 transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">
                Selected colors will appear here automatically.
              </p>
            ) : (
              <div
                role="region"
                aria-label="Recent colors"
                className="flex flex-wrap gap-2"
              >
                {history.map((col, idx) => (
                  <button
                    key={`${col}-${idx}`}
                    type="button"
                    onClick={() => updateColor(col)}
                    aria-label={`Select color ${col}`}
                    className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 shadow-xs hover:scale-110 focus:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all cursor-pointer relative"
                    style={{ backgroundColor: col }}
                    title={`Select ${col}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Code Formats & Channel Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Format Copy Rows */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Color Formats
            </h3>

            {/* HEX Row */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">HEX</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {formats.hex}
                </span>
              </div>
              <Button
                variant={copiedFormat === 'hex' ? 'success' : 'outline'}
                size="sm"
                onClick={() => copyValue(formats.hex, 'hex')}
                leftIcon={copiedFormat === 'hex' ? <Check size={13} /> : <Copy size={13} />}
                className="text-xs"
              >
                {copiedFormat === 'hex' ? 'Copied' : 'Copy'}
              </Button>
            </div>

            {/* RGB Row */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">RGB</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {formats.rgb}
                </span>
              </div>
              <Button
                variant={copiedFormat === 'rgb' ? 'success' : 'outline'}
                size="sm"
                onClick={() => copyValue(formats.rgb, 'rgb')}
                leftIcon={copiedFormat === 'rgb' ? <Check size={13} /> : <Copy size={13} />}
                className="text-xs"
              >
                {copiedFormat === 'rgb' ? 'Copied' : 'Copy'}
              </Button>
            </div>

            {/* HSL Row */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">HSL</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {formats.hsl}
                </span>
              </div>
              <Button
                variant={copiedFormat === 'hsl' ? 'success' : 'outline'}
                size="sm"
                onClick={() => copyValue(formats.hsl, 'hsl')}
                leftIcon={copiedFormat === 'hsl' ? <Check size={13} /> : <Copy size={13} />}
                className="text-xs"
              >
                {copiedFormat === 'hsl' ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Interactive RGB Channel Sliders */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
              <Sliders size={14} className="mr-1.5 text-blue-500" />
              <span>RGB Channel Controls</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              {/* Red */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono">
                  <label htmlFor="channel-slider-red" className="text-red-600 dark:text-red-400 font-bold">
                    Red: {formats.rgbObj.r}
                  </label>
                  <span className="text-slate-400 text-[11px]">0 – 255</span>
                </div>
                <input
                  id="channel-slider-red"
                  type="range"
                  min="0"
                  max="255"
                  value={formats.rgbObj.r}
                  onChange={(e) => handleRgbChange('r', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-valuemin={0}
                  aria-valuemax={255}
                  aria-valuenow={formats.rgbObj.r}
                />
              </div>

              {/* Green */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono">
                  <label htmlFor="channel-slider-green" className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Green: {formats.rgbObj.g}
                  </label>
                  <span className="text-slate-400 text-[11px]">0 – 255</span>
                </div>
                <input
                  id="channel-slider-green"
                  type="range"
                  min="0"
                  max="255"
                  value={formats.rgbObj.g}
                  onChange={(e) => handleRgbChange('g', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-valuemin={0}
                  aria-valuemax={255}
                  aria-valuenow={formats.rgbObj.g}
                />
              </div>

              {/* Blue */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono">
                  <label htmlFor="channel-slider-blue" className="text-blue-600 dark:text-blue-400 font-bold">
                    Blue: {formats.rgbObj.b}
                  </label>
                  <span className="text-slate-400 text-[11px]">0 – 255</span>
                </div>
                <input
                  id="channel-slider-blue"
                  type="range"
                  min="0"
                  max="255"
                  value={formats.rgbObj.b}
                  onChange={(e) => handleRgbChange('b', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-valuemin={0}
                  aria-valuemax={255}
                  aria-valuenow={formats.rgbObj.b}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WCAG Contrast Ratio Checker Section */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
              <Eye size={15} className="mr-1.5 text-blue-500" />
              <span>WCAG 2.1 Contrast Checker</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Check legibility of this color against white, black, or custom background colors.
            </p>
          </div>

          {/* Quick background presets */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Background:</span>
            <button
              type="button"
              onClick={() => setBgHexForContrast('#FFFFFF')}
              className={`px-2.5 py-1 rounded-lg border font-mono transition-all ${
                bgHexForContrast === '#FFFFFF'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 font-bold text-blue-600 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              White
            </button>
            <button
              type="button"
              onClick={() => setBgHexForContrast('#000000')}
              className={`px-2.5 py-1 rounded-lg border font-mono transition-all ${
                bgHexForContrast === '#000000'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 font-bold text-blue-600 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              Black
            </button>
            <label htmlFor="custom-bg-contrast-picker" className="sr-only">
              Custom background color
            </label>
            <input
              id="custom-bg-contrast-picker"
              type="color"
              value={bgHexForContrast}
              onChange={(e) => setBgHexForContrast(normalizeHex(e.target.value))}
              className="w-7 h-7 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0"
              title="Custom background color"
            />
          </div>
        </div>

        {/* Contrast Score Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Ratio Score */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-500 font-bold uppercase block mb-1">
              Contrast Ratio
            </span>
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {contrastResult.formattedRatio}
            </span>
          </div>

          {/* Normal Text Criteria */}
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">Normal Text</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">WCAG AA (≥ 4.5:1):</span>
              <span
                className={`font-bold flex items-center ${
                  contrastResult.normalTextPassAA ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                }`}
              >
                {contrastResult.normalTextPassAA ? (
                  <CheckCircle2 size={13} className="mr-1" />
                ) : (
                  <XCircle size={13} className="mr-1" />
                )}
                {contrastResult.normalTextPassAA ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">WCAG AAA (≥ 7.0:1):</span>
              <span
                className={`font-bold flex items-center ${
                  contrastResult.normalTextPassAAA ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                }`}
              >
                {contrastResult.normalTextPassAAA ? (
                  <CheckCircle2 size={13} className="mr-1" />
                ) : (
                  <XCircle size={13} className="mr-1" />
                )}
                {contrastResult.normalTextPassAAA ? 'PASS' : 'FAIL'}
              </span>
            </div>
          </div>

          {/* Large Text Criteria */}
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">Large / Bold Text</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">WCAG AA (≥ 3.0:1):</span>
              <span
                className={`font-bold flex items-center ${
                  contrastResult.largeTextPassAA ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                }`}
              >
                {contrastResult.largeTextPassAA ? (
                  <CheckCircle2 size={13} className="mr-1" />
                ) : (
                  <XCircle size={13} className="mr-1" />
                )}
                {contrastResult.largeTextPassAA ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">WCAG AAA (≥ 4.5:1):</span>
              <span
                className={`font-bold flex items-center ${
                  contrastResult.largeTextPassAAA ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                }`}
              >
                {contrastResult.largeTextPassAAA ? (
                  <CheckCircle2 size={13} className="mr-1" />
                ) : (
                  <XCircle size={13} className="mr-1" />
                )}
                {contrastResult.largeTextPassAAA ? 'PASS' : 'FAIL'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Preview Sample Box */}
        <div
          className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          style={{ backgroundColor: bgHexForContrast, color: formats.hex }}
        >
          <span className="text-sm font-medium">Sample Regular Text (14px)</span>
          <span className="text-lg font-bold">Sample Large Heading (18px Bold)</span>
        </div>
      </div>
    </div>
  );
}

