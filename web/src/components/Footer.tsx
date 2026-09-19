import React from 'react';
import Link from 'next/link';
import { TOOLS, TOOL_CATEGORIES } from '@webtools/shared';
import { ShieldCheck, Heart, Chrome } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Privacy Mission */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-0.5"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <span className="text-base font-extrabold tracking-tighter">Z</span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Zap<span className="text-blue-600 dark:text-blue-400">Pebble</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-700 dark:text-slate-300 font-semibold block mb-0.5">
                Small tools. Big time saved.
              </strong>
              Free, fast, and private browser utilities for everyday productivity, study, and software engineering.
            </p>
            <div className="flex items-start space-x-2.5 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 p-3 rounded-xl leading-relaxed">
              <ShieldCheck size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <span>
                <strong>100% Private:</strong> Your files are processed locally in your browser. Nothing is uploaded to our servers.
              </span>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Featured Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {TOOLS.slice(0, 5).map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={tool.path}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools & Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Tool Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {TOOL_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/tools#${cat.id}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                >
                  About ZapPebble
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                >
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link
                  href="#install-extension"
                  className="inline-flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                >
                  <Chrome size={14} />
                  <span>Chrome Extension</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} ZapPebble by Appnix Technologies. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Built with</span>
            <Heart size={13} className="text-red-500 fill-red-500" />
            <span>for privacy-conscious web users</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
