import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOOLS, getToolBySlug } from '@webtools/shared';
import { ToolLayout } from '@/components/ui/ToolLayout';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ImageCompressorTool } from '@/components/tools/ImageCompressorTool';
import { ImageConverterTool } from '@/components/tools/ImageConverterTool';
import { JsonFormatterTool } from '@/components/tools/JsonFormatterTool';
import { WordCounterTool } from '@/components/tools/WordCounterTool';
import { QrGeneratorTool } from '@/components/tools/QrGeneratorTool';
import { ColorPickerTool } from '@/components/tools/ColorPickerTool';
import { ScreenshotPdfTool } from '@/components/tools/ScreenshotPdfTool';
import { QrScannerTool } from '@/components/tools/QrScannerTool';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    alternates: {
      canonical: tool.seo.canonicalPath
    },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: `https://webtools.local${tool.path}`,
      siteName: 'WebTools',
      type: 'website'
    }
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const renderToolComponent = () => {
    switch (tool.slug) {
      case 'image-compressor':
        return <ImageCompressorTool />;
      case 'image-converter':
        return <ImageConverterTool />;
      case 'json-formatter':
        return <JsonFormatterTool />;
      case 'word-counter':
        return <WordCounterTool />;
      case 'qr-generator':
        return <QrGeneratorTool />;
      case 'color-picker':
        return <ColorPickerTool />;
      case 'screenshot-to-pdf':
        return <ScreenshotPdfTool />;
      case 'qr-scanner':
        return <QrScannerTool />;
      default:
        return (
          <div className="text-center py-12 px-4 max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
              <Sparkles size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {tool.name} Engine
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {tool.tagline}
            </p>
            <div className="pt-2 flex items-center justify-center space-x-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck size={16} />
              <span>Modular Client-Side Engine Architecture Active</span>
            </div>
          </div>
        );
    }
  };

  return <ToolLayout tool={tool}>{renderToolComponent()}</ToolLayout>;
}
