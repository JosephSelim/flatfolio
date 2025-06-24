'use client';

import { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import SearchBar from './SearchBar';
import FilterInputs from './FilterInputs';
import FilterActions from './FilterActions';

interface FilterFormProps {
  onSearch: (search: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;
}

export default function FilterForm({ onSearch, onFilterChange }: FilterFormProps) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    unit_name: '',
    unit_number: '',
    project_name: '',
    price_min: '',
    price_max: '',
  });

  const [collapsed, setCollapsed] = useState(true);

  // Debounced search to make it live
  const debouncedSearch = useMemo(
    () => debounce((term: string) => onSearch(term), 500),
    [onSearch]
  );

  const handleSearch = (term: string) => {
    setSearch(term);
    debouncedSearch(term);
  };

  const handleFilterInput = (updated: typeof filters) => {
    setFilters(updated); // only update locally
  };

  const applyFilters = () => {
    onFilterChange(filters); // emit filters only on apply
  };

  const clearFilters = () => {
    const cleared = {
      unit_name: '',
      unit_number: '',
      project_name: '',
      price_min: '',
      price_max: '',
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const clearSearch = () => {
    setSearch('');
    onSearch('');
  };

  return (
    <div className="space-y-4 mb-6">
      <SearchBar search={search} onSearch={handleSearch} onClear={clearSearch} />

      <button
        type="button"
        className="text-blue-600 underline text-sm"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? 'Show Filters' : 'Hide Filters'}
      </button>

      {!collapsed && (
        <>
          <FilterInputs filters={filters} onChange={handleFilterInput} />
          <FilterActions onClearFilters={clearFilters} onApplyFilters={applyFilters} />
        </>
      )}
    </div>
  );
}
