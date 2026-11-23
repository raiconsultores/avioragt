import './globals.css';

export const metadata = {
  title: 'AVIORA | Luxury Travel & Bespoke Experiences',
  description: 'AVIORA designs private luxury journeys and bespoke experiences. Rooted in Guatemala, inspired by the world.',
  openGraph: {
    type: 'website',
    siteName: 'AVIORA',
    title: 'AVIORA | Luxury Travel & Bespoke Experiences',
    description: 'The Art of Extraordinary Travel. Exceptional destinations. Meaningful experiences.',
  },
  // International SEO: replace the placeholder domain once it is confirmed.
  alternates: {
    languages: {
      en: 'https://www.aviora.example/en/',
      es: 'https://www.aviora.example/es/',
      fr: 'https://www.aviora.example/fr/',
      de: 'https://www.aviora.example/de/',
      'zh-Hans': 'https://www.aviora.example/zh/',
      it: 'https://www.aviora.example/it/',
      'x-default': 'https://www.aviora.example/en/',
    },
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
