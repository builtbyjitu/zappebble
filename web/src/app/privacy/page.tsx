import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how ZapPebble protects your privacy through local client-side processing. Your files, documents, and code never leave your browser.',
  alternates: {
    canonical: '/privacy'
  },
  openGraph: {
    title: 'Privacy Policy | ZapPebble',
    description:
      'Learn how ZapPebble protects your privacy through local client-side processing. Your files, documents, and code never leave your browser.',
    url: 'https://zappebble.appnix.org/privacy',
    siteName: 'ZapPebble',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | ZapPebble',
    description:
      'Learn how ZapPebble protects your privacy through local client-side processing. Your files, documents, and code never leave your browser.'
  }
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
          <ShieldCheck size={14} />
          <span>Privacy Commitment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          Last Updated: September 2026 • Effective Immediately
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
          <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 flex items-center mb-2">
            <Lock size={18} className="mr-2" />
            Our Core Privacy Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            Whenever you use our Image Compressor, Image Converter, JSON Formatter, Word Counter, QR Generator, Color Picker, or QR Scanner, all processing takes place entirely inside your browser&apos;s local memory. <strong>No file, image, or text payload is uploaded to our servers.</strong>
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            1. What Data We Process
          </h2>
          <p>
            ZapPebble is deliberately designed with zero-knowledge data minimization principles.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600 dark:text-slate-400">
            <li><strong>User Files & Content:</strong> Images, JSON snippets, text passages, and QR codes remain in local browser JavaScript memory and are discarded when you close or refresh the tab.</li>
            <li><strong>No User Accounts:</strong> We do not ask for or collect names, email addresses, phone numbers, or passwords.</li>
            <li><strong>Local Preferences:</strong> Small user preferences (such as light/dark mode selection and recent color picks) are stored locally in your browser&apos;s <code>localStorage</code> or Chrome Extension <code>chrome.storage.local</code>. This data never leaves your device.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            2. Web Analytics & Aggregated Telemetry
          </h2>
          <p>
            To monitor website stability and understand which tools are popular, we may collect aggregated, non-personally identifiable diagnostic events (such as page views or tool completion counts). We do not log IP addresses, keystrokes, clipboard text, or file contents.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            3. Advertising & Cookies
          </h2>
          <p>
            To keep ZapPebble 100% free with zero infrastructure cost to you, our website may display compliant, non-intrusive third-party advertisements (such as Google AdSense). These third-party partners may use standard cookies to serve ads based on prior visits to our website. You can adjust or opt out of personalized advertising anytime via your browser settings or privacy preference tools.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            * Note: Our Chrome Extension contains zero advertisements and does not inject ads into external webpages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            4. Chrome Extension Permissions
          </h2>
          <p>
            Our Chrome Extension operates strictly under Google&apos;s Manifest V3 least-privilege architecture:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600 dark:text-slate-400">
            <li><strong>activeTab:</strong> Requested only to allow instant tab capture for Screenshot to PDF or sampling colors when explicitly prompted by the user.</li>
            <li><strong>storage:</strong> Used strictly to save local preferences and recent color histories locally.</li>
            <li>We do NOT request access to browsing history, cookies, web request modification, or background tracking.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            5. Contact Us Regarding Privacy
          </h2>
          <p>
            If you have questions about our privacy architecture or client-side processing practices, please reach out via our <a href="/contact" className="text-blue-600 hover:underline">contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
