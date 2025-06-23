import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import apartmentRoutes from './routes/apartment.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use('/api', apartmentRoutes);

const port = Number(process.env.BACKEND_PORT) || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});