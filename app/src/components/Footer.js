'use client';

import { useI18n } from '@/lib/i18n';
import footerBg from '../footer-image.jpeg';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer 
      className="footer" 
      role="contentinfo"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 25, 41, 0.85), rgba(10, 25, 41, 0.85)), url("${footerBg.src}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Parallax-ish effect for grounded feel
        color: '#ffffff'
      }}
    >
      <div className="container footer__inner">
        <div className="footer__brand">{t('site.name')}</div>
        <p className="footer__text">{t('footer.disclaimer')}</p>
        <hr className="footer__divider" />
        <p className="footer__bottom">{t('footer.powered')}</p>
      </div>
    </footer>
  );
}
