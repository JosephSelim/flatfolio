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

export const getAllApartments = async () => {
  const result = await db.query('SELECT * FROM apartments');
  return result.rows;
};

export const getApartmentById = async (id: number) => {
  const result = await db.query('SELECT * FROM apartments WHERE id = $1', [id]);
  return result.rows[0]; // could be undefined
};