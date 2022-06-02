import fs from 'fs/promises';
import { prompt } from '../types/global.types';

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
}

export default GenerateDAO;
