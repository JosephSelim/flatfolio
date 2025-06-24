'use client';

import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

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

  // Debounced search: call onSearch after 300ms delay
  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

  useEffect(() => {
    debouncedSearch(search.trim());
    return () => debouncedSearch.cancel(); // cleanup on unmount
  }, [search, debouncedSearch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleFilterSubmit} className="space-y-4 mb-6">
      {/* Search input - triggers debounced onSearch */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search unit, number, or project"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
      </div>

      {/* Filters - only applied on form submit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          name="unit_name"
          value={filters.unit_name}
          onChange={handleFilterChange}
          placeholder="Filter by Unit Name"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="unit_number"
          value={filters.unit_number}
          onChange={handleFilterChange}
          placeholder="Filter by Unit Number"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="project_name"
          value={filters.project_name}
          onChange={handleFilterChange}
          placeholder="Filter by Project Name"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="price_min"
          value={filters.price_min}
          onChange={handleFilterChange}
          placeholder="Min Price"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="price_max"
          value={filters.price_max}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="p-2 border rounded"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Apply Filters
      </button>
    </form>
  );
}
