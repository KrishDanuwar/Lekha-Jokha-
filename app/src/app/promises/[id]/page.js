'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n, localize } from '@/lib/i18n';
import { getPromiseStatus, getMilestones } from '@/lib/queries';
import StatusBadge from '@/components/StatusBadge';
import ProgressBar from '@/components/ProgressBar';
import MilestoneTimeline from '@/components/MilestoneTimeline';
import EvidenceLink from '@/components/EvidenceLink';
import FeedbackForm from '@/components/FeedbackForm';

export default function PromiseDetailPage() {
  const { id } = useParams();
  const { locale, t } = useI18n();
  const [promise, setPromise] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [promiseData, milestonesData] = await Promise.all([
          getPromiseStatus(id),
          getMilestones(id),
        ]);
        setPromise(promiseData);
        setMilestones(milestonesData);
      } catch (err) {
        console.error('Failed to load promise:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="promise-detail" style={{ paddingTop: 'var(--space-10)' }}>
          <div className="skeleton skeleton--text" style={{ width: '120px' }} />
          <div className="skeleton skeleton--title" style={{ marginTop: 'var(--space-6)' }} />
          <div className="skeleton skeleton--text" style={{ width: '80%' }} />
          <div className="skeleton skeleton--text" style={{ width: '60%' }} />
          <div className="skeleton skeleton--card" style={{ marginTop: 'var(--space-8)' }} />
        </div>
      </div>
    );
  }

  if (error || !promise) {
    return (
      <div className="container">
        <div className="empty-state" style={{ paddingTop: 'var(--space-16)' }}>
          <div className="empty-state__icon" aria-hidden="true">&#9888;</div>
          <p className="empty-state__text">{t('common.error')}</p>
          <Link href="/promises" className="promise-detail__back" style={{ marginTop: 'var(--space-4)', justifyContent: 'center' }}>
            {t('promise.back')}
          </Link>
        </div>
      </div>
    );
  }

  const title = localize(promise, 'title', locale);
  const description = localize(promise, 'description', locale);
  const stalledReason = localize(promise, 'stalled_reason', locale);
  const categoryKey = `category.${promise.category}`;

  return (
    <div className="container">
      <div className="promise-detail" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-12)' }}>
        {/* Back link */}
        <Link href="/promises" className="promise-detail__back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M11 4L7 8L11 12" />
          </svg>
          {t('promise.back')}
        </Link>

        {/* Header */}
        <div className="promise-detail__header">
          <div className="promise-detail__meta">
            <span className="category-badge">{t(categoryKey)}</span>
            <StatusBadge status={promise.status_label} />
            {promise.is_checkbox_ticked && (
              <span className="status-badge status-badge--completed" style={{ gap: 'var(--space-1)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 6L5 8.5L9.5 3.5" />
                </svg>
                Fulfilled
              </span>
            )}
          </div>
          <h1 className="promise-detail__title">{title}</h1>
          {description && (
            <p className="promise-detail__description">{description}</p>
          )}
        </div>

        {/* Stalled Banner */}
        {promise.is_stalled && stalledReason && (
          <div className="stalled-banner" role="alert">
            <span className="stalled-banner__icon" aria-hidden="true">&#9888;</span>
            <div className="stalled-banner__content">
              <div className="stalled-banner__title">{t('promise.stalled.reason')}</div>
              <p className="stalled-banner__reason">{stalledReason}</p>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="promise-detail__section" style={{ marginTop: 'var(--space-8)' }}>
          <ProgressBar percent={promise.progress_pct || 0} status={promise.status_label} />
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
            {promise.completed_count || 0} / {promise.required_count || 0} required milestones completed
          </p>
        </div>

        {/* Promise-level Evidence */}
        {promise.promise_evidence_url && (
          <div className="promise-detail__section">
            <h2 className="promise-detail__section-title">{t('promise.evidence')}</h2>
            <EvidenceLink
              sourceType={promise.promise_source_type}
              sourceLabel={promise.promise_source_label}
              evidenceUrl={promise.promise_evidence_url}
            />
          </div>
        )}

        {/* Milestones */}
        <div className="promise-detail__section">
          <h2 className="promise-detail__section-title">{t('promise.milestones')}</h2>
          <MilestoneTimeline milestones={milestones} />
        </div>

        {/* Feedback */}
        <div className="promise-detail__section">
          <h2 className="promise-detail__section-title">{t('promise.feedback')}</h2>
          <FeedbackForm promiseId={promise.id} />
        </div>
      </div>
    </div>
  );
}
