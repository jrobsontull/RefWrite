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

const getRequest = async (
  url: string
): Promise<AxiosResponse<any, any> | null> => {
  try {
    const response: AxiosResponse<any, any> = await http.get(url);

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
): Promise<AxiosResponse<any, any> | null> => {
  try {
    const body: Object = payload;
    const response: AxiosResponse = await http.post(url, body);

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
