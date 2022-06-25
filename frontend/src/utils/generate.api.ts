import { Axios, AxiosResponse } from 'axios';
import { generalOpts, prompt } from '../global.types';
import http from './http.common';

interface getCurrentPrompts {
  prompts?: prompt[];
  error?: Object;
}

class GenerateAPI {
  static async getCurrentPrompts(): Promise<getCurrentPrompts | null> {
    const url: string = '/api/v1/generate/prompt';
    const response: AxiosResponse<any, any> | null = await getRequest(url);
    if (response) {
      return response.data;
    } else {
      return null;
    }
  }

  static async generate(
    promptId: string,
    generalOpts: generalOpts,
    userInput?: string
  ) {
    const url: string = '/api/v1/generate/prompt';
    const body = {
      promptId: promptId,
      generalOpts: generalOpts,
    };
    const response: AxiosResponse<any, any> | null = await postRequest(
      url,
      body
    );
    if (response) {
      return response.data;
    } else {
      return null;
    }
  }
}

async function getRequest(
  url: string
): Promise<AxiosResponse<any, any> | null> {
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
}

async function postRequest(url: string, payload: Object) {
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
}

export default GenerateAPI;
