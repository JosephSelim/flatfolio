import express from 'express';
import { createApartment, listApartments } from '../controllers/apartment.controller';
import { validateApartmentInput } from '../middlewares/apartment.middleware';

const router = express.Router();

router.post('/apartments', validateApartmentInput, createApartment);
router.get('/apartments', listApartments);

export default router;
