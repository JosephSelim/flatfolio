import { Request, Response } from 'express';
import {
  addApartment,
  getAllApartments,
  getApartmentById,
} from '../services/apartment.service';

export const createApartment = async (
    req: Request, 
    res: Response
): Promise<void> => {
  try {
    const apartment = await addApartment(req.body);
    res.status(201).json(apartment);
  } catch (err: any) {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Error adding apartment' });
  }
};

export const listApartments = async (
    req: Request, 
    res: Response
) => {
  try {
    const {
      search,
      unit_name,
      unit_number,
      project_name,
      price_min,
      price_max,
      page,
      pageSize,
      sortBy,
      dir,
    } = req.query as Record<string, string>;

    const apartments = await getAllApartments({
      search,
      unit_name,
      unit_number,
      project_name,
      price_min: price_min ? Number(price_min) : undefined,
      price_max: price_max ? Number(price_max) : undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      sortBy: sortBy as 'price' | 'created_at',
      dir: dir as 'asc' | 'desc',
    });

    res.json(apartments);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving apartments' });
  }
};

export const getApartmentDetails = async (
  req: Request, 
  res: Response
) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Invalid apartment ID' });
    return;
  }

  try {
    const apartment = await getApartmentById(id);
    if (!apartment) {
      res.status(404).json({ message: 'Apartment not found' });
      return;
    }
    res.json(apartment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching apartment details' });
  }
};