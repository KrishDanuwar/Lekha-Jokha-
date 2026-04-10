'use client';

import { useState, useMemo } from 'react';
import electionData from '../election_2082_all_165_mps_with_province.json';

const records = electionData.results || [];

export default function CandidateSearch() {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');

  // Derived option lists (memoized)
  const provinces = useMemo(() => {
    return [...new Set(records.map(r => r.province))].filter(Boolean).sort();
  }, []);

  const districts = useMemo(() => {
    if (!selectedProvince) return [];
    return [...new Set(records.filter(r => r.province === selectedProvince).map(r => r.district))].filter(Boolean).sort();
  }, [selectedProvince]);

  const constituencies = useMemo(() => {
    if (!selectedDistrict) return [];
    return [...new Set(records.filter(r => r.district === selectedDistrict).map(r => r.constituency))].filter(Boolean).sort();
  }, [selectedDistrict]);

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

  const handleConstituencyChange = (e) => {
    setSelectedConstituency(e.target.value);
  };

  // Run filtering logic based on selections
  const filteredResults = useMemo(() => {
    if (!selectedProvince && !selectedDistrict && !selectedConstituency) {
      return null;
    }

    return records.filter(r => {
      // AND logic: if a filter exists and doesn't match, drop the record
      if (selectedProvince && r.province !== selectedProvince) return false;
      if (selectedDistrict && r.district !== selectedDistrict) return false;
      if (selectedConstituency && r.constituency !== selectedConstituency) return false;
      
      return true;
    });
  }, [selectedProvince, selectedDistrict, selectedConstituency]);

  return (
    <div>
      <div className="candidate-search-bar">
        <form className="candidate-search-form" onSubmit={(e) => e.preventDefault()}>
          <select
            id="search-province"
            value={selectedProvince}
            onChange={handleProvinceChange}
            className="candidate-search-select"
            aria-label="Province"
          >
            <option value="">Province</option>
            {provinces.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            id="search-district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedProvince}
            className="candidate-search-select"
            aria-label="District"
          >
            <option value="">District</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            id="search-constituency"
            value={selectedConstituency}
            onChange={handleConstituencyChange}
            disabled={!selectedDistrict}
            className="candidate-search-select"
            aria-label="Constituency"
          >
            <option value="">Constituency</option>
            {constituencies.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
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
            {filteredResults.map((r) => (
              <div key={r.id} className="candidate-card">
                <h3 className="candidate-card__title">{r.candidate?.name || 'Unknown Candidate'}</h3>
                
                <div className="candidate-card__party">
                   {r.candidate?.party || 'Unknown Party'}
                </div>
                
                <div className="candidate-card__stats">
                  <div className="candidate-card__stat-group">
                    <span className="candidate-card__stat-label">Location</span>
                    <span className="candidate-card__stat-val" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-normal)', color: 'var(--color-text-secondary)'}}>
                       {r.province} &bull; {r.district} &bull; {r.constituency}
                    </span>
                  </div>
                  <div className="candidate-card__stat-group" style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <span className="candidate-card__stat-label">Votes</span>
                    <span className="candidate-card__stat-val">
                      {r.candidate?.votes_received?.toLocaleString() || '0'}
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
