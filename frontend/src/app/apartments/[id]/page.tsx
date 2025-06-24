'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/lib/axios';
import { Apartment } from '@/types/apartment';
import ApartmentDetails from '@/components/ApartmentDetails';

export default function ApartmentDetailsPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const res = await axios.get(`/apartments/${id}`);
        setApartment(res.data);
      } catch (err) {
        console.error('Failed to fetch apartment details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchApartment();
  }, [id]);

  if (loading) return <p className="p-6">Loading apartment details...</p>;
  if (!apartment) return <p className="p-6">Apartment not found.</p>;

  return <ApartmentDetails apartment={apartment} />;
}
