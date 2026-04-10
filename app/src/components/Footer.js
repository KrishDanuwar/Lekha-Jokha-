'use client';

import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">{t('site.name')}</div>
        <p className="footer__text">{t('footer.disclaimer')}</p>
        <hr className="footer__divider" />
        <p className="footer__bottom">{t('footer.powered')}</p>
      </div>
    </footer>
  );
}
