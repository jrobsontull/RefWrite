// Module imports
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// Middleware imports
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Route imports
import generate from './routes/generate.route';
import auth from './routes/auth.route';

// Configure server
dotenv.config();
const app: Express = express();

// Set up middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1'],
    exposedHeaders: ['Set-Cookie'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Set up routing
app.use('/api/v1/generate', generate);
app.use('/api/v1/auth', auth);

// All other non-routes
app.use('*', (req: Request, res: Response) =>
  res.status(404).json({ error: 'not found' })
);

export default app;
