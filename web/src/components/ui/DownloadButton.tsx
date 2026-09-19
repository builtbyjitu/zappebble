'use client';

import React, { useState } from 'react';
import { Button, ButtonProps } from './Button';
import { Download, Check, AlertCircle } from 'lucide-react';
import { downloadBlob, downloadDataUrl } from '@webtools/shared';

export interface DownloadButtonProps extends Omit<ButtonProps, 'onClick'> {
  blob?: Blob;
  dataUrl?: string;
  filename: string;
  onDownloaded?: () => void;
  onClick?: () => void | Promise<void>;
  downloadingLabel?: string;
  downloadedLabel?: string;
}

export function DownloadButton({
  blob,
  dataUrl,
  filename,
  onDownloaded,
  onClick,
  children = 'Download',
  downloadingLabel = 'Downloading...',
  downloadedLabel = 'Downloaded!',
  leftIcon,
  variant = 'primary',
  ...props
}: DownloadButtonProps) {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');

  const handleDownload = async () => {
    try {
      setStatus('downloading');
      if (onClick) {
        await onClick();
      } else if (blob) {
        downloadBlob(blob, filename);
        onDownloaded?.();
      } else if (dataUrl) {
        downloadDataUrl(dataUrl, filename);
        onDownloaded?.();
      }
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  const getIcon = () => {
    if (status === 'success') return <Check size={16} className="text-white shrink-0" />;
    if (status === 'error') return <AlertCircle size={16} className="shrink-0" />;
    if (leftIcon !== undefined) return leftIcon;
    return <Download size={16} className="shrink-0" />;
  };

  const getLabel = () => {
    if (status === 'downloading') return downloadingLabel;
    if (status === 'success') return downloadedLabel;
    if (status === 'error') return 'Download Failed';
    return children;
  };

  return (
    <Button
      type="button"
      variant={status === 'success' ? 'success' : status === 'error' ? 'danger' : variant}
      isLoading={status === 'downloading'}
      onClick={handleDownload}
      leftIcon={getIcon()}
      {...props}
    >
      {getLabel()}
    </Button>
  );
}
