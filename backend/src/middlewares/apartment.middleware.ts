import { Request, Response, NextFunction } from 'express';

const digits = /^[0-9]{9,15}$/;

export const validateApartmentInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const {
    unit_name,
    unit_number,
    price,
    bedrooms,
    comm_number,
    area,
    bathrooms,
  } = req.body;

  if (!unit_name || !unit_number || price == null || bedrooms == null || !comm_number) {
    res.status(400).json({ message: 'Missing required apartment fields' });
    return;
  }

  const asNum = (v: unknown) => Number(v);
  const errors: string[] = [];

  if (isNaN(asNum(price)) || asNum(price) <= 0) errors.push('price must be > 0');
  if (isNaN(asNum(bedrooms)) || asNum(bedrooms) < 0)
    errors.push('bedrooms must be >= 0');
  if (area != null && (isNaN(asNum(area)) || asNum(area) <= 0))
    errors.push('area must be > 0 when provided');
  if (bathrooms != null && (isNaN(asNum(bathrooms)) || asNum(bathrooms) < 0))
    errors.push('bathrooms must be >= 0 when provided');
  if (!digits.test(String(comm_number)))
    errors.push('comm_number must be 9-15 digits (numbers only)');

  if (errors.length) {
    res.status(400).json({ message: 'Validation failed', details: errors });
    return;
  }

  next();
};
