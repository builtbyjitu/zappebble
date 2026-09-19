'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  JsonIndentation,
  validateAndProcessJson,
  formatBytes,
  downloadBlob
} from '@webtools/shared';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import {
  Code,
  CheckCircle2,
  AlertCircle,
  Download,
  Trash2,
  Search,
  ChevronRight,
  ChevronDown,
  Minimize2,
  FileCode,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  ShieldCheck,
  FolderTree
} from 'lucide-react';

const SAMPLE_JSON = `{
  "product": "ZapPebble",
  "version": "1.0.0",
  "description": "Fast, free, and private browser utility suite.",
  "features": [
    "Image Compression",
    "Format Conversion",
    "JSON Formatter & Validator",
    "Word & Character Counter"
  ],
  "author": {
    "team": "Appnix Technologies",
    "license": "MIT",
    "verified": true
  },
  "metrics": {
    "monthlyUsers": 50000,
    "uptime": 99.99
  }
}`;

export function JsonFormatterTool() {
  const [inputJson, setInputJson] = useState<string>(SAMPLE_JSON);
  const [indent, setIndent] = useState<JsonIndentation>(2);
  const [activeTab, setActiveTab] = useState<'editor' | 'tree'>('editor');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchMatches, setSearchMatches] = useState<number[]>([]);
  const [currentMatchIdx, setCurrentMatchIdx] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Validate and parse JSON with instant calculation
  const result = useMemo(() => {
    return validateAndProcessJson(inputJson, indent);
  }, [inputJson, indent]);

  // Sync scroll between textarea and line numbers gutter
  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  // Handle Search in Editor
  useEffect(() => {
    if (!searchQuery.trim() || !inputJson) {
      setSearchMatches([]);
      setCurrentMatchIdx(0);
      return;
    }

    const matches: number[] = [];
    const queryLower = searchQuery.toLowerCase();
    const textLower = inputJson.toLowerCase();
    let index = textLower.indexOf(queryLower);

    while (index !== -1) {
      matches.push(index);
      index = textLower.indexOf(queryLower, index + 1);
    }

    setSearchMatches(matches);
    setCurrentMatchIdx(0);
  }, [searchQuery, inputJson]);

  const goToNextMatch = () => {
    if (searchMatches.length === 0 || !textareaRef.current) return;
    const nextIdx = (currentMatchIdx + 1) % searchMatches.length;
    setCurrentMatchIdx(nextIdx);

    const pos = searchMatches[nextIdx];
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(pos, pos + searchQuery.length);
  };

  const goToPrevMatch = () => {
    if (searchMatches.length === 0 || !textareaRef.current) return;
    const prevIdx = (currentMatchIdx - 1 + searchMatches.length) % searchMatches.length;
    setCurrentMatchIdx(prevIdx);

    const pos = searchMatches[prevIdx];
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(pos, pos + searchQuery.length);
  };

  const handleFormat = () => {
    if (result.valid && result.formatted) {
      setInputJson(result.formatted);
      setStatusMessage('JSON formatted successfully');
    }
  };

  const handleMinify = () => {
    if (result.valid && result.minified) {
      setInputJson(result.minified);
      setStatusMessage('JSON minified successfully');
    }
  };

  const handleDownload = () => {
    if (!inputJson.trim()) return;
    const blob = new Blob([inputJson], { type: 'application/json' });
    downloadBlob(blob, 'formatted.json');
    setStatusMessage('JSON file downloaded');
  };

  const handleClear = () => {
    setInputJson('');
    setSearchQuery('');
    setStatusMessage('Editor content cleared');
  };

  const handleLoadSample = () => {
    setInputJson(SAMPLE_JSON);
    setStatusMessage('Sample JSON loaded');
  };

  const lineCount = inputJson ? inputJson.split('\n').length : 1;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Screen Reader Announcements for Discrete Actions */}
      <div className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </div>

      {/* Primary Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
        {/* Left Actions: Format, Minify, Indent */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleFormat}
            disabled={!result.valid}
            leftIcon={<Code size={14} />}
            className="shadow-xs font-semibold"
          >
            Format JSON
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleMinify}
            disabled={!result.valid}
            leftIcon={<Minimize2 size={14} />}
            className="font-medium"
          >
            Minify JSON
          </Button>

          {/* Indentation Selector */}
          <div className="flex items-center space-x-1.5 pl-2 border-l border-slate-200 dark:border-slate-700">
            <label
              htmlFor="json-indent-select"
              className="text-xs text-slate-500 dark:text-slate-400 font-medium"
            >
              Indent:
            </label>
            <select
              id="json-indent-select"
              value={indent === '\t' ? 'tab' : indent}
              onChange={(e) => {
                const val = e.target.value;
                setIndent(val === 'tab' ? '\t' : (Number(val) as JsonIndentation));
              }}
              className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tabs</option>
            </select>
          </div>
        </div>

        {/* Right Actions: View Mode, Sample, Clear */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="tablist"
            aria-label="Editor view mode"
            className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-white dark:bg-slate-900"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'editor'}
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'editor'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Code Editor
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'tree'}
              onClick={() => setActiveTab('tree')}
              disabled={!result.valid}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                activeTab === 'tree'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Tree View
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadSample}
            title="Load sample JSON"
            className="text-xs"
          >
            Load Sample
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            leftIcon={<Trash2 size={13} />}
            title="Clear editor"
            className="text-xs text-slate-500 hover:text-red-600 dark:hover:text-red-400"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Secondary Search & Export Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-0.5">
        {/* Search input with match count & navigation */}
        <div className="relative w-full sm:w-80">
          <label htmlFor="json-search-input" className="sr-only">
            Search in JSON
          </label>
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            id="json-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search key or value..."
            className="w-full pl-8 pr-20 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
          />
          {searchMatches.length > 0 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">
              <span className="text-slate-600 dark:text-slate-300 font-mono">
                {currentMatchIdx + 1}/{searchMatches.length}
              </span>
              <button
                type="button"
                onClick={goToPrevMatch}
                className="p-0.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
                title="Previous match"
                aria-label="Previous match"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={goToNextMatch}
                className="p-0.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
                title="Next match"
                aria-label="Next match"
              >
                ▼
              </button>
            </div>
          )}
        </div>

        {/* Copy & Download Buttons */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <CopyButton textToCopy={inputJson} label="Copy JSON" />
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={!inputJson.trim()}
            leftIcon={<Download size={14} />}
            className="text-xs"
          >
            Download JSON
          </Button>
        </div>
      </div>

      {/* Editor & Tree View Area */}
      {activeTab === 'editor' ? (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-2xs flex relative">
          <label htmlFor="json-editor-textarea" className="sr-only">
            JSON Input Payload
          </label>

          {/* Line Numbers Gutter */}
          <div
            ref={lineNumbersRef}
            aria-hidden="true"
            className="hidden sm:block select-none py-4 px-3 bg-slate-50/80 dark:bg-slate-900/50 border-r border-slate-200/80 dark:border-slate-800 text-right text-xs font-mono text-slate-400 dark:text-slate-600 leading-6 overflow-hidden w-12 shrink-0"
          >
            {lineNumbers.map((num) => (
              <div key={num}>{num}</div>
            ))}
          </div>

          {/* Code Textarea */}
          <textarea
            id="json-editor-textarea"
            ref={textareaRef}
            rows={18}
            value={inputJson}
            onScroll={handleScroll}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder="Paste or type your JSON payload here..."
            spellCheck={false}
            className="w-full p-4 font-mono text-xs sm:text-sm leading-6 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-y min-h-[360px] overflow-x-auto whitespace-pre"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 sm:p-6 min-h-[360px] overflow-auto shadow-2xs">
          {result.valid && result.data !== undefined ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
                <FolderTree size={14} className="text-blue-500" />
                <span>Interactive collapsible JSON hierarchy</span>
              </div>
              <JsonTreeView data={result.data} rootName="root" />
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 text-xs">
              Cannot render tree view for invalid JSON. Please correct syntax errors in the Code Editor.
            </div>
          )}
        </div>
      )}

      {/* Validation Status & Error / Stats Bar */}
      {result.valid ? (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>Valid JSON</span>
          </div>

          {result.stats && (
            <div className="text-slate-600 dark:text-slate-300 text-[11px] flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                Formatted: <strong>{formatBytes(result.stats.formattedBytes)}</strong>
              </span>
              <span>
                Minified: <strong>{formatBytes(result.stats.minifiedBytes)}</strong>
              </span>
              <span>
                Whitespace Saved:{' '}
                <strong className="text-emerald-600 dark:text-emerald-400">
                  {formatBytes(result.stats.savedBytes)} ({result.stats.reductionPercent.toFixed(1)}%)
                </strong>
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50/80 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs space-y-2.5"
        >
          <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 font-bold">
            <AlertCircle size={16} className="shrink-0" />
            <span>Invalid JSON</span>
            {result.error?.line && (
              <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300 font-mono text-[11px]">
                Line {result.error.line}, Column {result.error.column || '?'}
              </span>
            )}
          </div>
          <p className="text-red-600 dark:text-red-300 font-mono text-[11px] break-all leading-relaxed">
            {result.error?.message}
          </p>
          {result.error?.snippet && (
            <div className="p-2.5 rounded-lg bg-red-100/70 dark:bg-red-950/80 font-mono text-[11px] text-red-800 dark:text-red-200 overflow-x-auto">
              <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                Near line {result.error.line}:
              </div>
              <div className="font-bold text-red-900 dark:text-red-100">{result.error.snippet}</div>
            </div>
          )}
        </div>
      )}

      {/* Privacy Guarantee Note */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span className="flex items-center space-x-1.5">
          <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
          <span>100% Client-Side Processing • Your JSON never leaves your browser</span>
        </span>
        <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
          RFC 8259 Standard
        </span>
      </div>
    </div>
  );
}

/**
 * Lightweight collapsible JSON Tree View component with semantic type badges.
 */
function JsonTreeView({ data, rootName = 'root' }: { data: unknown; rootName: string }) {
  return (
    <div className="font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
      <JsonTreeNode label={rootName} value={data} isRoot={true} />
    </div>
  );
}

function JsonTreeNode({
  label,
  value,
  isRoot = false
}: {
  label: string;
  value: unknown;
  isRoot?: boolean;
}) {
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  if (!isObject) {
    let valueColor = 'text-slate-800 dark:text-slate-200';
    let typeLabel: string = typeof value;
    let displayVal = String(value);

    if (typeof value === 'string') {
      valueColor = 'text-emerald-600 dark:text-emerald-400';
      displayVal = `"${value}"`;
      typeLabel = 'str';
    } else if (typeof value === 'number') {
      valueColor = 'text-blue-600 dark:text-blue-400';
      typeLabel = 'num';
    } else if (typeof value === 'boolean') {
      valueColor = 'text-purple-600 dark:text-purple-400';
      typeLabel = 'bool';
    } else if (value === null) {
      valueColor = 'text-amber-600 dark:text-amber-400';
      displayVal = 'null';
      typeLabel = 'null';
    }

    return (
      <div className="flex items-center space-x-1.5 py-0.5 hover:bg-slate-50 dark:hover:bg-slate-900/40 rounded px-1 transition-colors">
        <span className="text-slate-500 font-semibold">{label}:</span>
        <span className={valueColor}>{displayVal}</span>
        <span className="text-[9px] uppercase tracking-wider px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 shrink-0">
          {typeLabel}
        </span>
      </div>
    );
  }

  const keys = Object.keys(value as object);
  const bracket = isArray ? `[Array(${keys.length})]` : `{Object(${keys.length})}`;

  return (
    <div className="space-y-0.5">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        className="flex items-center space-x-1 py-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900/60 rounded px-1 select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 transition-colors"
      >
        <span className="text-slate-400 shrink-0">
          {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </span>
        <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">
          {bracket}
        </span>
      </div>

      {isExpanded && (
        <div className="pl-4 ml-1.5 border-l border-slate-200 dark:border-slate-800 space-y-0.5">
          {keys.map((key) => (
            <JsonTreeNode
              key={key}
              label={key}
              value={(value as Record<string, unknown>)[key]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

