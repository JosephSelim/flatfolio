'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Apartment } from '@/types/apartment';
import ApartmentsList from './components/ApartmentsList';
import FilterForm from './components/FilterForm';

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};

      // Include search if non-empty
      if (search.trim()) {
        params.search = search.trim();
      }

      // Include filters if present
      Object.entries(filters).forEach(([key, value]) => {
        if (value.trim()) {
          params[key] = value.trim();
        }
      });

      const res = await axios.get('/apartments', { params });
      setApartments(res.data);
    } catch (error) {
      console.error('Failed to fetch apartments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [search, filters]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Apartment Listings</h1>
      <FilterForm
        onSearch={setSearch}
        onFilterChange={setFilters}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ApartmentsList apartments={apartments} />
      )}
    </div>
  );
}
