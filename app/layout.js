import './globals.css';
import { SITE_URL } from '@/lib/site';

// The language switch happens on the same page (no /es/, /en/ routes), so there are no hreflang alternates:
// one canonical URL for the whole site.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'AVIORA | Luxury Travel & Bespoke Experiences',
  description: 'AVIORA designs private luxury journeys and bespoke experiences. Rooted in Guatemala, inspired by the world.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'AVIORA',
    title: 'AVIORA | Luxury Travel & Bespoke Experiences',
    description: 'The Art of Extraordinary Travel. Exceptional destinations. Meaningful experiences.',
    images: [{ url: '/img/pool.jpg', alt: 'AVIORA' }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F4EFE7',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'AVIORA',
  url: SITE_URL,
  image: `${SITE_URL}/img/pool.jpg`,
  slogan: 'The Art of Extraordinary Travel',
  description: 'Boutique luxury travel firm designing private journeys and bespoke experiences. Rooted in Guatemala, inspired by the world.',
  knowsLanguage: ['en', 'es', 'fr', 'de', 'it', 'zh'],
  areaServed: ['Guatemala', 'Italy', 'Japan', 'East Africa', 'Jordan', 'Maldives'],
};

const FONTS =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400&family=Noto+Serif+SC:wght@300;400&family=Noto+Serif+KR:wght@300;400&family=Noto+Sans+JP:wght@300;400;500&family=Noto+Sans+SC:wght@300;400;500&family=Noto+Sans+KR:wght@300;400;500&display=swap';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={FONTS} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
