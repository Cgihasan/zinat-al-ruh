import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Manrope } from 'next/font/google';
import './globals.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  // Bodoni Moda's lightest available weight is 400; CSS font-weight:300 falls back to it.
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zinatalruh.com'),
  title: 'Zinat Al Ruh Technical Services LLC | Premium Interior Fit-Out, Dubai UAE',
  description:
    'Zinat Al Ruh Technical Services LLC — Dubai-based interior fit-out, design consultancy and technical services for residential, commercial, retail and hospitality projects across the UAE. Design. Build. Supervise. Deliver.',
  keywords:
    'interior fit-out Dubai, fit-out contractor UAE, luxury interior contractor Dubai, renovation Deira, glass and aluminium UAE, flooring works Dubai, design consultant Dubai, technical services LLC, site work contractor UAE, Zinat Al Ruh',
  authors: [{ name: 'Zinat Al Ruh Technical Services LLC' }],
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  alternates: { canonical: 'https://zinatalruh.com/' },
  icons: { icon: '/assets/logo-color.png', apple: '/assets/logo-color.png' },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'Zinat Al Ruh Technical Services',
    title: 'Zinat Al Ruh — Premium Interior Fit-Out, Dubai',
    description:
      'Design. Build. Supervise. Deliver. Turnkey interior fit-out, design consultancy and site supervision across the UAE.',
    url: 'https://zinatalruh.com/',
    images: ['/assets/design/04-formal-living.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zinat Al Ruh — Premium Interior Fit-Out, Dubai UAE',
    description: 'Design. Build. Supervise. Deliver.',
    images: ['/assets/design/04-formal-living.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#001a2b',
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: 'Zinat Al Ruh Technical Services LLC',
  url: 'https://zinatalruh.com/',
  logo: 'https://zinatalruh.com/assets/logo-color.png',
  telephone: '+971-58-525-8199',
  email: 'sales@zinatalruh.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Deira',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
  priceRange: '$$$$',
  description:
    'Dubai-based interior fit-out and technical services company delivering high-quality residential, commercial, retail, and hospitality projects across the UAE.',
  serviceType: [
    'Interior Fit-Out',
    'Renovation & Finishing',
    'Glass & Aluminium',
    'Flooring Works',
    'Custom Interior Solutions',
    'Technical Coordination',
    'Site Work',
    'Design Consultant',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
