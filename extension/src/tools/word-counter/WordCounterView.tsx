import React, { useState, useMemo } from 'react';
import { analyzeText, copyToClipboard } from '@webtools/shared';
import {
  Copy,
  Trash2,
  ArrowLeft,
  ExternalLink,
  Check,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenWeb: () => void;
}

export const WordCounterView: React.FC<Props> = ({ onBack, onOpenWeb }) => {
  const [text, setText] = useState<string>(
    'ZapPebble is a fast, free, and private browser utility suite. Your text stays on your device!'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    return analyzeText(text);
  }, [text]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const twitterRemaining = 280 - stats.characters;
  const isTwitterOver = twitterRemaining < 0;

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
          Word Counter
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
        {/* Textarea */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <textarea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here..."
            className="w-full p-2.5 text-xs leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none"
          />
        </div>

        {/* Real-time Compact Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-center">
            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block">
              Words
            </span>
            <span className="text-base font-extrabold text-slate-800 dark:text-white">
              {stats.words}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-center">
            <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
              Chars
            </span>
            <span className="text-base font-extrabold text-slate-800 dark:text-white">
              {stats.characters}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 text-center">
            <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 block">
              No Spaces
            </span>
            <span className="text-base font-extrabold text-slate-800 dark:text-white">
              {stats.charactersWithoutSpaces}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Sentences
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-white">
              {stats.sentences}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Paragraphs
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-white">
              {stats.paragraphs}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
              Reading
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-white">
              ~{stats.readingTimeMinutes} min
            </span>
          </div>
        </div>

        {/* X / Twitter Limit Badge */}
        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            X (Twitter) Limit:
          </span>
          <span
            className={`font-bold font-mono ${
              isTwitterOver
                ? 'text-red-600 dark:text-red-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {stats.characters}/280 {isTwitterOver ? `(${Math.abs(twitterRemaining)} over)` : `(${twitterRemaining} left)`}
          </span>
        </div>

        {/* Actions Bottom Bar */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={handleCopy}
            disabled={!text.trim()}
            className="flex-1 py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-xs font-semibold flex items-center justify-center space-x-1 text-slate-700 dark:text-slate-300"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={() => setText('')}
            disabled={!text.trim()}
            className="py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 disabled:opacity-50 text-xs font-semibold flex items-center space-x-1 text-slate-600 dark:text-slate-400"
          >
            <Trash2 size={13} />
            <span>Clear</span>
          </button>
        </div>

        <div className="flex items-center justify-center text-[10px] text-emerald-600 dark:text-emerald-400 pt-1 font-medium">
          <ShieldCheck size={12} className="mr-1" />
          <span>Processed 100% locally in browser</span>
        </div>
      </div>
    </div>
  );
};
