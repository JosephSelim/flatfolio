import express from 'express';
import { createApartment } from '../controllers/apartment.controller';
import { validateApartmentInput } from '../middlewares/apartment.middleware';

const router = express.Router();

router.post('/apartments', validateApartmentInput, createApartment);

export default router;
