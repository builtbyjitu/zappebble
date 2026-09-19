import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://zappebble.appnix.org'),
  title: {
    default: 'ZapPebble — Free Browser Tools. Fast. Private. Simple.',
    template: '%s | ZapPebble'
  },
  alternates: {
    canonical: '/'
  },
  description:
    'Fast, free, and private browser tools for everyday work, study, and development. 100% client-side processing. Your files never leave your device.',
  keywords: [
    'browser tools',
    'free online tools',
    'image compressor',
    'image converter',
    'screenshot to pdf',
    'qr code generator',
    'json formatter',
    'word counter',
    'color picker',
    'qr scanner',
    'private developer tools'
  ],
  authors: [{ name: 'Appnix Technologies', url: 'https://zappebble.appnix.org' }],
  creator: 'Appnix Technologies',
  publisher: 'Appnix Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: 'ZapPebble — Free Browser Tools. Fast. Private. Simple.',
    description:
      'Fast, free and private browser utilities. Image compressor, format converter, JSON validator, QR generator, color picker and more.',
    url: 'https://zappebble.appnix.org',
    siteName: 'ZapPebble',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZapPebble — Fast, Free & Private Browser Tools',
    description:
      'Small tools. Big time saved. Free browser tools with zero infrastructure cost and 100% local processing.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'IsN-M6EFWNP94O2X5O-x4IahDMbDFCPsiUOD9LCPLb8'
  },
  other: {
    'google-adsense-account': 'ca-pub-1584046499785928'
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-blue-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
