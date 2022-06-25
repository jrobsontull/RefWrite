import fs from 'fs/promises';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { prompt } from '../types/global.types';

interface generateProps {
  model?: string;
  maxTokens: number;
  temperature?: number;
  prompt: string;
  stopChar?: string;
}

interface generateBody {
  model: string;
  max_tokens: number;
  temperature: number;
  prompt: string;
  top_p?: number;
  n?: number;
  stop?: string;
}

dotenv.config();
let http: AxiosInstance;

class GenerateDAO {
  // Read prompts.json config and return parsed JSON
  static async readPromptsJSON() {
    try {
      const stream: string = await fs.readFile(
        './config/prompts.json',
        'utf-8'
      );
      const prompts: prompt[] = JSON.parse(stream).prompts;
      return prompts;
    } catch (e: any) {
      console.error('[GenerateDAO]: Error reading prompts.json config. ' + e);
      return null;
    }
  }

  // Set up axios base
  static async initiateHTTP() {
    try {
      const baseURL: string = 'https://api.openai.com/v1/';
      const apiKey: string = process.env.OPENAI_API_KEY || null;

      if (apiKey) {
        http = axios.create({
          baseURL: baseURL,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + apiKey,
          },
        });
        console.log('[GenerateDAO]: Initialised prompt API HTTP.');
      } else {
        throw new Error('OpenAI API key missing.');
      }
    } catch (e: any) {
      console.error(
        '[GenerateDAO]: Failed to initialise prompt API. ' + e.message
      );
    }
  }

  // Generate text from prompt
  static async generate({
    model = 'text-curie-001',
    maxTokens,
    temperature = 0,
    prompt,
    stopChar = '.\n',
  }: generateProps) {
    try {
      const body: generateBody = {
        model: model,
        max_tokens: maxTokens,
        temperature: temperature,
        prompt: prompt,
        top_p: 1,
        n: 1,
      };

      const response: AxiosResponse = await http.post('/completions', body);
      if (response && response.status === 200) {
        return { result: response.data.choices[0].text };
      } else {
        return { error: 'Failed to get good response from API.' };
      }
    } catch (e: any) {
      console.error(
        '[GenerateDAO]: Failed to generate text from prompt. ' + e.message
      );

      return { error: e.message };
    }
  }
}

export default GenerateDAO;
