import app from './server';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('⚡️(server): Server is running at https://localhost:' + port);
});
