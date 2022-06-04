import app from './server';
import mongodb from 'mongodb';
import dotenv from 'dotenv';

import GenerateController from './controllers/generate.controller';

// Load environmental variables
dotenv.config();
const port = process.env.PORT || 8000;

// Start web server
const promptsInitialise = async () => {
  await GenerateController.initiliasePrompts();
};
promptsInitialise();

app.listen(port, () => {
  console.log('⚡️ [Server]: Backend running at http://localhost:' + port);
});
