import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://webtools.local'),
  title: {
    default: 'WebTools — Free Browser Tools. Fast. Private. Simple.',
    template: '%s | WebTools'
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
  authors: [{ name: 'WebTools Team' }],
  creator: 'WebTools',
  publisher: 'WebTools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: 'WebTools — Free Browser Tools. Fast. Private. Simple.',
    description:
      'Fast, free and private browser utilities. Image compressor, format converter, JSON validator, QR generator, color picker and more.',
    url: 'https://webtools.local',
    siteName: 'WebTools',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebTools — Fast, Free & Private Browser Tools',
    description:
      'Useful free browser tools with zero infrastructure cost and 100% local processing.'
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
