import axios, { AxiosResponse, AxiosInstance } from 'axios';

let baseUrl: string = 'http://localhost:8000/';
if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.PRODUCTION_BASE_UR || baseUrl;
} else {
  console.log('Base API set to DEV.');
}

const http: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

const getRequest = async (url: string): Promise<AxiosResponse | null> => {
  try {
    const response: AxiosResponse = await http.get(url, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response;
    } else {
      return null;
    }
  } catch (e: any) {
    console.log('Error: ' + e.message);
    return e.response;
  }
};

const postRequest = async (
  url: string,
  payload: Object
): Promise<AxiosResponse | null> => {
  try {
    const body: Object = payload;
    const response: AxiosResponse = await http.post(url, body, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response;
    } else {
      return null;
    }
  } catch (e: any) {
    console.log('Error: ' + e.message);
    return e.response;
  }
};

export { getRequest, postRequest };
