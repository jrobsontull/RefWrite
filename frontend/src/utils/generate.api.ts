import { AxiosResponse } from 'axios';
import { generalOpts, prompt } from '../global.types';
import { getRequest, postRequest } from './http.common';

interface getCurrentPrompts {
  prompts?: prompt[];
  error?: string;
}

class GenerateAPI {
  static getCurrentPrompts = async (): Promise<getCurrentPrompts | null> => {
    const url: string = '/api/v1/generate/prompt';
    const response: AxiosResponse<any, any> | null = await getRequest(url);
    if (response) {
      return response.data;
    } else {
      return null;
    }
  };

  static generate = async (
    promptId: string,
    generalOpts: generalOpts,
    userInput?: string
  ) => {
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
  };
}

export default GenerateAPI;
