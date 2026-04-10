'use client';

import { useState, useMemo } from 'react';
import electionData from '../election_2082_all_165_mps.json';

const records = electionData.results || [];

export default function CandidateSearch() {
  const [searchName, setSearchName] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [appliedFilters, setAppliedFilters] = useState(null);

  // String cleaners to remove JSON artifact noise
  const cleanDistrict = (d) => {
    if (!d) return '';
    return d.split('/')[0];
  };

  const cleanConstituency = (c) => {
    if (!c) return '';
    const match = c.match(/(Constituency\s*\d+)/i);
    return match ? match[1] : c.split('-')[0];
  };

  // Compute specific dropdown options
  const districts = useMemo(() => {
    return [...new Set(records.map(r => r.district))].filter(Boolean).sort();
  }, []);

  const constituencies = useMemo(() => {
    if (!selectedDistrict) return [];
    return [...new Set(records.filter(r => r.district === selectedDistrict).map(r => r.constituency))].filter(Boolean).sort();
  }, [selectedDistrict]);

  // Handlers for cascading selects
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedConstituency('');
  };


  const handleSearch = () => {
    setAppliedFilters({
      name: searchName.trim().toLowerCase(),
      district: selectedDistrict,
      constituency: selectedConstituency
    });
  };

  // Run filtering logic based on applied filters only
  const filteredResults = useMemo(() => {
    if (!appliedFilters) return null;
    
    // If user hit search but all filters are empty, return null (no results to show)
    if (!appliedFilters.name && !appliedFilters.district && !appliedFilters.constituency) {
      return null;
    }

    return records.filter(r => {
      // AND logic: if a filter exists and doesn't match, drop the record
      if (appliedFilters.district && r.district !== appliedFilters.district) return false;
      if (appliedFilters.constituency && r.constituency !== appliedFilters.constituency) return false;
      
      if (appliedFilters.name) {
        const winnerName = r.candidate?.name?.toLowerCase() || '';
        const searchTokens = appliedFilters.name.split(/\s+/).filter(Boolean);
        if (!searchTokens.every(token => winnerName.includes(token))) return false;
      }
      
      return true;
    });
  }, [appliedFilters]);

  // Autocomplete Suggestions logic
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const suggestions = useMemo(() => {
    if (!searchName.trim() || searchName.trim().length < 2) return [];
    const tokens = searchName.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const matches = {};
    records.forEach(r => {
      const name = r.candidate?.name || '';
      if (tokens.every(token => name.toLowerCase().includes(token))) {
        matches[name] = true; // Use object to ensure unique names
      }
    });
    return Object.keys(matches).slice(0, 7); // Show max 7 suggestions
  }, [searchName]);

  const isSearchDisabled = !searchName.trim() && !selectedDistrict && !selectedConstituency;

  return (
    <div>
      <div className="candidate-search-bar" role="search" aria-label="Search Candidates">
        <form 
          className="candidate-search-form" 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
        >
          {/* Input + Icon + Autocomplete wrapper */}
          <div className="candidate-search-input-wrapper">
            <input
              id="search-name"
              type="text"
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search Candidates"
              className="candidate-search-input"
              aria-label="Search Candidates"
              autoComplete="off"
            />
            <button type="submit" className="candidate-search-icon-btn" aria-label="Search by name">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            
            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="candidate-search-suggestions">
                {suggestions.map((suggestion, idx) => (
                  <div 
                    key={idx} 
                    className="candidate-search-suggestion-item"
                    onClick={() => {
                      setSearchName(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selects */}
          <select
            id="search-district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="candidate-search-select"
            aria-label="District"
          >
            <option value="">District</option>
            {districts.map(d => (
              <option key={d} value={d}>{cleanDistrict(d)}</option>
            ))}
          </select>

          <select
            id="search-constituency"
            value={selectedConstituency}
            onChange={(e) => setSelectedConstituency(e.target.value)}
            disabled={!selectedDistrict}
            className="candidate-search-select"
            aria-label="Constituency"
          >
            <option value="">Constituency</option>
            {constituencies.map(c => (
              <option key={c} value={c}>{cleanConstituency(c)}</option>
            ))}
          </select>

          {/* Main Search Button */}
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
              <div key={r.id || i} className="candidate-card">
                <h3 className="candidate-card__title">{r.candidate?.name || 'Unknown Candidate'}</h3>
                
                <div className="candidate-card__party">
                   {r.candidate?.party || 'Unknown Party'}
                </div>
                
                <div className="candidate-card__stats">
                  <div className="candidate-card__stat-group">
                    <span className="candidate-card__stat-label">Location</span>
                    <span className="candidate-card__stat-val" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-normal)', color: 'var(--color-text-secondary)'}}>
                       {cleanDistrict(r.district)} {cleanConstituency(r.constituency)}
                    </span>
                  </div>
                  <div className="candidate-card__stat-group" style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <span className="candidate-card__stat-label">Votes</span>
                    <span className="candidate-card__stat-val">
                      {r.candidate?.votes_received?.toLocaleString() || '0'}
                    </span>
                  </div>
                  {/* Vote margin removed as it's absent from the new data schema */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
