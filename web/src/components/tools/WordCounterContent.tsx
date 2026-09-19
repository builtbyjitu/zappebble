import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  Clock,
  Hash,
  AlignLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  BookOpen,
  Sliders,
  Type,
  Search,
  Globe
} from 'lucide-react';

export function WordCounterContent() {
  return (
    <div className="space-y-12 sm:space-y-16 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction Concept & Real-time Metrics */}
      <section aria-labelledby="intro-concept-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="intro-concept-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Real-Time Browser-Based Writing Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Whether you are refining an essay, drafting an X (Twitter) thread, crafting an SEO title tag, or pacing a
            speech, ZapPebble analyzes your text instantly as you type. All counting and statistical evaluation take place
            locally inside your browser memory without transmitting your writing to remote servers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Type size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Comprehensive Text Metrics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Track 9 real-time metrics: words, total characters, characters without spaces, sentences, paragraphs,
              approximate reading time, lines, average word length, and your longest word.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your drafts, personal notes, and unpublished articles never leave your device. Analysis runs in browser
              JavaScript with zero network calls, zero tracking, and zero cloud storage.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Sliders size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Platform Benchmarks</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Instantly test your copy against common character limits for X (Twitter) posts (280 chars), SEO meta
              titles (60 chars), and SEO meta descriptions (160 chars) with live color feedback.
            </p>
          </div>
        </div>
      </section>

      {/* 2. How to Use the Word Counter */}
      <section aria-labelledby="how-to-use-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="how-to-use-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Use the Word Counter
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Analyze and polish your text in three simple steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Paste or Type Your Text
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter or paste your content directly into the text editor. You can also click <strong>Load Sample</strong>{' '}
              to explore how the statistics and benchmarks work.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Review Live Statistics
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Inspect the top statistics cards for words, characters, characters without spaces, sentences, paragraphs,
              and estimated reading time. Check the footer for line count, longest word, and average word length.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Check Benchmarks & Copy
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Select an active character benchmark (X Post, SEO Title, or Meta Description) to view your remaining
              allowance. When satisfied, click <strong>Copy Text</strong> to grab your draft.
            </p>
          </div>
        </div>
      </section>

      {/* 3. How Does ZapPebble Count Words? */}
      <section aria-labelledby="word-count-logic-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="word-count-logic-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How Does ZapPebble Count Words?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Simple word counters often split text by basic space characters, which can produce inaccurate counts when
            encountering hyphens, contractions, or non-English writing systems.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white block">
            Unicode-Aware Word Tokenization
          </span>
          <p className="leading-relaxed">
            ZapPebble uses a modern, Unicode-aware regular expression engine to detect words:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <li>
              <strong>Contractions & Hyphenated Compounds:</strong> Words containing apostrophes (e.g. <em>don&apos;t</em>,{' '}
              <em>it&apos;s</em>) or hyphens (e.g. <em>state-of-the-art</em>, <em>user-friendly</em>) are counted as single
              coherent words.
            </li>
            <li>
              <strong>Unicode Letters & Marks:</strong> Recognizes characters across international alphabets including
              accented Latin (e.g. <em>café</em>, <em>naïve</em>), Cyrillic, Greek, Arabic, Devanagari, and other
              Unicode script categories (<code>\p&#123;L&#125;</code>, <code>\p&#123;N&#125;</code>, <code>\p&#123;M&#125;</code>).
            </li>
            <li>
              <strong>Punctuation & Symbols:</strong> Standalone punctuation marks, symbols, and mathematical operators
              are not counted as words.
            </li>
          </ul>
        </div>
      </section>

      {/* 4. Words vs Characters vs Characters Without Spaces */}
      <section aria-labelledby="chars-vs-spaces-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="chars-vs-spaces-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Words vs. Characters vs. Characters Without Spaces
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Different publishing platforms, academic institutions, and translation agencies measure text length using
            different metrics:
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Metric
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    What It Counts
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Typical Applications
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Words
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Total count of detected letter and number sequences
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Essays, academic papers, blog posts, freelance writing rates, speech pacing
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Total Characters
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Every letter, digit, punctuation mark, symbol, and whitespace character
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Social media limits (X/Twitter, LinkedIn), SMS messages, database field limits
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Characters (No Spaces)
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Total characters after stripping all spaces, tabs, and newline breaks
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Translation billing (common in Europe/Asia), book publishing contracts, academic abstracts
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Sentences, Paragraphs, and Lines */}
      <section aria-labelledby="sentences-paragraphs-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="sentences-paragraphs-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How Sentences, Paragraphs, and Lines Are Counted
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble evaluates structural text flow using practical parsing rules:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Sentences</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Counted using terminal punctuation sequences (periods, exclamation marks, and question marks) followed by
              whitespace or the end of the text. Multiple consecutive marks (e.g. <code>...</code> or <code>?!</code>)
              are treated as a single sentence delimiter to prevent inflated counts.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Paragraphs</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Counted by identifying blocks of text separated by blank lines (double newlines <code>\n\s*\n</code>).
              Single line breaks within the same paragraph are not treated as new paragraphs.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Lines</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Counted by tracking total newline characters (<code>\n</code>). Useful when formatting source code, poems,
              addresses, or configuration lists.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Reading Time Calculation */}
      <section aria-labelledby="reading-time-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="reading-time-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How Is Reading Time Calculated?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble estimates reading time using the widely accepted average adult reading speed benchmark of{' '}
            <strong>200 words per minute (WPM)</strong>.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold">
            <Clock size={16} />
            <span>Formula: Math.ceil(wordCount / 200)</span>
          </div>
          <p className="leading-relaxed">
            The reading time is rounded up to the nearest whole minute (e.g. 350 words displays as <code>~2 mins</code>).
            Keep in mind that actual reading speed varies based on topic complexity, technical vocabulary, reader
            familiarity, and whether the text is being skimmed on a mobile device or read carefully in print.
          </p>
        </div>
      </section>

      {/* 7. Character Limit Benchmarks */}
      <section aria-labelledby="benchmarks-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="benchmarks-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Check Your Text Against Character Limits
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble provides three built-in character benchmarks with an interactive progress bar and dynamic color
            feedback:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                280 Chars
              </span>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Social</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">X (Twitter) Post</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard post character allowance on X / Twitter for non-subscriber accounts. Keep your post within 280
              characters to ensure it publishes without truncation.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                60 Chars
              </span>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">SEO</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">SEO Meta Title</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A practical benchmark of 50–60 characters for webpage titles. Helps prevent titles from being truncated
              with an ellipsis (<code>...</code>) on desktop and mobile search engine results pages.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                160 Chars
              </span>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">SEO</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">SEO Meta Description</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A practical benchmark of 150–160 characters for search engine snippet descriptions. Ensures your value
              proposition remains visible across major search engine displays.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start space-x-3">
          <Info size={16} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Important Note on Search Engine Snippets</span>
            <p className="leading-relaxed">
              Search engines measure title and description display space in <strong>pixels</strong> rather than strict
              character counts (e.g. wide capital letters like &quot;W&quot; consume more pixel width than &quot;I&quot;).
              Furthermore, search engines dynamically generate snippets based on user queries. The 60 and 160 character
              limits are practical drafting benchmarks, not absolute guarantees.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Practical Writing Use Cases */}
      <section aria-labelledby="writing-use-cases-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="writing-use-cases-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Useful Ways to Use a Word and Character Counter
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Different writing projects require distinct length targets:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm">
              <BookOpen size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Academic Essays & Assignments</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ensure assignments meet strict course guidelines (e.g. 500-word abstracts, 1,500-word college essays, or
              5,000-word dissertations). Check paragraph counts to maintain balanced argument structure.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm">
              <Globe size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Articles & Blog Posts</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Track length during drafting to target appropriate depth for your audience (e.g. 800–1,200 words for standard
              guides, 2,000+ words for deep-dive tutorials). Use reading time to set reader expectations in article headers.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm">
              <FileText size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Resumes & LinkedIn Summaries</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Keep resume bullet points concise and impactful (typically 20–30 words per bullet). Check LinkedIn profile
              headline and summary character limits to avoid awkward line breaks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm">
              <Search size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Structured Data & QR Payloads</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Working with structured JSON payloads or short text strings for QR codes? Use our{' '}
              <Link
                href="/tools/json-formatter"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                JSON Formatter
              </Link>{' '}
              to format structured data, or our{' '}
              <Link
                href="/tools/qr-generator"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                QR Code Generator
              </Link>{' '}
              to turn short text into scannable barcodes.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Privacy / Local Processing */}
      <section aria-labelledby="privacy-heading" className="space-y-4">
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-800 dark:text-emerald-300">
            <ShieldCheck size={24} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <h2
              id="privacy-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-emerald-950 dark:text-white"
            >
              100% Client-Side Privacy: Your Text Stays in Your Browser
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            Writers, journalists, legal professionals, and students frequently count words in sensitive or unpublished
            materials: confidential agreements, unpublished book manuscripts, proprietary business proposals, and private
            correspondence.
          </p>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            Unlike many online counters that send your text to cloud servers for processing, ZapPebble analyzes every word,
            character, sentence, and line locally in your browser using client-side JavaScript. Your text is never
            transmitted across the internet, never logged, and never stored on any server.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Zero server uploads</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>No telemetry or tracking</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Instant real-time analysis</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Safe for confidential drafts</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
