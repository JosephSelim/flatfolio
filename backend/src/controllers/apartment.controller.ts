import { Request, Response } from 'express';
import { addApartment, getAllApartments, getApartmentById } from '../services/apartment.service';

export const createApartment = async (
    req: Request, 
    res: Response
): Promise<void> => {
  try {
    const apartment = await addApartment(req.body);
    res.status(201).json(apartment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding apartment' });
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
      price_max
    } = req.query;

    const filters = {
      search: search as string,
      unit_name: unit_name as string,
      unit_number: unit_number as string,
      project_name: project_name as string,
      price_min: price_min ? Number(price_min) : undefined,
      price_max: price_max ? Number(price_max) : undefined
    };

    const apartments = await getAllApartments(filters);
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving apartments' });
  }
};

export const getApartmentDetails = async (
    req: Request, 
    res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
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
    console.error(err);
    res.status(500).json({ message: 'Error fetching apartment details' });
  }
};