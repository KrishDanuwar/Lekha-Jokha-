import { Outfit, Source_Sans_3 } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/components.css';
import ClientProviders from '@/components/ClientProviders';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Lekha Jokha | Promise Accountability Tracker',
  description: 'Track elected representatives\' manifesto promises through milestone-based progress. Morang Constituency 4, Koshi Province.',
  keywords: ['accountability', 'promises', 'manifesto', 'Morang', 'Koshi', 'Nepal', 'transparency'],
  openGraph: {
    title: 'Lekha Jokha | Promise Accountability Tracker',
    description: 'Track manifesto promises through milestone-based progress.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${sourceSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="hsl(215, 50%, 23%)" />
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
