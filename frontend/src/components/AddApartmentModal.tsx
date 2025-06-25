'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { Apartment } from '@/types/apartment';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddApartmentModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState<Partial<Apartment>>({
    unit_name: '',
    unit_number: '',
    project_name: '',
    area: undefined,
    price: 0,
    bedrooms: 1,
    bathrooms: undefined,
    comm_number: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requiredFields: (keyof Apartment)[] = ['unit_name', 'unit_number', 'price', 'bedrooms'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' || name === 'area' || name === 'bedrooms' || name === 'bathrooms' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    for (const field of requiredFields) {
      if (!form[field]) {
        setError(`Field "${field}" is required.`);
        return;
      }
    }

    try {
      setLoading(true);
      await axios.post('/apartments', form);
      onSuccess();
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('Apartment already exists.');
      } else {
        setError('Failed to add apartment.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl space-y-4"
      >
        <h2 className="text-xl font-bold">Add New Apartment</h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="unit_name" value={form.unit_name || ''} onChange={handleChange} required placeholder="Unit Name *" className="input" />
          <input name="unit_number" value={form.unit_number || ''} onChange={handleChange} required placeholder="Unit Number *" className="input" />
          <input name="project_name" value={form.project_name || ''} onChange={handleChange} placeholder="Project Name" className="input" />
          <input name="area" type="number" value={form.area || ''} onChange={handleChange} placeholder="Area (m²)" className="input" />
          <input name="price" type="number" value={form.price || ''} onChange={handleChange} required placeholder="Price *" className="input" />
          <input name="bedrooms" type="number" value={form.bedrooms || ''} onChange={handleChange} required placeholder="Bedrooms *" className="input" />
          <input name="bathrooms" type="number" value={form.bathrooms || ''} onChange={handleChange} placeholder="Bathrooms" className="input" />
          <input name="comm_number" value={form.comm_number || ''} onChange={handleChange} placeholder="Comm Number" className="input" />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? 'Saving...' : 'Add Apartment'}
          </button>
        </div>
      </form>
    </div>
  );
}
