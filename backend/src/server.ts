// Module imports
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// Middleware imports
import cors from 'cors';

// Route imports
import generate from './routes/generate.route';

// Configure server
dotenv.config();
const app: Express = express();

// Set up middleware
app.use(cors());
app.use(express.json());

// Set up routing
app.use('/api/v1/generate', generate);

// All other non-routes
app.use('*', (req: Request, res: Response) =>
  res.status(404).json({ error: 'not found' })
);

export default app;
