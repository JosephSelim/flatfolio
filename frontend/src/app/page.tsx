'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Apartment } from '@/types/apartment';
import ApartmentsList from './components/ApartmentsList';

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const res = await axios.get('/apartments');
        setApartments(res.data);
      } catch (error) {
        console.error('Failed to fetch apartments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApartments();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Apartment Listings</h1>
      {loading ? <p>Loading...</p> : <ApartmentsList apartments={apartments} />}
    </div>
  );
}
