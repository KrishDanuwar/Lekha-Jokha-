'use client';

import { useI18n, localize } from '@/lib/i18n';
import EvidenceLink from './EvidenceLink';

export default function MilestoneTimeline({ milestones }) {
  const { locale, t } = useI18n();

  if (!milestones || milestones.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">&#9776;</div>
        <p className="empty-state__text">{t('promise.milestones.empty')}</p>
      </div>
    );
  }

  return (
    <div className="milestone-timeline" role="list" aria-label={t('promise.milestones')}>
      {milestones.map((ms) => {
        const title = localize(ms, 'title', locale);
        const description = localize(ms, 'description', locale);

        return (
          <div
            key={ms.id}
            className={`milestone ${ms.is_completed ? 'milestone--completed' : ''}`}
            role="listitem"
          >
            <div className="milestone__indicator">
              <div className="milestone__dot" aria-hidden="true">
                {ms.is_completed && (
                  <svg className="milestone__check" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6L5 8.5L9.5 3.5" />
                  </svg>
                )}
              </div>
              <div className="milestone__line" aria-hidden="true" />
            </div>

            <div className="milestone__content">
              <h4 className="milestone__title">{title}</h4>
              {description && (
                <p className="milestone__description">{description}</p>
              )}
              {ms.is_completed && ms.completed_date && (
                <span className="milestone__date">
                  Completed: {new Date(ms.completed_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              )}
              {ms.evidence_url && (
                <div className="milestone__evidence">
                  <EvidenceLink
                    sourceType={ms.source_type}
                    sourceLabel={ms.source_label}
                    evidenceUrl={ms.evidence_url}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
