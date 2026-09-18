'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Chrome, Menu, X, Layers, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/Button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <span className="text-lg tracking-tighter">W</span>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Web<span className="text-blue-600 dark:text-blue-400">Tools</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-300">
              Free & Private
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/tools"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1"
          >
            <Layers size={15} />
            <span>All Tools</span>
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1"
          >
            <ShieldCheck size={15} className="text-emerald-500" />
            <span>Privacy</span>
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />

          <Link href="#install-extension" className="hidden sm:inline-flex">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Chrome size={15} />}
              className="rounded-xl shadow-xs"
            >
              Get Extension
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600"
          >
            All Tools
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600"
          >
            About
          </Link>
          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Link
              href="#install-extension"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm"
            >
              <Chrome size={16} />
              <span>Get Chrome Extension</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
