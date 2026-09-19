import React from 'react';
import Link from 'next/link';
import { ToolDefinition, getToolBySlug } from '@webtools/shared';
import { Breadcrumb } from './Breadcrumb';
import { ToolHeader } from './ToolHeader';
import { FAQ } from './FAQ';
import { ToolCard } from './ToolCard';
import { Chrome, Shield, Zap, Lock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToolLayoutProps {
  tool: ToolDefinition;
  widthVariant?: 'narrow' | 'medium' | 'wide';
  customContent?: React.ReactNode;
  children: React.ReactNode;
}

export function ToolLayout({ tool, widthVariant, customContent, children }: ToolLayoutProps) {
  const relatedTools = tool.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));

  // Determine width variant automatically based on tool characteristics if not specified
  const resolvedWidth =
    widthVariant ||
    (['image-compressor', 'image-converter', 'screenshot-to-pdf'].includes(tool.slug)
      ? 'wide'
      : ['word-counter', 'json-formatter', 'color-picker'].includes(tool.slug)
      ? 'narrow'
      : 'medium');

  const widthClasses = {
    narrow: 'max-w-4xl',
    medium: 'max-w-5xl',
    wide: 'max-w-6xl'
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14', widthClasses[resolvedWidth])}>
      {/* 1. Breadcrumbs with JSON-LD BreadcrumbList */}
      <Breadcrumb toolName={tool.name} />

      {/* 2. Tool Header */}
      <ToolHeader
        title={tool.name}
        description={tool.description}
        categoryLabel={tool.categoryLabel}
        iconName={tool.iconName}
        privacyNote={tool.privacyNote}
      />

      {/* 3. Main Interactive Tool Workspace */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs shadow-slate-200/40 dark:shadow-none p-4 sm:p-6 md:p-8 mb-12 sm:mb-16">
        {children}
      </div>

      {/* 4. How to Use Section */}
      {tool.howItWorks && tool.howItWorks.length > 0 && (
        <section aria-labelledby="how-to-use-heading" className="mb-12 sm:mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2
              id="how-to-use-heading"
              className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              How to use {tool.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Simple steps to get your task done in seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {tool.howItWorks.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs sm:text-sm mb-3.5 shadow-xs shadow-blue-500/20">
                  {step.step}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Tool-Specific Educational & Privacy Content */}
      {customContent && (
        <div className="mb-12 sm:mb-16">
          {customContent}
        </div>
      )}

      {/* 6. Default Benefits Section (only rendered if no customContent is provided) */}
      {!customContent && (
        <section aria-labelledby="why-use-heading" className="mb-12 sm:mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2
              id="why-use-heading"
              className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Why use ZapPebble {tool.name}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Built for speed, privacy, and frictionless everyday productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Zap size={20} />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                Lightning Fast
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Zero network latency. Everything is processed directly in your browser with optimized Web APIs.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Lock size={20} />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                100% Private
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Your files and sensitive information never leave your device. No cloud storage, no leaks.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Shield size={20} />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                Free & No Limits
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                No mandatory signup, no credit cards, and no artificial daily limits. Use freely anytime.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 6. FAQ Section */}
      {tool.faq && tool.faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="mb-12 sm:mb-16 max-w-3xl mx-auto">
          <FAQ items={tool.faq} />
        </section>
      )}

      {/* 7. Chrome Extension CTA */}
      <section className="p-6 sm:p-10 rounded-3xl bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white mb-12 sm:mb-16 shadow-lg shadow-blue-600/10">
        <div className="max-w-2xl mx-auto text-center space-y-3.5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
            <Chrome size={13} />
            <span>Chrome Extension Available</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Use ZapPebble Directly Inside Chrome
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Get instant 1-click access to {tool.name} and 7 other free utilities without opening a new tab.
          </p>
          <div className="pt-2">
            <Link
              href="#install-extension"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:scale-102"
            >
              <Chrome size={16} />
              <span>Add to Chrome — It&apos;s Free</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Related Tools */}
      {relatedTools.length > 0 && (
        <section aria-labelledby="related-tools-heading">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
            <div>
              <h3
                id="related-tools-heading"
                className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                Related Tools
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Other utilities that pair well with {tool.name}
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
            >
              <span>View all tools</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
