import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
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
    <div className={cn('text-center max-w-3xl mx-auto mb-8 sm:mb-12', className)}>
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

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
        {title}
      </h1>

      <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>

      <div className="mt-4 inline-flex items-center text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 px-3 py-1.5 rounded-lg">
        <ShieldCheck size={14} className="mr-1.5 shrink-0" />
        <span>{privacyNote}</span>
      </div>
    </div>
  );
}
