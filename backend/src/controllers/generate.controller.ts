import { Request, Response } from 'express';
import GenerateDAO from '../dao/generateDAO';

// Import types
import { prompt } from '../types/global.types';

// Global vars
let prompts: prompt[] = [];

// Controller
class GenerateController {
  // Initialise available prompts from config
  static async initiliasePrompts() {
    try {
      prompts = await GenerateDAO.readPromptsJSON();
      if (prompts) {
        console.log('[GenerateController]: Prompts config reloaded.');
      } else {
        console.error(
          '[GenerateController]: Failed to initialise prompts config.'
        );
      }
    } catch (e: any) {
      console.error(
        '[GenerateController]: Failed to initialise prompts config. ' + e
      );
    }
  }

  // Update available prompts from config on request
  static async apiUpdatePrompts(req: Request, res: Response, next: Function) {
    try {
      prompts = await GenerateDAO.readPromptsJSON();
      if (prompts) {
        console.log('[GenerateController]: Prompts config reloaded.');
        res.json({ status: 'Successfully reinitialised prompts config.' });
      } else {
        console.error(
          '[GenerateController]: Failed to initialise prompts config.'
        );
        res.status(500).json({
          error: 'Failed to reinitialise prompts config.',
        });
      }
    } catch (e: any) {
      console.error(
        '[GenerateController]: Failed to initialise prompts config. ' + e
      );
      res
        .status(500)
        .json({ error: 'Failed to reinitialise prompts config. ' + e.message });
    }
  }

  // Get list of available prompts
  static async apiGetCurrentPrompts(
    req: Request,
    res: Response,
    next: Function
  ) {
    try {
      res.json({ prompts: prompts });
    } catch (e: any) {
      console.error(
        '[GenerateController]: Failed to get current prompts. ' + e
      );
      res
        .status(500)
        .json({ error: 'Failed to reinitialise prompts config. ' + e.message });
    }
  }
}

export default GenerateController;
