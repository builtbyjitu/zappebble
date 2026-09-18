import React, { useState, useMemo, useEffect } from 'react';
import { TOOLS, ToolDefinition } from '@webtools/shared';
import {
  Minimize2,
  RefreshCw,
  FileText,
  QrCode,
  Code,
  FileSearch,
  Pipette,
  ScanBarcode,
  Search,
  ExternalLink,
  Sun,
  Moon,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Minimize2,
  RefreshCw,
  FileText,
  QrCode,
  Code,
  FileSearch,
  Pipette,
  ScanBarcode
};

import { ImageCompressorView } from '../tools/image-compressor/ImageCompressorView';
import { ImageConverterView } from '../tools/image-converter/ImageConverterView';
import { JsonFormatterView } from '../tools/json-formatter/JsonFormatterView';
import { WordCounterView } from '../tools/word-counter/WordCounterView';
import { QrGeneratorView } from '../tools/qr-generator/QrGeneratorView';
import { ColorPickerView } from '../tools/color-picker/ColorPickerView';
import { ScreenshotPdfView } from '../tools/screenshot-pdf/ScreenshotPdfView';
import { QrScannerView } from '../tools/qr-scanner/QrScannerView';

export const Popup: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return TOOLS;
    return TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.categoryLabel.toLowerCase().includes(q) ||
        tool.seo.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const getBaseWebUrl = (): string => {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SITE_URL) {
      return (import.meta as any).env.VITE_SITE_URL.replace(/\/+$/, '');
    }
    if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
    }
    // Default to local development server http://localhost:3000
    return 'http://localhost:3000';
  };

  const openWebTool = (tool?: ToolDefinition) => {
    const base = getBaseWebUrl();
    const url = tool ? `${base}${tool.path}` : base;
    if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  const handleToolClick = (tool: ToolDefinition) => {
    const supportedPopupTools = [
      'image-compressor',
      'image-converter',
      'json-formatter',
      'word-counter',
      'qr-generator',
      'color-picker',
      'screenshot-to-pdf',
      'qr-scanner'
    ];
    if (supportedPopupTools.includes(tool.id)) {
      setActiveTool(tool.id);
    } else {
      openWebTool(tool);
    }
  };

  if (activeTool === 'image-compressor') {
    return (
      <div className="w-[380px] min-h-[520px] max-h-[580px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <ImageCompressorView
          onBack={() => setActiveTool(null)}
          onOpenWeb={() => openWebTool(TOOLS.find((t) => t.id === 'image-compressor'))}
        />
      </div>
    );
  }

  if (activeTool === 'image-converter') {
    return (
      <div className="w-[380px] min-h-[520px] max-h-[580px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <ImageConverterView
          onBack={() => setActiveTool(null)}
          onOpenWeb={() => openWebTool(TOOLS.find((t) => t.id === 'image-converter'))}
        />
      </div>
    );
  }

  if (activeTool === 'json-formatter') {
    return (
      <div className="w-[380px] min-h-[520px] max-h-[580px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <JsonFormatterView
          onBack={() => setActiveTool(null)}
          onOpenWeb={() => openWebTool(TOOLS.find((t) => t.id === 'json-formatter'))}
        />
      </div>
    );
  }

  if (activeTool === 'word-counter') {
    return (
      <div className="w-[380px] min-h-[520px] max-h-[580px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <WordCounterView
          onBack={() => setActiveTool(null)}
          onOpenWeb={() => openWebTool(TOOLS.find((t) => t.id === 'word-counter'))}
        />
      </div>
    );
  }

  if (activeTool === 'qr-generator') {
    return (
      <div className="w-[380px] min-h-[520px] max-h-[580px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <QrGeneratorView
          onBack={() => setActiveTool(null)}
          onOpenWeb={() => openWebTool(TOOLS.find((t) => t.id === 'qr-generator'))}
        />
      </div>
    );
  }

  if (activeTool === 'color-picker') {
    return (
      <div className="w-[380px] min-h-[520px] max-h-[580px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <ColorPickerView
          onBack={() => setActiveTool(null)}
          onOpenWeb={() => openWebTool(TOOLS.find((t) => t.id === 'color-picker'))}
        />
      </div>
    );
  }

  if (activeTool === 'screenshot-to-pdf') {
    return (
      <div className="w-[380px] min-h-[520px] max-h-[580px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <ScreenshotPdfView
          onBack={() => setActiveTool(null)}
          onOpenWeb={() => openWebTool(TOOLS.find((t) => t.id === 'screenshot-to-pdf'))}
        />
      </div>
    );
  }

  if (activeTool === 'qr-scanner') {
    return (
      <div className="w-[380px] min-h-[520px] max-h-[580px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <QrScannerView
          onBack={() => setActiveTool(null)}
          onOpenWeb={() => openWebTool(TOOLS.find((t) => t.id === 'qr-scanner'))}
        />
      </div>
    );
  }

  return (
    <div className="w-[380px] min-h-[520px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            <span className="text-base tracking-tighter">W</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                WEBTOOLS
              </h1>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-0.5">
              Fast • Free • Private
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsDark(!isDark)}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </header>

      {/* Search Bar */}
      <div className="p-3.5 pb-2">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Tools Section */}
      <div className="flex-1 px-3.5 py-1.5 overflow-y-auto space-y-1.5">
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {searchQuery ? `Matching Tools (${filteredTools.length})` : 'Popular Tools'}
          </span>
          <span className="flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck size={12} className="mr-0.5" /> 100% Client-Side
          </span>
        </div>

        {filteredTools.length === 0 ? (
          <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-xs">
            No tools found matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          filteredTools.map((tool) => {
            const Icon = ICON_MAP[tool.iconName] || Sparkles;
            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className="w-full text-left group p-2.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700/60 transition-all flex items-start space-x-3 shadow-xs"
              >
                <div className="p-2 rounded-md bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-colors shrink-0">
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                      {tool.name}
                    </h2>
                    <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {tool.categoryLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {tool.tagline}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Footer */}
      <footer className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <button
          onClick={() => openWebTool()}
          className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
        >
          <span>Open WebTools Full Platform</span>
          <ExternalLink size={13} />
        </button>
      </footer>
    </div>
  );
};
