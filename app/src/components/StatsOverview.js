'use client';

import { useI18n } from '@/lib/i18n';

export default function StatsOverview({ promises }) {
  const { t } = useI18n();

  const total = promises.length;
  const completed = promises.filter((p) => p.status_label === 'Completed').length;
  const inProgress = promises.filter((p) => p.status_label === 'In Progress').length;
  const notStarted = promises.filter((p) => p.status_label === 'Not Started').length;
  const stalled = promises.filter((p) => p.status_label === 'Stalled').length;

  const stats = [
    { value: total, label: t('home.stats.total'), cls: '' },
    { value: completed, label: t('home.stats.completed'), cls: 'stats__card--completed' },
    { value: inProgress, label: t('home.stats.inProgress'), cls: 'stats__card--inProgress' },
    { value: notStarted, label: t('home.stats.notStarted'), cls: 'stats__card--notStarted' },
    { value: stalled, label: t('home.stats.stalled'), cls: 'stats__card--stalled' },
  ];

  return (
    <div className="stats" aria-label={t('home.stats.title')}>
      <div className="stats__grid">
        {stats.map((stat, i) => (
          <div key={i} className={`stats__card ${stat.cls}`}>
            <div className="stats__number">{stat.value}</div>
            <div className="stats__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
