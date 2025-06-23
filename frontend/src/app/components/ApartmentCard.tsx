import { Apartment } from '@/types/apartment';

interface Props {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: Props) {
  return (
    <li className="p-4 rounded-lg shadow border">
      <div className="text-lg font-semibold">
        {apartment.unit_name} ({apartment.unit_number})
      </div>
      <div className="text-gray-600">{apartment.project_name}</div>
      <div className="text-sm text-gray-500">
        {apartment.price.toLocaleString()} EGP – {apartment.bedrooms} bedrooms
      </div>
    </li>
  );
}
