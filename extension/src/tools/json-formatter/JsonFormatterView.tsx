import React, { useState, useMemo } from 'react';
import {
  JsonIndentation,
  validateAndProcessJson,
  downloadBlob,
  copyToClipboard
} from '@webtools/shared';
import {
  Code,
  Minimize2,
  Copy,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  Check
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenWeb: () => void;
}

export const JsonFormatterView: React.FC<Props> = ({ onBack, onOpenWeb }) => {
  const [jsonText, setJsonText] = useState<string>(
    '{"product":"WebTools","fast":true,"rating":5,"tags":["free","private"]}'
  );
  const [indent, setIndent] = useState<JsonIndentation>(2);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return validateAndProcessJson(jsonText, indent);
  }, [jsonText, indent]);

  const handleFormat = () => {
    if (result.valid && result.formatted) {
      setJsonText(result.formatted);
    }
  };

  const handleMinify = () => {
    if (result.valid && result.minified) {
      setJsonText(result.minified);
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(jsonText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!jsonText.trim()) return;
    const blob = new Blob([jsonText], { type: 'application/json' });
    downloadBlob(blob, 'formatted.json');
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
          JSON Formatter
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
        {/* Quick Toolbar */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleFormat}
              disabled={!result.valid}
              className="py-1 px-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-xs flex items-center space-x-1 shadow-xs"
            >
              <Code size={12} />
              <span>Format</span>
            </button>

            <button
              onClick={handleMinify}
              disabled={!result.valid}
              className="py-1 px-2 rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-medium text-xs flex items-center space-x-1"
            >
              <Minimize2 size={12} />
              <span>Minify</span>
            </button>

            <select
              value={indent === '\t' ? 'tab' : indent}
              onChange={(e) => {
                const val = e.target.value;
                setIndent(val === 'tab' ? '\t' : (Number(val) as JsonIndentation));
              }}
              className="py-1 px-1.5 text-[11px] rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <option value="2">2sp</option>
              <option value="4">4sp</option>
              <option value="tab">Tab</option>
            </select>
          </div>

          <button
            onClick={() => setJsonText('')}
            className="p-1 rounded text-slate-400 hover:text-red-500"
            title="Clear"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Textarea */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <textarea
            rows={11}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder="Paste raw JSON here..."
            spellCheck={false}
            className="w-full p-2.5 font-mono text-[11px] leading-5 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none resize-none"
          />
        </div>

        {/* Status Indicator */}
        {result.valid ? (
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] flex items-center justify-between">
            <span className="flex items-center font-semibold">
              <CheckCircle2 size={13} className="mr-1 text-emerald-500" />
              ✓ Valid JSON
            </span>
            {result.stats && (
              <span className="text-[10px] text-slate-500">
                {result.stats.formattedBytes} B (min: {result.stats.minifiedBytes} B)
              </span>
            )}
          </div>
        ) : (
          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-[11px] space-y-1">
            <div className="flex items-center font-semibold">
              <AlertCircle size={13} className="mr-1 text-red-500 shrink-0" />
              <span>✕ Invalid JSON</span>
              {result.error?.line && (
                <span className="ml-1 font-mono text-[10px] bg-red-100 dark:bg-red-900 px-1 rounded">
                  Line {result.error.line}, Col {result.error.column || '?'}
                </span>
              )}
            </div>
            <p className="text-[10px] text-red-600 dark:text-red-300 font-mono truncate">
              {result.error?.message}
            </p>
          </div>
        )}

        {/* Actions Bottom Bar */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={handleCopy}
            disabled={!jsonText.trim()}
            className="flex-1 py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-xs font-semibold flex items-center justify-center space-x-1 text-slate-700 dark:text-slate-300"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={!jsonText.trim()}
            className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center space-x-1 shadow-xs"
          >
            <Download size={13} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
