'use client';

import { useState, useEffect } from 'react';
import { useI18n, localize } from '@/lib/i18n';
import { getFeedbackTypes, submitFeedback } from '@/lib/queries';

export default function FeedbackForm({ promiseId }) {
  const { locale, t } = useI18n();
  const [feedbackTypes, setFeedbackTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getFeedbackTypes().then(setFeedbackTypes).catch(console.error);
  }, []);

  const handleSubmit = async () => {
    if (!selectedType || submitting) return;

    setSubmitting(true);
    setMessage(null);

    try {
      await submitFeedback(promiseId, selectedType);
      setMessage({ type: 'success', text: t('promise.feedback.success') });
      setSelectedType(null);
    } catch (err) {
      console.error('Feedback submission error:', err);
      setMessage({ type: 'error', text: t('promise.feedback.error') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-form" id="feedback-form">
      <h3 className="feedback-form__title">{t('promise.feedback.title')}</h3>
      <p className="feedback-form__description">{t('promise.feedback.description')}</p>

      <div className="feedback-form__options" role="radiogroup" aria-label={t('promise.feedback.select')}>
        {feedbackTypes.map((ft) => {
          const label = localize(ft, 'label', locale);
          const isSelected = selectedType === ft.id;

          return (
            <button
              key={ft.id}
              type="button"
              className={`feedback-form__option ${isSelected ? 'feedback-form__option--selected' : ''}`}
              onClick={() => setSelectedType(ft.id)}
              role="radio"
              aria-checked={isSelected}
              id={`feedback-type-${ft.id}`}
            >
              <div className="feedback-form__radio">
                <div className="feedback-form__radio-dot" />
              </div>
              <span className="feedback-form__option-text">{label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="feedback-form__submit"
        onClick={handleSubmit}
        disabled={!selectedType || submitting}
        id="feedback-submit-btn"
      >
        {submitting ? '...' : t('promise.feedback.submit')}
      </button>

      {message && (
        <div className={`feedback-form__message feedback-form__message--${message.type}`} role="alert">
          {message.text}
        </div>
      )}
    </div>
  );
}
