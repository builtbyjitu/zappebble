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
  ShieldCheck
} from 'lucide-react';

const SAMPLE_TEXT = `Welcome to WebTools Word and Character Counter!

This free online tool calculates word count, character count, sentence structure, paragraph count, and estimated reading time directly in your web browser in real time.

Whether you are crafting an X (Twitter) post, optimizing an SEO meta description, or writing an academic essay, your draft stays 100% private and is never uploaded to any remote server.`;

export function WordCounterTool() {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('twitter');

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

  return (
    <div className="space-y-8">
      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Words
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.words.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
            Characters
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.characters.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
            No Spaces
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.charactersWithoutSpaces.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
            Sentences
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.sentences.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
            Paragraphs
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.paragraphs.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-center">
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText(SAMPLE_TEXT)}
            >
              Load Sample
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setText('')}
              leftIcon={<Trash2 size={14} />}
            >
              Clear
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <CopyButton textToCopy={text} label="Copy Text" />
          </div>
        </div>

        {/* Text Input Area */}
        <div className="relative rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <textarea
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here to count words, characters, and sentences in real time..."
            className="w-full p-5 text-sm sm:text-base leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-y min-h-[250px]"
          />

          <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-4">
              <span>Lines: <strong>{stats.lines}</strong></span>
              {stats.longestWord && (
                <span>Longest Word: <strong className="font-mono">{stats.longestWord}</strong> ({stats.longestWord.length} chars)</span>
              )}
              {stats.averageWordLength > 0 && (
                <span>Avg Word Length: <strong>{stats.averageWordLength}</strong> chars</span>
              )}
            </div>
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck size={13} className="mr-1" />
              <span>Processed locally in browser</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & SEO Benchmarks Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Character Limit Benchmarks
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Check your text length against popular social media and SEO guidelines.
            </p>
          </div>

          {/* Benchmark selector */}
          <div className="flex items-center space-x-1">
            {SOCIAL_BENCHMARKS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBenchmarkId(b.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedBenchmarkId === b.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Benchmark Status Bar */}
        <div className="space-y-2">
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
                ? `(${Math.abs(benchmarkRemaining)} over)`
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
            {selectedBenchmark.description}. Note: These are common guidelines rather than strict rules.
          </p>
        </div>
      </div>
    </div>
  );
}
