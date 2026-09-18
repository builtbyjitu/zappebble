import React from 'react';
import Link from 'next/link';
import { ToolDefinition, getToolBySlug } from '@webtools/shared';
import { ToolHeader } from './ToolHeader';
import { FAQ } from './FAQ';
import { ToolCard } from './ToolCard';
import { Chrome, Shield, Zap, Lock, ArrowRight } from 'lucide-react';

export interface ToolLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const relatedTools = tool.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Tool Header */}
      <ToolHeader
        title={tool.name}
        description={tool.description}
        categoryLabel={tool.categoryLabel}
        privacyNote={tool.privacyNote}
      />

      {/* Main Interactive Tool UI Area */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-10 mb-16">
        {children}
      </div>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center tracking-tight text-slate-900 dark:text-white mb-8">
          Why use WebTools {tool.name}?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero network latency. Everything is processed directly in your browser with optimized Web APIs.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Lock size={20} />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              100% Private
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Your files and sensitive information never leave your computer. No cloud storage, no leaks.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Shield size={20} />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              Free & No Limits
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No mandatory signup, no credit cards, and no artificial daily limits. Use freely anytime.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      {tool.howItWorks && tool.howItWorks.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center tracking-tight text-slate-900 dark:text-white mb-8">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tool.howItWorks.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-md shadow-blue-500/20">
                  {step.step}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
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

      {/* FAQ Section */}
      {tool.faq && tool.faq.length > 0 && (
        <div className="mb-16 max-w-3xl mx-auto">
          <FAQ items={tool.faq} />
        </div>
      )}

      {/* Chrome Extension CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white mb-16 shadow-xl shadow-blue-600/20">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
            <Chrome size={14} />
            <span>Chrome Extension Available</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Use WebTools Directly Inside Chrome
          </h3>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Get instant 1-click access to {tool.name} and 7 other free utilities without opening a new tab.
          </p>
          <div className="pt-2">
            <Link
              href="#install-extension"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Chrome size={18} />
              <span>Add to Chrome — It&apos;s Free</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Related Utilities
            </h3>
            <Link
              href="/tools"
              className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
            >
              <span>View all tools</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
