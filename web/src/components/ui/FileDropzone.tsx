'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { UploadCloud } from 'lucide-react';

export interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  error?: string | null;
  disabled?: boolean;
  className?: string;
}

export function FileDropzone({
  onFilesSelected,
  accept,
  multiple = false,
  maxSizeMB = 50,
  title = 'Drag & drop files here, or click to browse',
  subtitle = 'Processed locally in your browser with zero server uploads',
  isLoading = false,
  error,
  disabled = false,
  className
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (disabled || isLoading || !fileList || fileList.length === 0) return;
    const filesArray = Array.from(fileList);
    onFilesSelected(filesArray);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || isLoading) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled && !isLoading) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload files"
      aria-disabled={disabled || isLoading}
      onClick={() => {
        if (!disabled && !isLoading) inputRef.current?.click();
      }}
      onKeyDown={handleKeyDown}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        'group relative cursor-pointer border-2 border-dashed rounded-2xl p-6 sm:p-10 text-center transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950',
        isDragOver
          ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 scale-[0.995]'
          : 'border-slate-300/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/30 dark:hover:bg-blue-950/20',
        error && 'border-red-400 dark:border-red-600 bg-red-50/30 dark:bg-red-950/20',
        (disabled || isLoading) && 'opacity-60 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled || isLoading}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center space-y-3">
        <div
          className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs',
            isDragOver
              ? 'bg-blue-600 text-white'
              : 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50'
          )}
        >
          <UploadCloud size={28} />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {accept && (
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
              {accept.replace(/\./g, ' ').toUpperCase()}
            </span>
          )}
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
            Up to {maxSizeMB}MB
          </span>
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/60">
            100% Private
          </span>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium pt-1">{error}</p>
        )}
      </div>
    </div>
  );
}
