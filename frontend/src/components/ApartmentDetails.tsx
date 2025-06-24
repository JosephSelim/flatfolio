'use client';

import { Apartment } from '@/types/apartment';

interface Props {
  apartment: Apartment;
}

export default function ApartmentDetails({ apartment }: Props) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Apartment Details</h1>
      <ul className="space-y-2">
        <li><strong>ID:</strong> {apartment.id}</li>
        <li><strong>Unit Name:</strong> {apartment.unit_name}</li>
        <li><strong>Unit Number:</strong> {apartment.unit_number}</li>
        <li><strong>Project Name:</strong> {apartment.project_name || '—'}</li>
        <li><strong>Area:</strong> {apartment.area ? `${apartment.area} m²` : '—'}</li>
        <li><strong>Price:</strong> {apartment.price}</li>
        <li><strong>Bedrooms:</strong> {apartment.bedrooms}</li>
        <li><strong>Bathrooms:</strong> {apartment.bathrooms ?? '—'}</li>
        <li><strong>Comm Number:</strong> {apartment.comm_number || '—'}</li>
        <li><strong>Created At:</strong> {apartment.created_at ? new Date(apartment.created_at).toLocaleString() : '—'}</li>
      </ul>
    </div>
  );
}
