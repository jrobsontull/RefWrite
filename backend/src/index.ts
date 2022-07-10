import app from './server';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { checkFileExistsSync } from './utils/fileExists';

import GenerateController from './controllers/generate.controller';
import GenerateDAO from './dao/generateDAO';
import AuthDAO from './dao/authDAO';
import ReferenceDAO from './dao/referenceDAO';

console.log('Starting up...\n');

// Check if .env file exists
const envExists = checkFileExistsSync('./.env');
if (envExists) {
  // Load environmental variables
  dotenv.config();
} else {
  console.error('⚡️ [Server]: No .env file exits. Exiting...');
  process.exit(1);
}

// Set up database connection config
let dbUri: string = process.env.MONGO_DB_URI_DEV;
if (process.env.NODE_ENV === 'production') {
  dbUri = process.env.MONGO_DB_URI_PRODUCTION;
}
const mongoClient: MongoClient = new MongoClient(dbUri, {
  maxPoolSize: 30,
  wtimeoutMS: 2500,
});

// Establish connection
mongoClient
  .connect()
  .catch((err) => {
    console.log('⚡️ [Server]: MongoDB database connection error.');
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client: MongoClient) => {
    console.log('⚡️ [Server]: Connected to MongoDB Atlas.');

    // Load collections
    await AuthDAO.injectedAuthDb(client);
    await ReferenceDAO.injectedAuthDb(client);

    // Set up prompts API
    await GenerateController.initiliasePrompts();
    await GenerateDAO.initialiseAPI();

    // Start web server
    const port: number = parseInt(process.env.PORT, 10) || 8000;
    app.listen(port, () => {
      console.log(
        '\n⚡️ [Server]: Backend running at http://localhost:' + port + '\n'
      );
    });
  });
