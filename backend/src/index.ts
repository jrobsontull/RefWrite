import app from './server';
import mongodb from 'mongodb';
import dotenv from 'dotenv';

import GenerateController from './controllers/generate.controller';
import GenerateDAO from './dao/generateDAO';

// Load environmental variables
dotenv.config();
const port: number = parseInt(process.env.PORT, 10) || 8000;

// Initialise environment
const initialiseEnv = async () => {
  await GenerateController.initiliasePrompts();
  await GenerateDAO.initiateHTTP();
};
initialiseEnv();

// Start web server
app.listen(port, () => {
  console.log('⚡️ [Server]: Backend running at http://localhost:' + port);
});
