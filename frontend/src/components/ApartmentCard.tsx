'use client';

import { useRouter } from 'next/navigation';
import { Apartment } from '@/types/apartment';
import { Home, BedDouble, Landmark } from 'lucide-react';

interface Props {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/apartments/${apartment.id}`)}
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/60 p-5 text-left shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <h2 className="truncate text-lg font-semibold tracking-wide text-slate-800 group-hover:text-blue-600">
          {apartment.unit_name}
        </h2>
        <span className="text-sm text-slate-400">#{apartment.unit_number}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Landmark className="h-4 w-4 text-blue-400" />
        <span className="truncate">{apartment.project_name || '—'}</span>
      </div>

      <div className="mt-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 font-medium text-slate-700">
          <Home className="h-4 w-4 text-blue-500" />
          {apartment.price.toLocaleString()} EGP
        </div>
        <div className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
          <BedDouble className="h-3.5 w-3.5" />
          {apartment.bedrooms} BR
        </div>
      </div>
    </button>
  );
}
