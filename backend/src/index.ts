import app from './server';
import mongodb from 'mongodb';
import dotenv from 'dotenv';

// Load environmental variables
dotenv.config();
const port = process.env.PORT || 8000;

// Start web server
app.listen(port, () => {
  console.log('⚡️ [server]: Backend running at http://localhost:' + port);
});
