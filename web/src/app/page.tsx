'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TOOLS, TOOL_CATEGORIES } from '@webtools/shared';
import { ToolCard } from '@/components/ui/ToolCard';
import { Button } from '@/components/ui/Button';
import {
  Search,
  Chrome,
  Shield,
  Zap,
  Cpu,
  UserCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesSearch =
        !searchQuery ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.seo.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'all' || tool.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 bg-linear-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
            <span>100% Client-Side Browser Utilities</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-4xl mx-auto">
            Free Browser Tools. <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Fast. Private. Simple.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Fast, simple, and privacy-focused tools for work, study, and development. Your files never leave your device.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center shadow-lg shadow-blue-500/5 rounded-2xl">
              <Search
                size={20}
                className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any tool (e.g. compress jpg, format json, qr generator)..."
                className="w-full pl-12 pr-24 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-300'
              }`}
            >
              All Tools ({TOOLS.length})
            </button>
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {searchQuery
                ? `Search Results (${filteredTools.length})`
                : selectedCategory === 'all'
                ? 'Popular Tools'
                : TOOL_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              High-performance client-side browser utilities
            </p>
          </div>
          <span className="mt-2 sm:mt-0 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
            <Shield size={14} className="mr-1" />
            100% Client-Side Processing
          </span>
        </div>

        {filteredTools.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base text-slate-500 dark:text-slate-400">
              No utilities match your query &quot;{searchQuery}&quot;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* Why WebTools Section */}
      <section className="py-16 sm:py-24 bg-slate-100/70 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Why WebTools?
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
              We built WebTools because everyday utilities shouldn&apos;t require server uploads, slow ads, or monthly paid subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                100% Free
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Use all tools freely with no artificial limits, paywalls, or trial expirations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                Instant Speed
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Zero network roundtrips. Tools execute immediately in memory using web workers and canvas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                Privacy-Focused
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Files stay strictly on your device. We never store or transmit your documents or images.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Cpu size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                Browser-Based
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No software installations required. Works smoothly on modern desktop and mobile browsers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <UserCheck size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                No Mandatory Signup
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No account needed. Open the page and use the tool immediately without logging in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Popular Categories
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Organized tools for creators, developers, designers, and students
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {cat.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {cat.description}
              </p>
              <Link
                href={`/tools#${cat.id}`}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1"
              >
                <span>Browse {cat.name}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Extension CTA Section */}
      <section id="install-extension" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-16 rounded-3xl bg-linear-to-br from-slate-900 via-blue-950 to-indigo-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
              <Chrome size={14} />
              <span>Chrome Web Store</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Get WebTools for Chrome
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Access your favorite tools with a single click right from your browser toolbar. Free forever, zero intrusive ads, minimum permissions, and completely private.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>One-click popup with instant tool search</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Zero tab clutter — quick utilities right where you work</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Strict least-privilege security model</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#extension-installed"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/25"
              >
                <Chrome size={18} />
                <span>Install Chrome Extension</span>
              </a>
              <Link
                href="/tools"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all border border-slate-700"
              >
                <span>Explore All Web Tools</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
