'use client';

import { useI18n } from '@/lib/i18n';

export default function ProgressBar({ percent, status }) {
  const { t } = useI18n();

  const fillClass =
    status === 'Completed' ? 'progress-bar__fill--completed' :
    status === 'Stalled' ? 'progress-bar__fill--stalled' : '';

  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${t('common.progress')}: ${percent}%`}>
      <div className="progress-bar__track">
        <div
          className={`progress-bar__fill ${fillClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="progress-bar__label">
        <span className="progress-bar__text">{t('common.progress')}</span>
        <span className="progress-bar__pct">{percent}%</span>
      </div>
    </div>
  );
}
