import { Axios, AxiosResponse } from 'axios';

import http from './http.common';

class GenerateAPI {
  static async getCurrentPrompts() {
    const url: string = '/api/v1/generate/prompts';
    const response: AxiosResponse<any, any> | null = await getRequest(url);
    if (response) {
      return response.data;
    } else {
      return null;
    }
  }
}

async function getRequest(url: string) {
  try {
    const response: AxiosResponse<any, any> = await http.get(url);

    if (response.status === 200) {
      return response;
    } else {
      return null;
    }
  } catch (e: any) {
    console.log('Error: ' + e.message);
    return null;
  }
}

export default GenerateAPI;
