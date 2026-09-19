'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolFaq } from '@webtools/shared';

export interface FAQProps {
  items: ToolFaq[];
  title?: string;
  className?: string;
}

export function FAQ({ items, title = 'Frequently Asked Questions', className }: FAQProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className={cn('w-full', className)}>
      {title && (
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          {title}
        </h3>
      )}
      <div className="divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
        {items.map((item, index) => {
          const isOpen = openIndices.includes(index);
          const buttonId = `faq-btn-${index}`;
          const contentId = `faq-content-${index}`;

          return (
            <div key={index} className="py-4">
              <button
                id={buttonId}
                type="button"
                onClick={() => toggleIndex(index)}
                className="flex w-full items-center justify-between text-left font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                aria-expanded={isOpen}
                aria-controls={contentId}
              >
                <span className="text-sm sm:text-base font-semibold pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0',
                    isOpen && 'rotate-180 text-blue-600 dark:text-blue-400'
                  )}
                />
              </button>
              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed animate-in fade-in-50 duration-150"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
