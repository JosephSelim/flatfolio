import { Request, Response, NextFunction } from 'express';

export const validateApartmentInput = (
    req: Request,
    res: Response, 
    next: NextFunction
): void => {
  const { unit_name, unit_number, price, bedrooms } = req.body;

  if (!unit_name || !unit_number || !price || !bedrooms) {
    res.status(400).json({ message: 'Missing required apartment fields' });
    return;
  }

  if (isNaN(price) || isNaN(bedrooms)) {
    res.status(400).json({ message: 'Invalid number for price or bedrooms' });
    return;
  }

  next();
};
