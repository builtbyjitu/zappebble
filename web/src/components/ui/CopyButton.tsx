'use client';

import React, { useState } from 'react';
import { Button, ButtonProps } from './Button';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@webtools/shared';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  textToCopy: string;
  onCopied?: () => void;
  label?: string;
  copiedLabel?: string;
}

export function CopyButton({
  textToCopy,
  onCopied,
  label = 'Copy',
  copiedLabel = 'Copied!',
  variant = 'outline',
  size = 'sm',
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      onCopied?.();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      type="button"
      variant={copied ? 'success' : variant}
      size={size}
      onClick={handleCopy}
      leftIcon={copied ? <Check size={14} /> : <Copy size={14} />}
      {...props}
    >
      {copied ? copiedLabel : label}
    </Button>
  );
}
