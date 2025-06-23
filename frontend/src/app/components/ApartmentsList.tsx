import { Apartment } from '@/types/apartment';
import ApartmentCard from './ApartmentCard';

interface Props {
  apartments: Apartment[];
}

export default function ApartmentsList({ apartments }: Props) {
  if (apartments.length === 0) {
    return <p>No apartments found.</p>;
  }

  return (
    <ul className="grid gap-4">
      {apartments.map((apt) => (
        <ApartmentCard key={apt.id} apartment={apt} />
      ))}
    </ul>
  );
}
