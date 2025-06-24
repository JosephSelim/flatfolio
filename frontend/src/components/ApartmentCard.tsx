'use client';

import { useRouter } from 'next/navigation';
import { Apartment } from '@/types/apartment';
import { Home, BedDouble, Landmark } from 'lucide-react';

interface Props {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/apartments/${apartment.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-5 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200 group space-y-3"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
          {apartment.unit_name}
        </h2>
        <span className="text-sm text-gray-400">#{apartment.unit_number}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Landmark className="w-4 h-4 text-blue-400" />
        {apartment.project_name || '—'}
      </div>

      <div className="flex justify-between items-center text-sm pt-2">
        <div className="flex items-center gap-1 text-gray-600 font-medium">
          <Home className="w-4 h-4 text-blue-500" />
          {apartment.price.toLocaleString()} EGP
        </div>
        <div className="flex items-center gap-1 text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full text-xs font-semibold">
          <BedDouble className="w-3.5 h-3.5" />
          {apartment.bedrooms} BR
        </div>
      </div>
    </div>
  );
}
