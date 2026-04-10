'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  en: {
    // Site
    'site.name': 'Lekha Jokha',
    'site.tagline': 'Tracking Promises, Ensuring Accountability',
    'site.description': 'A citizen-powered platform tracking elected representatives\' manifesto promises through milestone-based progress in Morang Constituency 4.',

    // Navigation
    'nav.home': 'Home',
    'nav.promises': 'Promises',
    'nav.about': 'About',

    // Homepage
    'home.hero.title': 'Holding Power to Account',
    'home.hero.subtitle': 'Track the manifesto promises made to you. See what is done, what is pending, and what has stalled.',
    'home.hero.cta': 'View All Promises',
    'home.stats.title': 'Promise Tracker Overview',
    'home.stats.total': 'Total Promises',
    'home.stats.completed': 'Completed',
    'home.stats.inProgress': 'In Progress',
    'home.stats.notStarted': 'Not Started',
    'home.stats.stalled': 'Stalled',
    'home.featured.title': 'Latest Promise Updates',
    'home.constituency': 'Constituency',
    'home.election': 'Election',
    'home.representative': 'Representative',

    // Promises
    'promises.title': 'All Promises',
    'promises.subtitle': 'Browse all manifesto commitments and their progress.',
    'promises.filter.all': 'All',
    'promises.filter.category': 'Category',
    'promises.filter.status': 'Status',
    'promises.empty': 'No promises found matching your filters.',

    // Promise Detail
    'promise.milestones': 'Milestones',
    'promise.milestones.empty': 'No milestones have been defined yet.',
    'promise.evidence': 'Evidence',
    'promise.feedback': 'Citizen Feedback',
    'promise.feedback.title': 'Submit Your Feedback',
    'promise.feedback.description': 'Your feedback is anonymous. Select the type that best describes your observation.',
    'promise.feedback.select': 'Select feedback type',
    'promise.feedback.submit': 'Submit Feedback',
    'promise.feedback.success': 'Thank you! Your feedback has been recorded.',
    'promise.feedback.error': 'Something went wrong. Please try again.',
    'promise.stalled.reason': 'Reason for stalling',
    'promise.back': 'Back to Promises',

    // Status Labels
    'status.completed': 'Completed',
    'status.inProgress': 'In Progress',
    'status.notStarted': 'Not Started',
    'status.stalled': 'Stalled',

    // Categories
    'category.infrastructure': 'Infrastructure',
    'category.education': 'Education',
    'category.health': 'Health',
    'category.agriculture': 'Agriculture',
    'category.employment': 'Employment',
    'category.governance': 'Governance',
    'category.environment': 'Environment',
    'category.social_welfare': 'Social Welfare',
    'category.economy': 'Economy',
    'category.other': 'Other',

    // About
    'about.title': 'About Lekha Jokha',
    'about.what.title': 'What is this?',
    'about.what.description': 'Lekha Jokha is a public accountability platform that tracks the manifesto promises made by elected representatives. It provides transparent, milestone-based progress tracking so citizens can see exactly what has been accomplished.',
    'about.how.title': 'How does progress work?',
    'about.how.description': 'Every promise is broken into verifiable milestones. Progress is calculated automatically based on how many required milestones have been completed. A promise is marked complete only when ALL required milestones are done. No one can manually mark a promise as complete.',
    'about.stalled.title': 'What does "Stalled" mean?',
    'about.stalled.description': 'A promise can be marked as "Stalled" by the system administrator when work has stopped due to external blockers. The specific reason is always shown publicly. Stalled status is never set automatically based on time.',
    'about.feedback.title': 'How does feedback work?',
    'about.feedback.description': 'Citizens can submit structured, anonymous feedback on any promise. Feedback is categorized by type (not free text) to maintain data quality. When 3 or more citizens submit the same type of feedback, it is automatically elevated for visibility.',
    'about.scope.title': 'Scope',
    'about.scope.description': 'This pilot covers Morang Constituency 4 (Koshi Province) for the 2082 BS election cycle.',

    // Footer
    'footer.disclaimer': 'This is a public transparency tool. Data is sourced from official documents, news reports, and government records.',
    'footer.powered': 'Powered by open data principles.',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred.',
    'common.progress': 'Progress',
    'common.viewDetails': 'View Details',
  },

  np: {
    // Site
    'site.name': 'Lekha Jokha',
    'site.tagline': 'Pratibaddhata ko Lekha Jokha',
    'site.description': 'Morang Nirvachan Kshetra 4 ma nirwachit pratinidhiko ghoshanapatra pratibaddhata ko pragati track garne nagarik manch.',

    // Navigation
    'nav.home': 'Griha',
    'nav.promises': 'Pratibaddhata',
    'nav.about': 'Baare ma',

    // Homepage
    'home.hero.title': 'Shakti ko Jawaphdehii',
    'home.hero.subtitle': 'Tapaaiko lagi gariyeka ghoshanapatra pratibaddhata haru track garnuhos. Ke bhayo, ke baanki chha, ke rokiyeko chha hernuhos.',
    'home.hero.cta': 'Sabai Pratibaddhata Hernuhos',
    'home.stats.title': 'Pratibaddhata Tracker Saransha',
    'home.stats.total': 'Jamma Pratibaddhata',
    'home.stats.completed': 'Sampanna',
    'home.stats.inProgress': 'Jaari',
    'home.stats.notStarted': 'Shuru Bhaeko Chhaina',
    'home.stats.stalled': 'Rokiyeko',
    'home.featured.title': 'Najik ko Pratibaddhata Update',
    'home.constituency': 'Nirvachan Kshetra',
    'home.election': 'Nirvachan',
    'home.representative': 'Pratinidhi',

    // Promises
    'promises.title': 'Sabai Pratibaddhata',
    'promises.subtitle': 'Sabai ghoshanapatra pratibaddhata ra unko pragati hernuhos.',
    'promises.filter.all': 'Sabai',
    'promises.filter.category': 'Shreni',
    'promises.filter.status': 'Sthiti',
    'promises.empty': 'Tapaaiko filter anusar koi pani pratibaddhata bhetiena.',

    // Promise Detail
    'promise.milestones': 'Padachinhaharu',
    'promise.milestones.empty': 'Ahile samma koi pani padachinh paribhashit gariyeko chhaina.',
    'promise.evidence': 'Pramaan',
    'promise.feedback': 'Nagarik Pratikiya',
    'promise.feedback.title': 'Aafno Pratikiya Dinuhos',
    'promise.feedback.description': 'Tapaaiko pratikiya gupta chha. Tapaaiko awalokan sanga milne prakar chunuhos.',
    'promise.feedback.select': 'Pratikiya prakar chunuhos',
    'promise.feedback.submit': 'Pratikiya Bunuhos',
    'promise.feedback.success': 'Dhanyabad! Tapaaiko pratikiya record gariyeko chha.',
    'promise.feedback.error': 'Kehi galat bhayo. Kripaya feri prayaas garnuhos.',
    'promise.stalled.reason': 'Rokinu ko kaaran',
    'promise.back': 'Pratibaddhata ma Farkanus',

    // Status Labels
    'status.completed': 'Sampanna',
    'status.inProgress': 'Jaari',
    'status.notStarted': 'Shuru Bhaeko Chhaina',
    'status.stalled': 'Rokiyeko',

    // Categories
    'category.infrastructure': 'Purvaadhar',
    'category.education': 'Shiksha',
    'category.health': 'Swasthya',
    'category.agriculture': 'Krishi',
    'category.employment': 'Rojgaar',
    'category.governance': 'Sushaasan',
    'category.environment': 'Wataawaran',
    'category.social_welfare': 'Samajik Kalyan',
    'category.economy': 'Arthbyawastha',
    'category.other': 'Anya',

    // About
    'about.title': 'Lekha Jokha Baare Ma',
    'about.what.title': 'Yo ke ho?',
    'about.what.description': 'Lekha Jokha ek sarbajanik jawaphdehii manch ho jasle nirwachit pratinidhiko ghoshanapatra pratibaddhata track garchha. Yesle padachinh-aadhaarit pragati tracking pradaan garchha jassari nagarikle ke sampanna bhayo tyo thik-thik dekhi sakchhan.',
    'about.how.title': 'Pragati kasari kaam garchha?',
    'about.how.description': 'Prati pratibaddhata pramaanit padachinhaharu ma bhaag gariyeko chha. Pragati kati wota aawashyak padachinha sampanna bhaye anusaar swachaalit rup ma ganana gariyeko chha. Pratibaddhata SABAI aawashyak padachinha sampanna bhayepachhi maatra sampanna chithnit gariyeko chha.',
    'about.stalled.title': '"Rokiyeko" ko artha ke ho?',
    'about.stalled.description': 'Baahari baadhaaka kaaran kaam rokiyeko bela prashaasakle pratibaddhata laai "Rokiyeko" chithnit garna sakchha. Khass kaaran saadhaa sarbajanik rup ma dekhaaiyeko hunchha.',
    'about.feedback.title': 'Pratikiya kasari kaam garchha?',
    'about.feedback.description': 'Nagarikle kunai pani pratibaddhata ma sanrachit, gupta pratikiya bujhaauna sakchhan. 3 wa savainda badhii nagarikle ekai prakar ko pratikiya bujhaauda, yo swachaalit rup ma drishtikaran ko lagi badhaayiyeko chha.',
    'about.scope.title': 'Daayara',
    'about.scope.description': 'Yo pilot le Morang Nirvachan Kshetra 4 (Koshi Pradesh) laai 2082 BS nirvachan chakra ko lagi samatdachha.',

    // Footer
    'footer.disclaimer': 'Yo ek sarbajanik paardaarshitaa saadhan ho. Data aadtikaarik dastawej, samachar report, ra sarkaari abhilekh baata liyeko ho.',
    'footer.powered': 'Khula data siddhantaharu dwaaraa sanchaalit.',

    // Common
    'common.loading': 'Lod bhairachha...',
    'common.error': 'Ek galti bhayo.',
    'common.progress': 'Pragati',
    'common.viewDetails': 'Bistarit Hernuhos',
  },
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('en');

  const t = useCallback(
    (key) => {
      return translations[locale]?.[key] || translations['en']?.[key] || key;
    },
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'en' ? 'np' : 'en'));
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

/**
 * Helper: get localized field from a database record.
 * Falls back to the English field if Nepali is empty.
 */
export function localize(record, field, locale) {
  if (locale === 'np') {
    const npField = field + '_np';
    return record?.[npField] || record?.[field] || '';
  }
  return record?.[field] || '';
}
