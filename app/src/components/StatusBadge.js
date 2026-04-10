'use client';

import { useI18n } from '@/lib/i18n';

export default function StatusBadge({ status }) {
  const { t } = useI18n();

  const statusMap = {
    'Completed': { cls: 'completed', key: 'status.completed' },
    'In Progress': { cls: 'in-progress', key: 'status.inProgress' },
    'Not Started': { cls: 'not-started', key: 'status.notStarted' },
    'Stalled': { cls: 'stalled', key: 'status.stalled' },
  };

  const info = statusMap[status] || statusMap['Not Started'];

  return (
    <span className={`status-badge status-badge--${info.cls}`} role="status">
      <span className="status-badge__dot" aria-hidden="true" />
      {t(info.key)}
    </span>
  );
}
