import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Support',
  description:
    'Have a feature request, bug report, or partnership inquiry? Get in touch with the ZapPebble team.',
  alternates: {
    canonical: '/contact'
  }
};

export default function ContactLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
