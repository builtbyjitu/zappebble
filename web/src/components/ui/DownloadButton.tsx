'use client';

import React from 'react';
import { Button, ButtonProps } from './Button';
import { Download } from 'lucide-react';
import { downloadBlob, downloadDataUrl } from '@webtools/shared';

export interface DownloadButtonProps extends Omit<ButtonProps, 'onClick'> {
  blob?: Blob;
  dataUrl?: string;
  filename: string;
  onDownloaded?: () => void;
  onClick?: () => void;
}

export function DownloadButton({
  blob,
  dataUrl,
  filename,
  onDownloaded,
  onClick,
  children = 'Download',
  leftIcon = <Download size={16} />,
  ...props
}: DownloadButtonProps) {
  const handleDownload = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (blob) {
      downloadBlob(blob, filename);
      onDownloaded?.();
    } else if (dataUrl) {
      downloadDataUrl(dataUrl, filename);
      onDownloaded?.();
    }
  };

  return (
    <Button
      type="button"
      onClick={handleDownload}
      leftIcon={leftIcon}
      {...props}
    >
      {children}
    </Button>
  );
}
