import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Zap, Globe, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About ZapPebble — Free & Private Browser Utilities',
  description:
    'Learn about ZapPebble mission: providing lightning-fast, 100% private client-side browser utilities with zero infrastructure footprint.',
  alternates: {
    canonical: '/about'
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          About ZapPebble
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Fast, free, and private browser tools built by Appnix Technologies for everyday work, study, and software engineering.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-2">
            Our Core Mission
          </h2>
          <p className="text-blue-800 dark:text-blue-300 text-sm sm:text-base">
            Every day, millions of people search for simple utilities like image compression, PDF conversion, or JSON formatting. Most existing websites force users to upload their sensitive files to remote servers, wait in artificial queues, or pay for expensive subscriptions. We built ZapPebble to change that.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Zero-Server Architecture
          </h2>
          <p>
            Modern web browsers are capable operating environments equipped with WebAssembly, HTML5 Canvas, Web Workers, and hardware-accelerated graphics. ZapPebble harnesses these native client-side APIs to execute complex file transformations right on your device.
          </p>
          <p className="mt-3">
            Because processing occurs locally:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Your files never leave your computer:</strong> Zero risk of data breaches or surveillance.</li>
            <li><strong>Zero network delay:</strong> Files process instantly without waiting for upload or download bandwidth.</li>
            <li><strong>Almost zero infrastructure costs:</strong> We pass these savings directly to you by keeping all tools permanently free.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-3" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Privacy First</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Client-side operations mean your documents never touch a cloud database.</p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Zap className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Instant Execution</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">No waiting queues or artificial rate limits. Native browser speeds.</p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Globe className="w-8 h-8 text-indigo-500 mb-3" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Ecosystem</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Available as an open web application and as a lightweight Chrome extension.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
