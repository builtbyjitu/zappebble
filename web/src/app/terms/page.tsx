import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for ZapPebble website and Chrome extension.',
  alternates: {
    canonical: '/terms'
  },
  openGraph: {
    title: 'Terms of Service | ZapPebble',
    description: 'Terms of service for ZapPebble website and Chrome extension.',
    url: 'https://zappebble.appnix.org/terms',
    siteName: 'ZapPebble',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | ZapPebble',
    description: 'Terms of service for ZapPebble website and Chrome extension.'
  }
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          Last Updated: September 2026
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the ZapPebble website or the ZapPebble Chrome Extension (operated by Appnix Technologies), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            2. Permitted Use & Local Processing
          </h2>
          <p>
            ZapPebble provides client-side browser utilities for personal, educational, and commercial purposes. You agree not to misuse our tools or attempt to reverse-engineer malicious payloads through the platform. You remain solely responsible for the legality of any content you process through ZapPebble.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            3. Disclaimer of Warranties
          </h2>
          <p>
            ZapPebble is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. While we strive to provide reliable and accurate browser utilities, we do not warrant that tools will be uninterrupted, error-free, or suitable for critical missions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall ZapPebble, Appnix Technologies, or its contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use our tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            5. Modifications
          </h2>
          <p>
            We reserve the right to modify or replace these terms at any time. Continued use of ZapPebble following changes constitutes your acceptance of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
}
