import axios from 'axios';

let baseUrl: string = 'http://localhost:8000/';
if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.PRODUCTION_BASE_UR || baseUrl;
} else {
  console.log('Base API set to DEV.');
}

export default axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-type': 'application/json',
  },
});
