'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';

export default function Header() {
  const { t, locale, toggleLocale } = useI18n();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/promises', label: t('nav.promises') },
    { href: '/about', label: t('nav.about') },
  ];

  return (
    <header className="header" role="banner">
      <div className="container header__inner">
        <Link href="/" className="header__brand" aria-label="Lekha Jokha Home">
          <div className="header__logo" aria-hidden="true">LJ</div>
          <span className="header__title">{t('site.name')}</span>
        </Link>

        <button
          className="header__menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <nav
          id="main-nav"
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`header__link ${pathname === link.href ? 'header__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="header__lang-btn"
            onClick={toggleLocale}
            aria-label={`Switch to ${locale === 'en' ? 'Nepali' : 'English'}`}
          >
            {locale === 'en' ? 'NP' : 'EN'}
          </button>
        </nav>
      </div>
    </header>
  );
}
