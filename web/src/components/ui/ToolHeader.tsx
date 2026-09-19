import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToolHeaderProps {
  title: string;
  description: string;
  categoryLabel: string;
  privacyNote?: string;
  badge?: string;
  className?: string;
}

export function ToolHeader({
  title,
  description,
  categoryLabel,
  privacyNote = 'Files are processed locally in your browser and never uploaded to any server.',
  badge,
  className
}: ToolHeaderProps) {
  return (
    <div className={cn('max-w-4xl mx-auto mb-8 sm:mb-12', className)}>
      {/* Breadcrumbs Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center justify-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-6"
      >
        <Link
          href="/"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm px-1 py-0.5"
        >
          <Home size={13} className="shrink-0" />
          <span>Home</span>
        </Link>
        <ChevronRight size={13} className="text-slate-400 dark:text-slate-600 shrink-0" />
        <Link
          href="/tools"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm px-1 py-0.5"
        >
          Tools
        </Link>
        <ChevronRight size={13} className="text-slate-400 dark:text-slate-600 shrink-0" />
        <span
          className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px] sm:max-w-xs"
          aria-current="page"
        >
          {title}
        </span>
      </nav>

      <div className="text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
          <span>{categoryLabel}</span>
          {badge && (
            <>
              <span>•</span>
              <span className="flex items-center">
                <Sparkles size={12} className="mr-1" /> {badge}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>

        {/* Privacy Pill */}
        <div className="mt-4 inline-flex items-center text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-900/60 px-3 py-1.5 rounded-lg shadow-2xs">
          <ShieldCheck size={14} className="mr-1.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{privacyNote}</span>
        </div>
      </div>
    </div>
  );
}
