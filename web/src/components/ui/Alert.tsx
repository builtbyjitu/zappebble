import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string | React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  type = 'info',
  title,
  message,
  onClose,
  className
}: AlertProps) {
  const icons = {
    info: <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />,
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
  };

  const styles = {
    info: 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200/70 dark:border-blue-900/50 text-slate-800 dark:text-slate-200',
    success: 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200/70 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200',
    warning: 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200/70 dark:border-amber-900/50 text-slate-800 dark:text-slate-200',
    error: 'bg-red-50/70 dark:bg-red-950/30 border-red-200/70 dark:border-red-900/50 text-slate-800 dark:text-slate-200'
  };

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all shadow-2xs',
        styles[type],
        className
      )}
    >
      <div className="mr-2.5 mt-0.5">{icons[type]}</div>
      <div className="flex-1">
        {title && <h5 className="font-semibold text-xs sm:text-sm mb-0.5 text-slate-900 dark:text-white">{title}</h5>}
        <div className="opacity-90">{message}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2.5 -mr-1 p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400"
          aria-label="Close alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
