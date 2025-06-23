import { db } from '../db';
import { Apartment } from '../models/apartment.model';

export const addApartment = async (apt: Apartment) => {
  const {
    unit_name,
    unit_number,
    project_name = 'Unassigned Project',
    area,
    price,
    bedrooms,
    bathrooms,
    comm_number
  } = apt;

  const result = await db.query(
    `INSERT INTO apartments (
      unit_name, unit_number, project_name, area, price, bedrooms, bathrooms, comm_number
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [unit_name, unit_number, project_name, area, price, bedrooms, bathrooms, comm_number]
  );

  return result.rows[0];
};

export const getAllApartments = async (filters: {
  unit_name?: string;
  unit_number?: string;
  project_name?: string;
}) => {
  const conditions: string[] = [];
  const values: any[] = [];

  if (filters.unit_name) {
    values.push(`%${filters.unit_name}%`);
    conditions.push(`unit_name ILIKE $${values.length}`);
  }

  if (filters.unit_number) {
    values.push(`%${filters.unit_number}%`);
    conditions.push(`unit_number ILIKE $${values.length}`);
  }

  if (filters.project_name) {
    values.push(`%${filters.project_name}%`);
    conditions.push(`project_name ILIKE $${values.length}`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT * FROM apartments ${whereClause}`;

  const result = await db.query(query, values);
  return result.rows;
};

export const getApartmentById = async (id: number) => {
  const result = await db.query('SELECT * FROM apartments WHERE id = $1', [id]);
  return result.rows[0]; // could be undefined
};