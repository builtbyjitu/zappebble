import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Support',
  description:
    'Have a feature request, bug report, or partnership inquiry? Get in touch with the ZapPebble team.',
  alternates: {
    canonical: '/contact'
  },
  openGraph: {
    title: 'Contact & Support | ZapPebble',
    description:
      'Have a feature request, bug report, or partnership inquiry? Get in touch with the ZapPebble team.',
    url: 'https://zappebble.appnix.org/contact',
    siteName: 'ZapPebble',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Support | ZapPebble',
    description:
      'Have a feature request, bug report, or partnership inquiry? Get in touch with the ZapPebble team.'
  }
};

export default function ContactLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
