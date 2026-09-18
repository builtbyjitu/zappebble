import React from 'react';
import type { Metadata } from 'next';
import { TOOLS, TOOL_CATEGORIES } from '@webtools/shared';
import { ToolCard } from '@/components/ui/ToolCard';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Free Browser Tools & Utilities | ZapPebble',
  description:
    'Browse our full suite of free, private, and client-side browser tools. Image compressors, converters, PDF makers, JSON tools, and QR generators.',
  alternates: {
    canonical: '/tools'
  }
};

export default function ToolsDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4 border border-blue-200/60 dark:border-blue-800/60">
          <Shield size={13} className="text-emerald-500" />
          <span>Complete Tools Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          All Browser Utilities
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Every tool runs directly inside your browser. No files are uploaded to our servers, ensuring your data remains completely private.
        </p>
      </div>

      <div className="space-y-16">
        {TOOL_CATEGORIES.map((category) => {
          const catTools = TOOLS.filter((t) => t.category === category.id);
          if (catTools.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="scroll-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {category.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {category.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 sm:mt-0">
                  {catTools.length} {catTools.length === 1 ? 'Tool' : 'Tools'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
