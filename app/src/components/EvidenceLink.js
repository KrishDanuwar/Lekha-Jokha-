'use client';

export default function EvidenceLink({ sourceType, sourceLabel, evidenceUrl }) {
  if (!evidenceUrl) return null;

  const iconMap = {
    'official_document': '\u{1F4C4}',
    'news_article': '\u{1F4F0}',
    'government_gazette': '\u{1F3DB}',
    'press_release': '\u{1F4E2}',
    'social_media': '\u{1F310}',
    'other': '\u{1F517}',
  };

  const icon = iconMap[sourceType] || iconMap['other'];

  return (
    <a
      href={evidenceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="evidence-link"
      aria-label={`Evidence: ${sourceLabel || 'View source'}`}
    >
      <span className="evidence-link__icon" aria-hidden="true">{icon}</span>
      <span>{sourceLabel || 'View Source'}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
      </svg>
    </a>
  );
}
