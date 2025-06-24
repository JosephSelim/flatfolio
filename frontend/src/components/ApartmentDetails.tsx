'use client';

import { useRouter } from 'next/navigation';
import { Apartment } from '@/types/apartment';
import { ArrowLeft, BedDouble, Ruler, Landmark } from 'lucide-react';

interface Props {
  apartment: Apartment;
}

export default function ApartmentDetails({ apartment }: Props) {
  const router = useRouter();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to listings
      </button>

      {/* Header Card */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {apartment.unit_name}{' '}
            <span className="text-base text-gray-500 font-medium">
              ({apartment.unit_number})
            </span>
          </h1>
          <p className="text-gray-600">{apartment.project_name || '—'}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
            {apartment.price.toLocaleString()} EGP
          </span>
          <span className="px-2 py-0.5 bg-gray-100 rounded font-medium flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            {apartment.bedrooms} BR
          </span>
        </div>
      </div>

      {/* Detailed Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        <Detail label="Area" value={apartment.area ? `${apartment.area} m²` : '—'} icon={<Ruler className="w-4 h-4" />} />
        <Detail label="Bathrooms" value={apartment.bathrooms ?? '—'} />
        <Detail label="Comm Number" value={apartment.comm_number || '—'} />
        <Detail label="Project Name" value={apartment.project_name || '—'} icon={<Landmark className="w-4 h-4" />} />
        <Detail
          label="Created At"
          value={apartment.created_at ? new Date(apartment.created_at).toLocaleString() : '—'}
        />
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm text-gray-500 flex items-center gap-1">
        {icon}
        {label}
      </h2>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}
