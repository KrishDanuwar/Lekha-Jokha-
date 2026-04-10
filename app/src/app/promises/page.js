'use client';

import { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/lib/i18n';
import { getPromiseStatuses } from '@/lib/queries';
import PromiseCard from '@/components/PromiseCard';
import FilterBar from '@/components/FilterBar';

export default function PromisesPage() {
  const { t } = useI18n();
  const [promises, setPromises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);

  useEffect(() => {
    getPromiseStatuses()
      .then(setPromises)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return promises.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeStatus && p.status_label !== activeStatus) return false;
      return true;
    });
  }, [promises, activeCategory, activeStatus]);

  if (loading) {
    return (
      <div className="container">
        <div className="page-header">
          <div className="skeleton skeleton--title" />
          <div className="skeleton skeleton--text" style={{ width: '40%' }} />
        </div>
        <div className="promise-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton skeleton--card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-header__title">{t('promises.title')}</h1>
        <p className="page-header__subtitle">{t('promises.subtitle')}</p>
      </div>

      <FilterBar
        activeCategory={activeCategory}
        activeStatus={activeStatus}
        onCategoryChange={setActiveCategory}
        onStatusChange={setActiveStatus}
      />

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">&#128269;</div>
          <p className="empty-state__text">{t('promises.empty')}</p>
        </div>
      ) : (
        <div className="promise-grid">
          {filtered.map((promise) => (
            <PromiseCard key={promise.id} promise={promise} />
          ))}
        </div>
      )}
    </div>
  );
}
