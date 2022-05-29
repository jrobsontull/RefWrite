// Module imports
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// Middleware imports
import cors from 'cors';

// Configure server
dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send({ status: 'Working express and TS server.' });
});

export default app;
