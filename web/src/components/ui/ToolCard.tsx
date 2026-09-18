import React from 'react';
import Link from 'next/link';
import { ToolDefinition } from '@webtools/shared';
import {
  Minimize2,
  RefreshCw,
  FileText,
  QrCode,
  Code,
  FileSearch,
  Pipette,
  ScanBarcode,
  ArrowRight,
  Sparkles
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

export interface ToolCardProps {
  tool: ToolDefinition;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const Icon = ICON_MAP[tool.iconName] || Sparkles;

  return (
    <Link
      href={tool.path}
      className={cn(
        'group block p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 relative overflow-hidden',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
          <Icon size={24} />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          {tool.categoryLabel}
        </span>
      </div>

      <div className="mt-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
          <span>{tool.name}</span>
          <ArrowRight
            size={16}
            className="text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
          />
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {tool.tagline}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
          ● 100% Private (Local)
        </span>
        <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
          Use Tool →
        </span>
      </div>
    </Link>
  );
}
