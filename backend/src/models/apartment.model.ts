export interface Apartment {
  id?: number;
  unit_name: string;
  unit_number: string;
  project_name?: string;
  area?: number;
  price: number;
  bedrooms: number;
  bathrooms?: number;
  comm_number: string;
  created_at?: string;
}
