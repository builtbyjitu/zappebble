import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  Minimize2,
  RefreshCw,
  FileText,
  QrCode,
  Code,
  FileSearch,
  Pipette,
  ScanBarcode,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ElementType> = {
  Minimize2,
  RefreshCw,
  FileText,
  QrCode,
  Code,
  FileSearch,
  Pipette,
  ScanBarcode
};

export interface ToolHeaderProps {
  title: string;
  description: string;
  categoryLabel?: string;
  iconName?: string;
  privacyNote?: string;
  badge?: string;
  className?: string;
}

export function ToolHeader({
  title,
  description,
  categoryLabel,
  iconName,
  privacyNote = 'Files are processed locally in your browser and never uploaded to any server.',
  badge,
  className
}: ToolHeaderProps) {
  const Icon = iconName ? ICON_MAP[iconName] || Sparkles : null;

  return (
    <div className={cn('text-center max-w-3xl mx-auto mb-6 sm:mb-8', className)}>
      {/* Tool Icon */}
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3.5 shadow-2xs border border-blue-100 dark:border-blue-900/60">
          <Icon size={24} className="shrink-0" />
        </div>
      )}

      {/* H1 Tool Name */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        {title}
      </h1>

      {/* Concise Description */}
      <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>

      {/* Badges Row */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {categoryLabel && (
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
            {categoryLabel}
          </span>
        )}

        <span className="inline-flex items-center text-[11px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-900/60 px-2.5 py-0.5 rounded-full shadow-2xs">
          <ShieldCheck size={13} className="mr-1 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Processed locally</span>
        </span>

        <span className="inline-flex items-center text-[11px] font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 px-2.5 py-0.5 rounded-full">
          <CheckCircle2 size={12} className="mr-1 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>No account needed</span>
        </span>

        {badge && (
          <span className="inline-flex items-center text-[11px] font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 px-2.5 py-0.5 rounded-full">
            <Sparkles size={11} className="mr-1 text-purple-600" />
            <span>{badge}</span>
          </span>
        )}
      </div>
    </div>
  );
}
