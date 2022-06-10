import fs from 'fs/promises';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { prompt, promptData } from '../types/global.types';

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
      const apiKey = process.env.OPENAI_API_KEY || null;
      http = axios.create({
        baseURL: baseURL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey,
        },
      });
      console.log('[GenerateDAO]: Initialised prompt API HTTP.');
    } catch (e: any) {
      console.error('[GenerateDAO]: Failed to initialise prompt API. ' + e);
    }
  }

  // Generate text from prompt
  static async generate({
    model = 'text-curie-001',
    maxTokens,
    temperature = 0,
    prompt,
  }: promptData) {
    try {
      const body = {
        model: model,
        max_tokens: maxTokens,
        temperature: temperature,
        prompt: prompt,
        top_p: 1,
        n: 1,
        stop: '.\n',
      };

      const response: AxiosResponse = await http.post('/completions', body);
      if (response) {
        return response.data;
      }
    } catch (e: any) {
      console.error('[GenerateDAO]: Failed to generate text from prompt. ' + e);
      return { error: e };
    }
  }
}

export default GenerateDAO;
