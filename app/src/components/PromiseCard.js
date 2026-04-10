'use client';

import Link from 'next/link';
import { useI18n, localize } from '@/lib/i18n';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';

export default function PromiseCard({ promise }) {
  const { locale, t } = useI18n();

  const title = localize(promise, 'title', locale);
  const statusSlug = promise.status_label?.toLowerCase().replace(/\s+/g, '-') || 'not-started';
  const categoryKey = `category.${promise.category}`;

  return (
    <Link
      href={`/promises/${promise.id}`}
      className={`promise-card promise-card--${statusSlug}`}
      id={`promise-card-${promise.id}`}
    >
      <div className="promise-card__header">
        <h3 className="promise-card__title">{title}</h3>
        <div className={`promise-card__checkbox ${promise.is_checkbox_ticked ? 'promise-card__checkbox--ticked' : ''}`} aria-label={promise.is_checkbox_ticked ? 'Promise fulfilled' : 'Promise not yet fulfilled'}>
          {promise.is_checkbox_ticked && (
            <svg className="promise-card__checkbox-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 6L5 8.5L9.5 3.5" />
            </svg>
          )}
        </div>
      </div>

      <div className="promise-card__meta">
        <span className="category-badge">{t(categoryKey)}</span>
        <StatusBadge status={promise.status_label} />
      </div>

      <ProgressBar percent={promise.progress_pct || 0} status={promise.status_label} />

      <div className="promise-card__footer">
        <span className="promise-card__view">
          {t('common.viewDetails')}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M5 3L9 7L5 11" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
