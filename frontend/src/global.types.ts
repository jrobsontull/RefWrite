import { AxiosResponse } from 'axios';

export interface AxiosResWithError extends AxiosResponse {
  error: string;
}
