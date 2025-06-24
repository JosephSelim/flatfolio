'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Apartment } from '@/types/apartment';
import ApartmentsList from '@/components/ApartmentsList';
import FilterForm from '@/components/Filters/FilterForm';
import AddApartmentModal from '@/components/AddApartmentModal';
import { Plus } from 'lucide-react';

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};

      if (search.trim()) {
        params.search = search.trim();
      }

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
    <div className="p-6 max-w-6xl mx-auto relative">
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

      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
        aria-label="Add Apartment"
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* Add Apartment Modal */}
      {showModal && (
        <AddApartmentModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchApartments();
          }}
        />
      )}
    </div>
  );
}
