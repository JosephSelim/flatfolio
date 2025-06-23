'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export default function Home() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    axios.get('/apartments')
      .then(res => setApartments(res.data))
      .catch(err => console.error('Failed to fetch apartments:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Apartments</h1>
      <ul className="space-y-2">
        {apartments.map((apt: any) => (
          <li key={apt.id} className="p-4 border rounded">
            <p><strong>{apt.unit_name}</strong> – {apt.project_name}</p>
            <p>Price: {apt.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
