'use client';

import React, { useState } from 'react';
import { Button, ButtonProps } from './Button';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '@webtools/shared';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  textToCopy: string;
  onCopied?: () => void;
  label?: string;
  copiedLabel?: string;
  errorLabel?: string;
}

export function CopyButton({
  textToCopy,
  onCopied,
  label = 'Copy',
  copiedLabel = 'Copied!',
  errorLabel = 'Failed',
  variant = 'outline',
  size = 'sm',
  ...props
}: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopy = async () => {
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setStatus('copied');
      onCopied?.();
      setTimeout(() => setStatus('idle'), 2000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  return (
    <Button
      type="button"
      variant={status === 'copied' ? 'success' : status === 'error' ? 'danger' : variant}
      size={size}
      onClick={handleCopy}
      leftIcon={
        status === 'copied' ? (
          <Check size={14} className="shrink-0" />
        ) : status === 'error' ? (
          <AlertCircle size={14} className="shrink-0" />
        ) : (
          <Copy size={14} className="shrink-0" />
        )
      }
      {...props}
    >
      {status === 'copied' ? copiedLabel : status === 'error' ? errorLabel : label}
    </Button>
  );
}
