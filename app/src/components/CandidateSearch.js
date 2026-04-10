'use client';

import { useState, useMemo } from 'react';
import electionData from '../election_2082_all_165_mps.json';

const records = electionData.results || [];

export default function CandidateSearch() {
  const [searchName, setSearchName] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [appliedFilters, setAppliedFilters] = useState(null);

  // Compute specific dropdown options
  const provinces = useMemo(() => {
    return [...new Set(records.map(r => r.province))].filter(Boolean).sort();
  }, []);

  const districts = useMemo(() => {
    if (!selectedProvince) return [];
    return [...new Set(records.filter(r => r.province === selectedProvince).map(r => r.district))].filter(Boolean).sort();
  }, [selectedProvince]);

  const constituencies = useMemo(() => {
    if (!selectedDistrict) return [];
    return [...new Set(records.filter(r => r.province === selectedProvince && r.district === selectedDistrict).map(r => r.constituency))].filter(Boolean).sort();
  }, [selectedProvince, selectedDistrict]);

  // Handlers for cascading selects
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict('');
    setSelectedConstituency('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedConstituency('');
  };

  const handleSearch = () => {
    setAppliedFilters({
      name: searchName.trim().toLowerCase(),
      province: selectedProvince,
      district: selectedDistrict,
      constituency: selectedConstituency
    });
  };

  // Run filtering logic based on applied filters only
  const filteredResults = useMemo(() => {
    if (!appliedFilters) return null;
    
    // If user hit search but all filters are empty, return null (no results to show)
    if (!appliedFilters.name && !appliedFilters.province && !appliedFilters.district && !appliedFilters.constituency) {
      return null;
    }

    return records.filter(r => {
      // AND logic: if a filter exists and doesn't match, drop the record
      if (appliedFilters.province && r.province !== appliedFilters.province) return false;
      if (appliedFilters.district && r.district !== appliedFilters.district) return false;
      if (appliedFilters.constituency && r.constituency !== appliedFilters.constituency) return false;
      
      if (appliedFilters.name) {
        const winnerName = r.result?.winner?.name || '';
        if (!winnerName.toLowerCase().includes(appliedFilters.name)) return false;
      }
      
      return true;
    });
  }, [appliedFilters]);

  const isSearchDisabled = !searchName.trim() && !selectedProvince && !selectedDistrict && !selectedConstituency;

  return (
    <div>
      <div className="candidate-search-container">
        <form 
          className="candidate-search-controls" 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
        >
          <div className="candidate-search-group">
            <label htmlFor="search-name" className="candidate-search-label">Candidate Name</label>
            <input
              id="search-name"
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search Candidates"
              className="candidate-search-input"
            />
          </div>

          <div className="candidate-search-group">
            <label htmlFor="search-province" className="candidate-search-label">Province</label>
            <select
              id="search-province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="candidate-search-select"
            >
              <option value="">All Provinces</option>
              {provinces.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="candidate-search-group">
            <label htmlFor="search-district" className="candidate-search-label">District</label>
            <select
              id="search-district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
              className="candidate-search-select"
            >
              <option value="">All Districts</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="candidate-search-group">
            <label htmlFor="search-constituency" className="candidate-search-label">Constituency</label>
            <select
              id="search-constituency"
              value={selectedConstituency}
              onChange={(e) => setSelectedConstituency(e.target.value)}
              disabled={!selectedDistrict}
              className="candidate-search-select"
            >
              <option value="">All Constituencies</option>
              {constituencies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="candidate-search-button" 
            disabled={isSearchDisabled}
          >
            Search
          </button>
        </form>
      </div>

      <div className="candidate-search-results">
        {filteredResults === null ? null : filteredResults.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">&#128269;</div>
            <p className="empty-state__text">No results found</p>
          </div>
        ) : (
          <div className="promise-grid">
            {filteredResults.map((r, i) => (
              <div key={i} className="candidate-card">
                <h3 className="candidate-card__title">{r.result?.winner?.name || 'Unknown Candidate'}</h3>
                
                <div className="candidate-card__party">
                   {r.result?.winner?.party || 'Unknown Party'}
                </div>
                
                <div className="candidate-card__stats">
                  <div className="candidate-card__stat-group">
                    <span className="candidate-card__stat-label">Location</span>
                    <span className="candidate-card__stat-val" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-normal)', color: 'var(--color-text-secondary)'}}>
                       {r.province} &bull; {r.district}
                    </span>
                  </div>
                  <div className="candidate-card__stat-group" style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <span className="candidate-card__stat-label">Votes</span>
                    <span className="candidate-card__stat-val">
                      {r.result?.winner?.votes_received?.toLocaleString() || '0'}
                    </span>
                  </div>
                  <div className="candidate-card__stat-group" style={{ textAlign: 'right' }}>
                    <span className="candidate-card__stat-label">Margin</span>
                    <span className="candidate-card__stat-val" style={{ color: 'var(--color-accent)' }}>
                      +{r.result?.vote_margin?.toLocaleString() || '0'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
