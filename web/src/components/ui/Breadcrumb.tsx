import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  toolName?: string;
  className?: string;
}

export function Breadcrumb({ items, toolName, className }: BreadcrumbProps) {
  // Construct default 3-tier items if toolName is provided
  const resolvedItems: BreadcrumbItem[] = items || [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools' },
    ...(toolName ? [{ label: toolName }] : [])
  ];

  const baseUrl = 'https://zappebble.appnix.org';

  // Construct valid Schema.org BreadcrumbList JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: resolvedItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}` }
        : {})
    }))
  };

  return (
    <>
      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className={cn(
          'flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-6 overflow-x-auto py-1 no-scrollbar',
          className
        )}
      >
        <ol className="flex items-center space-x-1.5">
          {resolvedItems.map((item, index) => {
            const isLast = index === resolvedItems.length - 1;
            const isHome = index === 0;

            return (
              <li key={index} className="flex items-center space-x-1.5 shrink-0">
                {index > 0 && (
                  <ChevronRight
                    size={12}
                    className="text-slate-400 dark:text-slate-600 shrink-0"
                    aria-hidden="true"
                  />
                )}

                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm px-1 py-0.5"
                  >
                    {isHome && <Home size={12} className="shrink-0 mr-0.5" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px] sm:max-w-xs px-1 py-0.5"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
