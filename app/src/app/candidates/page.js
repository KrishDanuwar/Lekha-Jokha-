import CandidateSearch from '@/components/CandidateSearch';

export const metadata = {
  title: 'Candidates | Lekha Jokha Search',
  description: 'Search for election candidates and winners across all districts and constituencies in Nepal.',
};

export default function CandidatesPage() {
  return (
    <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
      <div className="page-header">
        <h1 className="page-header__title">Search Candidates</h1>
        <p className="page-header__subtitle">Find representatives by name, province, district, or constituency.</p>
      </div>
      <CandidateSearch />
    </div>
  );
}
