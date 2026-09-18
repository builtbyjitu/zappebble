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
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
  };

  const styles = {
    info: 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200',
    success: 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200',
    warning: 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200',
    error: 'bg-red-50/80 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200'
  };

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start p-4 rounded-xl border transition-all text-sm',
        styles[type],
        className
      )}
    >
      <div className="mr-3 mt-0.5">{icons[type]}</div>
      <div className="flex-1">
        {title && <h5 className="font-semibold text-sm mb-0.5">{title}</h5>}
        <div className="text-xs leading-relaxed opacity-90">{message}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
