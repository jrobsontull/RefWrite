import fs from 'fs/promises';

class GenerateDAO {
  // Read prompts.json config and return parsed JSON
  static async readPromptsJSON() {
    try {
      const stream: string = await fs.readFile(
        './config/prompts.json',
        'utf-8'
      );
      const prompts: Object = JSON.parse(stream);
      return prompts;
    } catch (e) {
      console.error('[GenerateDAO]: Error reading prompts.json config. ' + e);
      return null;
    }
  }
}

export default GenerateDAO;
