'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n, localize } from '@/lib/i18n';
import { getPromiseStatuses, getElectionInfo } from '@/lib/queries';
import StatsOverview from '@/components/StatsOverview';
import PromiseCard from '@/components/PromiseCard';
import CandidateSearch from '@/components/CandidateSearch';
import heroBg from '../hero section.jpeg';

export default function HomePage() {
  const { locale, t } = useI18n();
  const [promises, setPromises] = useState([]);
  const [electionInfo, setElectionInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [promiseData, electionData] = await Promise.all([
          getPromiseStatuses(),
          getElectionInfo(),
        ]);
        setPromises(promiseData);
        setElectionInfo(electionData);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="hero" style={{ paddingBottom: 'var(--space-8)' }}>
          <div className="skeleton skeleton--title" style={{ margin: '0 auto', width: '40%' }} />
          <div className="skeleton skeleton--text" style={{ margin: '0 auto', width: '60%' }} />
          <div className="skeleton skeleton--text" style={{ margin: '0 auto', width: '50%' }} />
        </div>
        <div className="promise-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton skeleton--card" />
          ))}
        </div>
      </div>
    );
  }

  const winner = electionInfo?.election_results?.find((r) => r.is_winner);
  const candidate = winner?.candidates;
  const constituency = electionInfo?.constituencies;

  return (
    <div className="container">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${heroBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          {t('site.tagline')}
        </div>
        <h1 className="hero__title">{t('home.hero.title')}</h1>
        <p className="hero__subtitle">{t('home.hero.subtitle')}</p>
        <Link href="/promises" className="hero__cta">
          {t('home.hero.cta')}
          <svg className="hero__cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 8H13M9 4L13 8L9 12" />
          </svg>
        </Link>
      </section>

      {/* Candidate Search Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <CandidateSearch />
      </section>

      {/* Context Bar */}
      {(constituency || candidate) && (
        <div className="context-bar">
          {constituency && (
            <div className="context-bar__item">
              <span className="context-bar__label">{t('home.constituency')}</span>
              <span className="context-bar__value">{localize(constituency, 'name', locale)}</span>
            </div>
          )}
          {electionInfo && (
            <div className="context-bar__item">
              <span className="context-bar__label">{t('home.election')}</span>
              <span className="context-bar__value">{electionInfo.election_year} BS - {electionInfo.election_type}</span>
            </div>
          )}
          {candidate && (
            <div className="context-bar__item">
              <span className="context-bar__label">{t('home.representative')}</span>
              <span className="context-bar__value">
                {localize(candidate, 'full_name', locale)}
                {candidate.party_name && ` (${localize(candidate, 'party_name', locale)})`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <StatsOverview promises={promises} />

      {/* Featured Promises */}
      <section className="section">
        <div className="section__header">
          <h2 className="section__title">{t('home.featured.title')}</h2>
        </div>
        <div className="promise-grid">
          {promises.slice(0, 4).map((promise) => (
            <PromiseCard key={promise.id} promise={promise} />
          ))}
        </div>
        {promises.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link href="/promises" className="hero__cta" style={{ fontSize: 'var(--text-sm)' }}>
              {t('home.hero.cta')}
              <svg className="hero__cta-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M2 7H12M8 3L12 7L8 11" />
              </svg>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
