'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  JsonIndentation,
  validateAndProcessJson,
  formatBytes,
  copyToClipboard,
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
  Maximize2,
  FileCode,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const SAMPLE_JSON = `{
  "product": "WebTools",
  "version": "1.0.0",
  "description": "Fast, free, and private browser utility suite.",
  "features": [
    "Image Compression",
    "Format Conversion",
    "JSON Formatter & Validator",
    "Word & Character Counter"
  ],
  "author": {
    "team": "WebTools Core",
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Validate and parse JSON with debounced/instant result
  const result = useMemo(() => {
    return validateAndProcessJson(inputJson, indent);
  }, [inputJson, indent]);

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
    }
  };

  const handleMinify = () => {
    if (result.valid && result.minified) {
      setInputJson(result.minified);
    }
  };

  const handleDownload = () => {
    if (!inputJson.trim()) return;
    const blob = new Blob([inputJson], { type: 'application/json' });
    downloadBlob(blob, 'formatted.json');
  };

  const lineCount = inputJson ? inputJson.split('\n').length : 1;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Primary Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleFormat}
            disabled={!result.valid}
            leftIcon={<Code size={14} />}
          >
            Format JSON
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleMinify}
            disabled={!result.valid}
            leftIcon={<Minimize2 size={14} />}
          >
            Minify JSON
          </Button>

          {/* Indentation Selector */}
          <div className="flex items-center space-x-1 pl-2 border-l border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 font-medium">Indent:</span>
            <select
              value={indent === '\t' ? 'tab' : indent}
              onChange={(e) => {
                const val = e.target.value;
                setIndent(val === 'tab' ? '\t' : (Number(val) as JsonIndentation));
              }}
              className="text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tabs</option>
            </select>
          </div>
        </div>

        {/* Right side: View Toggle & Clear */}
        <div className="flex items-center space-x-2">
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-white dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'editor'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Code Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tree')}
              disabled={!result.valid}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all disabled:opacity-40 ${
                activeTab === 'tree'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Tree View
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputJson(SAMPLE_JSON)}
            title="Load sample JSON"
          >
            Sample
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInputJson('')}
            leftIcon={<Trash2 size={14} />}
            title="Clear editor"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search key or value..."
            className="w-full pl-8 pr-20 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchMatches.length > 0 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <span className="text-[10px] text-slate-400">
                {currentMatchIdx + 1}/{searchMatches.length}
              </span>
              <button
                type="button"
                onClick={goToPrevMatch}
                className="p-0.5 hover:text-blue-600"
                title="Previous"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={goToNextMatch}
                className="p-0.5 hover:text-blue-600"
                title="Next"
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
          >
            Download JSON
          </Button>
        </div>
      </div>

      {/* Editor & Tree View Area */}
      {activeTab === 'editor' ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-xs flex">
          {/* Line Numbers Bar */}
          <div className="hidden sm:block select-none py-4 px-3 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 text-right text-xs font-mono text-slate-400 dark:text-slate-600 leading-6">
            {lineNumbers.map((num) => (
              <div key={num}>{num}</div>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={18}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder="Paste your JSON payload here..."
            spellCheck={false}
            className="w-full p-4 font-mono text-xs sm:text-sm leading-6 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none resize-y min-h-[350px]"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 min-h-[350px] overflow-auto">
          {result.valid && result.data !== undefined ? (
            <JsonTreeView data={result.data} rootName="root" />
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Cannot render tree view for invalid JSON.
            </div>
          )}
        </div>
      )}

      {/* Validation Status & Error / Stats Bar */}
      {result.valid ? (
        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>✓ Valid JSON</span>
          </div>

          {result.stats && (
            <div className="text-slate-600 dark:text-slate-300 text-[11px] flex flex-wrap items-center gap-x-4">
              <span>Formatted: <strong>{formatBytes(result.stats.formattedBytes)}</strong></span>
              <span>Minified: <strong>{formatBytes(result.stats.minifiedBytes)}</strong></span>
              <span>Whitespace Saved: <strong className="text-emerald-600 dark:text-emerald-400">{formatBytes(result.stats.savedBytes)} ({result.stats.reductionPercent.toFixed(1)}%)</strong></span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-red-50/80 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs space-y-2">
          <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 font-bold">
            <AlertCircle size={16} className="shrink-0" />
            <span>Invalid JSON</span>
            {result.error?.line && (
              <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300 font-mono text-[10px]">
                Line {result.error.line}, Column {result.error.column || '?'}
              </span>
            )}
          </div>
          <p className="text-red-600 dark:text-red-300 font-mono text-[11px] break-all">
            {result.error?.message}
          </p>
          {result.error?.snippet && (
            <div className="p-2 rounded bg-red-100/60 dark:bg-red-950/80 font-mono text-[11px] text-red-800 dark:text-red-200 overflow-x-auto">
              <div>Near line {result.error.line}:</div>
              <div className="font-bold">{result.error.snippet}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Lightweight collapsible JSON Tree View component.
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
    let displayVal = String(value);

    if (typeof value === 'string') {
      valueColor = 'text-emerald-600 dark:text-emerald-400';
      displayVal = `"${value}"`;
    } else if (typeof value === 'number') {
      valueColor = 'text-blue-600 dark:text-blue-400';
    } else if (typeof value === 'boolean') {
      valueColor = 'text-purple-600 dark:text-purple-400';
    } else if (value === null) {
      valueColor = 'text-amber-600 dark:text-amber-400';
      displayVal = 'null';
    }

    return (
      <div className="flex items-center space-x-1.5 py-0.5 hover:bg-slate-50 dark:hover:bg-slate-900/40 rounded px-1">
        <span className="text-slate-500">{label}:</span>
        <span className={valueColor}>{displayVal}</span>
      </div>
    );
  }

  const keys = Object.keys(value as object);
  const bracket = isArray ? `[${keys.length}]` : `{${keys.length}}`;

  return (
    <div className="space-y-1">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-1 py-0.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900/60 rounded px-1 select-none"
      >
        <span className="text-slate-400">
          {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </span>
        <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-[10px] text-slate-400 font-mono">{bracket}</span>
      </div>

      {isExpanded && (
        <div className="pl-4 border-l border-slate-200 dark:border-slate-800 space-y-1">
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
