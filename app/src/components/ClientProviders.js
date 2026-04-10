'use client';

import { I18nProvider } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientProviders({ children }) {
  return (
    <I18nProvider>
      <Header />
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </I18nProvider>
  );
}
