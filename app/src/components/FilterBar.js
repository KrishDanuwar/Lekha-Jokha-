'use client';

import { useI18n } from '@/lib/i18n';

const CATEGORIES = [
  'infrastructure', 'education', 'health', 'agriculture',
  'employment', 'governance', 'environment', 'social_welfare',
  'economy', 'other'
];

const STATUSES = ['Completed', 'In Progress', 'Not Started', 'Stalled'];

export default function FilterBar({ activeCategory, activeStatus, onCategoryChange, onStatusChange }) {
  const { t } = useI18n();

  return (
    <div className="filter-bar" role="search" aria-label="Filter promises">
      <div className="filter-bar__group">
        <span className="filter-bar__label">{t('promises.filter.category')}:</span>
        <button
          className={`filter-bar__btn ${!activeCategory ? 'filter-bar__btn--active' : ''}`}
          onClick={() => onCategoryChange(null)}
          aria-pressed={!activeCategory}
        >
          {t('promises.filter.all')}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-bar__btn ${activeCategory === cat ? 'filter-bar__btn--active' : ''}`}
            onClick={() => onCategoryChange(cat)}
            aria-pressed={activeCategory === cat}
          >
            {t(`category.${cat}`)}
          </button>
        ))}
      </div>

      <div className="filter-bar__divider" aria-hidden="true" />

      <div className="filter-bar__group">
        <span className="filter-bar__label">{t('promises.filter.status')}:</span>
        <button
          className={`filter-bar__btn ${!activeStatus ? 'filter-bar__btn--active' : ''}`}
          onClick={() => onStatusChange(null)}
          aria-pressed={!activeStatus}
        >
          {t('promises.filter.all')}
        </button>
        {STATUSES.map((status) => {
          const key = status.toLowerCase().replace(/\s+/g, '');
          const labelMap = {
            'completed': 'status.completed',
            'inprogress': 'status.inProgress',
            'notstarted': 'status.notStarted',
            'stalled': 'status.stalled',
          };
          return (
            <button
              key={status}
              className={`filter-bar__btn ${activeStatus === status ? 'filter-bar__btn--active' : ''}`}
              onClick={() => onStatusChange(status)}
              aria-pressed={activeStatus === status}
            >
              {t(labelMap[key])}
            </button>
          );
        })}
      </div>
    </div>
  );
}
