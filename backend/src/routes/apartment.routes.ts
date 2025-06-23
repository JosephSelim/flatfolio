import express from 'express';
import { createApartment, listApartments, getApartmentDetails } from '../controllers/apartment.controller';
import { validateApartmentInput } from '../middlewares/apartment.middleware';

const router = express.Router();

router.post('/apartments', validateApartmentInput, createApartment);
router.get('/apartments', listApartments);
router.get('/apartments/:id', getApartmentDetails);

export default router;
