'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { TOOLS, TOOL_CATEGORIES, ToolDefinition } from '@webtools/shared';
import { ToolCard } from '@/components/ui/ToolCard';
import { Button } from '@/components/ui/Button';
import {
  Search,
  Chrome,
  Shield,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Laptop,
  HardDrive,
  FileCheck,
  Lock,
  Compass
} from 'lucide-react';

// Featured tools for homepage display
const FEATURED_SLUGS = [
  'image-compressor',
  'image-converter',
  'screenshot-to-pdf',
  'qr-generator',
  'json-formatter',
  'word-counter'
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter tools based on search query and active category filter
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.categoryLabel.toLowerCase().includes(q) ||
        tool.seo.keywords.some((k) => k.toLowerCase().includes(q));

      const matchesCat =
        activeCategory === 'all' || tool.category === activeCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  const featuredTools = useMemo(() => {
    return FEATURED_SLUGS.map((slug) => TOOLS.find((t) => t.slug === slug)).filter(
      (t): t is ToolDefinition => Boolean(t)
    );
  }, []);

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveCategory('all');
    searchInputRef.current?.focus();
  };

  // Structured Data (JSON-LD) for WebSite and Organization
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ZapPebble',
    url: 'https://zappebble.appnix.org',
    description:
      'Free browser tools for images, PDFs, QR codes, JSON, text and more. Fast, simple and privacy-focused utilities from ZapPebble.',
    publisher: {
      '@type': 'Organization',
      name: 'Appnix Technologies',
      url: 'https://zappebble.appnix.org'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://zappebble.appnix.org/tools?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col">
        {/* ============================================================== */}
        {/* 1. HERO SECTION                                                */}
        {/* ============================================================== */}
        <section className="relative overflow-hidden pt-12 pb-14 sm:pt-20 sm:pb-20 bg-linear-to-b from-blue-50/60 via-white to-slate-50/50 dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Tagline Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-900/70 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-2xs">
              <Sparkles size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Small tools. Big time saved.</span>
            </div>

            {/* Primary Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-4xl mx-auto">
              Everyday browser tools,{' '}
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                without the hassle.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Fast, free, and private browser utilities for everyday tasks. Zero server uploads, no accounts needed, and instant local processing.
            </p>

            {/* Hero CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#featured-tools">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<Compass size={16} />}
                  className="rounded-xl px-5 py-2.5 font-semibold shadow-xs"
                >
                  Explore Tools
                </Button>
              </a>
              <Button
                variant="outline"
                size="md"
                onClick={handleFocusSearch}
                leftIcon={<Search size={16} />}
                className="rounded-xl px-5 py-2.5 font-semibold"
              >
                Search Tools
              </Button>
            </div>

            {/* ============================================================== */}
            {/* 2. TOOL SEARCH / DISCOVERY                                     */}
            {/* ============================================================== */}
            <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
              <div className="relative flex items-center shadow-xs rounded-2xl">
                <Search
                  size={18}
                  className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools — image compressor, QR code, JSON, word count..."
                  aria-label="Search browser tools"
                  className="w-full pl-11 pr-24 py-3 sm:py-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-xs sm:text-sm shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3.5 px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    activeCategory === 'all'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  All ({TOOLS.length})
                </button>
                {TOOL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      activeCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. SEARCH RESULTS OR FEATURED TOOLS                            */}
        {/* ============================================================== */}
        {searchQuery ? (
          <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Search Results ({filteredTools.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Showing matches for &quot;{searchQuery}&quot;
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="text-xs"
              >
                Clear Search
              </Button>
            </div>

            {filteredTools.length === 0 ? (
              <div className="py-16 text-center max-w-md mx-auto">
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  No tools found matching &quot;{searchQuery}&quot;.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  Try searching for keywords like image, pdf, json, qr, or text.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearSearch}
                  className="mt-4"
                >
                  View All Tools
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* ============================================================== */}
            {/* 4. FEATURED TOOLS SECTION                                      */}
            {/* ============================================================== */}
            <section
              id="featured-tools"
              className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800/80 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Featured Tools
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Essential browser utilities for quick everyday workflows
                  </p>
                </div>
                <Link
                  href="/tools"
                  className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                >
                  <span>Browse all {TOOLS.length} tools</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>

            {/* ============================================================== */}
            {/* 5. ALL TOOLS / CATEGORIES SECTION                              */}
            {/* ============================================================== */}
            <section
              id="all-tools"
              className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-slate-50/50 dark:bg-slate-950/40 rounded-3xl border border-slate-200/70 dark:border-slate-800/70 my-4"
            >
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  All Tools by Category
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Organized by workflow so you can find exactly what you need
                </p>
              </div>

              <div className="space-y-10">
                {TOOL_CATEGORIES.map((cat) => {
                  const catTools = TOOLS.filter((t) => t.category === cat.id);
                  if (catTools.length === 0) return null;

                  return (
                    <div key={cat.id} className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            {cat.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {cat.description}
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                          {catTools.length} {catTools.length === 1 ? 'tool' : 'tools'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {catTools.map((tool) => (
                          <ToolCard key={tool.id} tool={tool} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* ============================================================== */}
        {/* 6. WHY ZAPPEBBLE (VALUE PROPOSITION)                           */}
        {/* ============================================================== */}
        <section className="py-14 sm:py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Why ZapPebble?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Simple browser tools built for users who care about speed, simplicity, and privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {/* Fast */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  <Zap size={20} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1">
                  Fast
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tools start and run instantly in memory without waiting for slow server queues or page reloads.
                </p>
              </div>

              {/* Private by Design */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <Shield size={20} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1">
                  Private by Design
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Supported tools process your files locally in the browser. Your images and documents stay on your machine.
                </p>
              </div>

              {/* Simple */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1">
                  Simple
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  No complex setup, no unnecessary steps, and no annoying clutter. Just open the tool and get your task done.
                </p>
              </div>

              {/* Free */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                  <Lock size={20} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1">
                  Free
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  All current tools are free to use without requiring an account, subscription, or payment details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. PRIVACY / LOCAL PROCESSING SECTION                          */}
        {/* ============================================================== */}
        <section className="py-14 sm:py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
                <Shield size={13} className="shrink-0" />
                <span>Privacy Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Your files stay in your browser.
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Most online converters require uploading your files to remote servers. ZapPebble runs client-side algorithms directly on your device.
              </p>
            </div>

            {/* Architecture Comparison Visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* How ZapPebble Works */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/30 dark:border-emerald-500/30 shadow-xs relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    ZapPebble (Local Processing)
                  </span>
                  <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                    <CheckCircle2 size={12} className="mr-1 text-emerald-600" />
                    100% Private
                  </span>
                </div>

                <div className="space-y-3 my-5">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <Laptop size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      1. Your File on Your Device
                    </span>
                  </div>
                  <div className="flex justify-center text-emerald-500 text-xs font-bold">
                    ↓ Processed locally in browser memory
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60">
                    <FileCheck size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      2. Instant Result Saved Directly
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                  Files never leave your computer or travel over the internet. Zero server uploads.
                </p>
              </div>

              {/* Traditional Cloud Tools */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs opacity-85">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Traditional Online Converters
                  </span>
                  <span className="inline-flex items-center text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                    <XCircle size={12} className="mr-1 text-rose-500" />
                    Cloud Upload Required
                  </span>
                </div>

                <div className="space-y-3 my-5">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <Laptop size={18} className="text-slate-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      1. Upload File Over the Internet
                    </span>
                  </div>
                  <div className="flex justify-center text-slate-400 text-xs font-bold">
                    ↓ Sent to remote cloud servers
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
                    <HardDrive size={18} className="text-rose-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      2. Processed on Remote Server
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                  Data is transmitted and stored on third-party servers, posing privacy and retention risks.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/privacy"
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
              >
                <span>Read our complete Privacy Model</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. SIMPLE HOW IT WORKS                                         */}
        {/* ============================================================== */}
        <section className="py-14 sm:py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                How It Works
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Three effortless steps to finish your task in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-xs shadow-blue-500/20">
                  1
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Choose a Tool
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Browse our curated utilities for images, PDFs, QR codes, JSON, or text analysis.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-xs shadow-blue-500/20">
                  2
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Add Your Content
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Drag and drop your file or paste your text. No account or login required.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-xs shadow-blue-500/20">
                  3
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Process & Save
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your device processes the task instantly. Download or copy the output with one click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 9. EXPLORE MORE / EXTENSION CTA                                */}
        {/* ============================================================== */}
        <section
          id="install-extension"
          className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="p-8 sm:p-14 rounded-3xl bg-linear-to-br from-slate-900 via-blue-950 to-indigo-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                <Chrome size={14} />
                <span>Chrome Extension Available</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Get ZapPebble for Chrome
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                Access your essential browser utilities with a single click from your browser toolbar. Free forever, zero intrusive ads, minimal permissions, and 100% private.
              </p>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href="#install-extension"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
                >
                  <Chrome size={16} />
                  <span>Install Chrome Extension</span>
                </a>
                <Link
                  href="/tools"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all border border-slate-700"
                >
                  <span>Explore All Tools</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
