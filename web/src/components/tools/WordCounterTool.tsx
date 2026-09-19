'use client';

import React, { useState, useMemo } from 'react';
import { analyzeText, SOCIAL_BENCHMARKS, SocialBenchmark } from '@webtools/shared';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import {
  FileText,
  Clock,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Hash,
  AlignLeft,
  BookOpen,
  Sparkles,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

const SAMPLE_TEXT = `Welcome to ZapPebble Word and Character Counter!

This free online tool calculates word count, character count, sentence structure, paragraph count, and estimated reading time directly in your web browser in real time.

Whether you are crafting an X (Twitter) post, optimizing an SEO meta description, or writing an academic essay, your draft stays 100% private and is never uploaded to any remote server.`;

export function WordCounterTool() {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('twitter');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const stats = useMemo(() => {
    return analyzeText(text);
  }, [text]);

  const selectedBenchmark = useMemo(() => {
    return (
      SOCIAL_BENCHMARKS.find((b) => b.id === selectedBenchmarkId) ||
      SOCIAL_BENCHMARKS[0]
    );
  }, [selectedBenchmarkId]);

  const benchmarkRemaining = selectedBenchmark.limit - stats.characters;
  const isBenchmarkOver = benchmarkRemaining < 0;

  const handleClear = () => {
    setText('');
    setStatusMessage('Text cleared');
  };

  const handleLoadSample = () => {
    setText(SAMPLE_TEXT);
    setStatusMessage('Sample text loaded');
  };

  return (
    <div className="space-y-6">
      {/* Screen Reader Live Region for Discrete Actions */}
      <div className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </div>

      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. Words */}
        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-center transition-all">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Words
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.words.toLocaleString()}
          </span>
        </div>

        {/* 2. Characters */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-center transition-all">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
            Characters
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.characters.toLocaleString()}
          </span>
        </div>

        {/* 3. Characters Without Spaces */}
        <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 text-center transition-all">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
            No Spaces
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.charactersWithoutSpaces.toLocaleString()}
          </span>
        </div>

        {/* 4. Sentences */}
        <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 text-center transition-all">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
            Sentences
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.sentences.toLocaleString()}
          </span>
        </div>

        {/* 5. Paragraphs */}
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 text-center transition-all">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
            Paragraphs
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.paragraphs.toLocaleString()}
          </span>
        </div>

        {/* 6. Approx. Reading Time */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-center transition-all">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            Reading Time
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            ~{stats.readingTimeMinutes} {stats.readingTimeMinutes === 1 ? 'min' : 'mins'}
          </span>
        </div>
      </div>

      {/* Editor & Actions Toolbar */}
      <div className="space-y-3">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-0.5">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadSample}
              className="text-xs font-semibold"
            >
              Load Sample
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              leftIcon={<Trash2 size={13} />}
              className="text-xs text-slate-500 hover:text-red-600 dark:hover:text-red-400"
            >
              Clear Text
            </Button>
          </div>

          <div className="flex items-center space-x-2 justify-end">
            <CopyButton
              textToCopy={text}
              label="Copy Text"
              onCopied={() => setStatusMessage('Text copied to clipboard')}
            />
          </div>
        </div>

        {/* Text Input Area */}
        <div className="relative rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 transition-all">
          <label htmlFor="word-counter-textarea" className="sr-only">
            Text to analyze
          </label>
          <textarea
            id="word-counter-textarea"
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here to count words, characters, and sentences in real time..."
            className="w-full p-4 sm:p-5 text-sm sm:text-base leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-y min-h-[260px]"
          />

          {/* Empty State Prompt */}
          {!text.trim() && (
            <div className="px-5 pb-3 text-xs text-slate-400 dark:text-slate-500 italic">
              Start typing or paste your text to see live statistics.
            </div>
          )}

          {/* Secondary Details Footer */}
          <div className="px-4 sm:px-5 py-2.5 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                Lines: <strong>{stats.lines}</strong>
              </span>
              {stats.longestWord && (
                <span>
                  Longest Word: <strong className="font-mono">{stats.longestWord}</strong> ({stats.longestWord.length} chars)
                </span>
              )}
              {stats.averageWordLength > 0 && (
                <span>
                  Avg Word Length: <strong>{stats.averageWordLength}</strong> chars
                </span>
              )}
            </div>

            <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium shrink-0">
              <ShieldCheck size={14} className="mr-1.5 shrink-0" />
              <span>100% Client-Side • Local in Browser</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & SEO Benchmarks Section */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Character Limit Benchmarks
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Approximate guidelines for common social platforms and search engine snippets.
            </p>
          </div>

          {/* Benchmark Selector with Semantic Radiogroup */}
          <div
            role="radiogroup"
            aria-label="Character limit benchmark"
            className="flex flex-wrap items-center gap-1.5"
          >
            {SOCIAL_BENCHMARKS.map((b) => {
              const isSelected = selectedBenchmarkId === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedBenchmarkId(b.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Benchmark Status Bar */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {selectedBenchmark.name} (Limit: {selectedBenchmark.limit} chars)
            </span>
            <span
              className={`font-bold ${
                isBenchmarkOver
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {stats.characters} / {selectedBenchmark.limit} characters{' '}
              {isBenchmarkOver
                ? `(${Math.abs(benchmarkRemaining)} over limit)`
                : `(${benchmarkRemaining} remaining)`}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-200 rounded-full ${
                isBenchmarkOver
                  ? 'bg-red-500'
                  : benchmarkRemaining < 20
                  ? 'bg-amber-500'
                  : 'bg-blue-600'
              }`}
              style={{
                width: `${Math.min(100, (stats.characters / selectedBenchmark.limit) * 100)}%`
              }}
            />
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {selectedBenchmark.description}. Approximate guideline — actual search snippet display may vary based on pixel width.
          </p>
        </div>
      </div>
    </div>
  );
}

