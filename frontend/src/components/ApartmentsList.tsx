'use client';

import { Apartment } from '@/types/apartment';
import ApartmentCard from './ApartmentCard';

interface Props {
  apartments: Apartment[];
}

export default function ApartmentsList({ apartments }: Props) {
  if (apartments.length === 0) {
    return <p className="text-center text-gray-500 italic">No apartments found.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {apartments.map((apt) => (
        <ApartmentCard key={apt.id} apartment={apt} />
      ))}
    </div>
  );
}
