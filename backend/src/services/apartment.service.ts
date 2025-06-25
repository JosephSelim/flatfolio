import { db } from '../db';
import { Apartment } from '../models/apartment.model';
import pg from 'pg';

pg.types.setTypeParser(20, (v) => Number(v));

type Filters = {
  search?: string;
  unit_name?: string;
  unit_number?: string;
  project_name?: string;
  price_min?: number;
  price_max?: number;
};

const FILTER_MAP: Record<
  keyof Filters,
  (idx: number) => string | null
> = {
  search: (i) =>
    `(unit_name ILIKE $${i} OR unit_number ILIKE $${i} OR project_name ILIKE $${i})`,
  unit_name: (i) => `unit_name ILIKE $${i}`,
  unit_number: (i) => `unit_number ILIKE $${i}`,
  project_name: (i) => `project_name ILIKE $${i}`,
  price_min: (i) => `price >= $${i}`,
  price_max: (i) => `price <= $${i}`,
};

function buildWhere(filters: Filters) {
  const conditions: string[] = [];
  const values: any[] = [];

  for (const [key, rawVal] of Object.entries(filters) as [keyof Filters, any][]) {
    if (rawVal == null || rawVal === '') continue;

    const clause = FILTER_MAP[key];
    if (!clause) continue;

    const value =
      key === 'price_min' || key === 'price_max'
        ? Number(rawVal)
        : `%${rawVal}%`;

    values.push(value);
    conditions.push(clause(values.length)!);
  }

  return {
    where: conditions.length ? 'WHERE ' + conditions.join(' AND ') : '',
    values,
  };
}

export const addApartment = async (apt: Apartment) => {
  const {
    unit_name,
    unit_number,
    project_name = 'Unassigned Project',
    area,
    price,
    bedrooms,
    bathrooms,
    comm_number,
  } = apt;

  const q = `
    INSERT INTO apartments (
      unit_name, unit_number, project_name, area,
      price, bedrooms, bathrooms, comm_number
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *;
  `;

  try {
    const { rows } = await db.query(q, [
      unit_name,
      unit_number,
      project_name,
      area,
      price,
      bedrooms,
      bathrooms,
      comm_number,
    ]);
    return rows[0] as Apartment;
  } catch (err: any) {
    if (err.code === '23505') throw { status: 409, message: 'Apartment already exists' };
    if (err.code === '23514') throw { status: 400, message: 'Constraint failed', detail: err.detail };
    throw err;
  }
};

type ListOpts = Filters & {
  page?: number;
  pageSize?: number;
  sortBy?: 'price' | 'created_at';
  dir?: 'asc' | 'desc';
};

export const getAllApartments = async (opts: ListOpts) => {
  const { page = 1, pageSize = 20, sortBy = 'created_at', dir = 'desc', ...filters } = opts;

  const { where, values } = buildWhere(filters);

  const safeSort = sortBy === 'price' ? 'price' : 'created_at';
  const safeDir = dir.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  values.push(pageSize, (page - 1) * pageSize);

  const sql = `
    SELECT * FROM apartments
    ${where}
    ORDER BY ${safeSort} ${safeDir}
    LIMIT $${values.length - 1} OFFSET $${values.length};
  `;

  const { rows } = await db.query(sql, values);
  return rows as Apartment[];
};

export const getApartmentById = async (id: number) => {
  const { rows } = await db.query('SELECT * FROM apartments WHERE id = $1', [id]);
  return rows[0] as Apartment | undefined;
};
