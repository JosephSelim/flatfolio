import { Request, Response } from 'express';
import { addApartment, getAllApartments } from '../services/apartment.service';

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

export const listApartments = async (req: Request, res: Response) => {
  try {
    const apartments = await getAllApartments();
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving apartments' });
  }
};