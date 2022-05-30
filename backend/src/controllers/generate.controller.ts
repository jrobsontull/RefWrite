import { Request, Response } from 'express';
import GenerateDAO from '../dao/generateDAO';

let prompts: Object;

class GenerateController {
  // Initialise available prompts from config
  static async initiliasePrompts(req: Request, res: Response, next: Function) {
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
    } catch (e) {
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
    console.log('request current');
  }
}

export default GenerateController;
