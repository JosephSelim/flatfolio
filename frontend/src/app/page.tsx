'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Apartment } from '@/types/apartment';

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

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Apartment Listings</h1>
      {apartments.length === 0 ? (
        <p>No apartments found.</p>
      ) : (
        <ul className="grid gap-4">
          {apartments.map((apt) => (
            <li key={apt.id} className="p-4 rounded-lg shadow border">
              <div className="text-lg font-semibold">
                {apt.unit_name} ({apt.unit_number})
              </div>
              <div className="text-gray-600">{apt.project_name}</div>
              <div className="text-sm text-gray-500">
                {apt.price.toLocaleString()} EGP – {apt.bedrooms} bedrooms
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
