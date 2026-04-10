'use client';

import { useI18n } from '@/lib/i18n';

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
      <div className="page-header">
        <h1 className="page-header__title">{t('about.title')}</h1>
      </div>

      <div className="about-content">
        <section className="about-content__section">
          <h2 className="about-content__title">{t('about.what.title')}</h2>
          <p className="about-content__text">{t('about.what.description')}</p>
        </section>

        <section className="about-content__section">
          <h2 className="about-content__title">{t('about.scope.title')}</h2>
          <p className="about-content__text">{t('about.scope.description')}</p>
        </section>

        <section className="about-content__section">
          <h2 className="about-content__title">{t('about.how.title')}</h2>
          <p className="about-content__text">{t('about.how.description')}</p>
        </section>

        <section className="about-content__section">
          <h2 className="about-content__title">{t('about.stalled.title')}</h2>
          <p className="about-content__text">{t('about.stalled.description')}</p>
        </section>

        <section className="about-content__section">
          <h2 className="about-content__title">{t('about.feedback.title')}</h2>
          <p className="about-content__text">{t('about.feedback.description')}</p>
        </section>
      </div>
    </div>
  );
}
