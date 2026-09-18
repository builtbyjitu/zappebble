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
  className?: string;
}

export function FileDropzone({
  onFilesSelected,
  accept,
  multiple = false,
  maxSizeMB = 50,
  title = 'Drag & drop files here, or click to browse',
  subtitle = 'Files are processed locally in your browser',
  className
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const filesArray = Array.from(fileList);
    onFilesSelected(filesArray);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        'group cursor-pointer border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all bg-slate-50/50 dark:bg-slate-900/40 hover:bg-blue-50/40 dark:hover:bg-blue-950/20',
        isDragOver
          ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 scale-[0.99]'
          : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600',
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center space-y-3">
        <div
          className={cn(
            'p-4 rounded-full transition-transform group-hover:scale-110',
            isDragOver
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
          )}
        >
          <UploadCloud size={32} />
        </div>
        <div>
          <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {subtitle} {accept && `• Supports ${accept.replace(/\./g, ' ').toUpperCase()}`} • Up to {maxSizeMB}MB
          </p>
        </div>
      </div>
    </div>
  );
}
