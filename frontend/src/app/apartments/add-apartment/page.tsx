'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { Apartment } from '@/types/apartment';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddApartmentModal({ onClose, onSuccess }: Props) {
  const router = useRouter();
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

  const requiredFields: (keyof Apartment)[] = [
    'unit_name',
    'unit_number',
    'price',
    'bedrooms',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'price' ||
        name === 'area' ||
        name === 'bedrooms' ||
        name === 'bathrooms'
          ? Number(value)
          : value,
    }));
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
      router.push('/'); // back to Home on success
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
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
      {/* Go-back button */}
      <button
        onClick={() => router.back()}
        className='mb-4 flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800'
      >
        <ArrowLeft className='w-4 h-4' /> Go back
      </button>
      <h1 className='text-2xl font-semibold mb-4'>Add New Apartment</h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-lg shadow-lg p-6 w-full max-w-xl space-y-4'
      >
        {error && <p className='text-red-600 text-sm'>{error}</p>}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {Object.keys(form).map((formProp: string) => {
            const fieldName = formProp.replace(/_/g, ' ');
            return (
              <div>
                <h3 className='text-xl font-bold'>{fieldName}</h3>
                <input
                  key={formProp}
                  name={formProp}
                  value={form[formProp as keyof Apartment] ?? ''}
                  onChange={handleChange}
                  required
                  placeholder={fieldName}
                  className='input'
                />
              </div>
            );
          })}
        </div>

        <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700'
          >
            {loading ? 'Saving...' : 'Add Apartment'}
          </button>
        </div>
      </form>
    </div>
  );
}
