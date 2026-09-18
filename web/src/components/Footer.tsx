import React from 'react';
import Link from 'next/link';
import { TOOLS, TOOL_CATEGORIES } from '@webtools/shared';
import { ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Privacy Mission */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <span className="text-base tracking-tighter">Z</span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Zap<span className="text-blue-600 dark:text-blue-400">Pebble</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Small tools. Big time saved. Free, fast, and private browser utilities for everyday work, study, and software development.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-2.5 rounded-lg">
              <ShieldCheck size={16} className="shrink-0" />
              <span>Your files are processed locally in your browser. Nothing is uploaded to our servers.</span>
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
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {TOOL_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/tools#${cat.id}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About ZapPebble
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contact & Support
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
