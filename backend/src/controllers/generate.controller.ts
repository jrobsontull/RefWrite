import { Request, Response } from 'express';
import { AxiosResponse } from 'axios';
import GenerateDAO from '../dao/generateDAO';

// Import types
import { prompt, promptRequiresElement } from '../types/global.types';

// Interfaces
interface generateParamsItem {
  name: string;
  value: string;
  ref: string;
}

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

  static async apiGenerate(req: Request, res: Response, next: Function) {
    try {
      const promptId: string = req.body.promptId; // get prompt identifier

      let promptInUse: prompt | null = null;
      for (const i in prompts) {
        if (prompts[i].identifier === promptId) {
          promptInUse = prompts[i];
        }
      }

      if (promptInUse) {
        // Valid prompt identifier found
        const requiredProps: promptRequiresElement[] = promptInUse.requires;
        let generateParams: generateParamsItem[] | null = [];
        for (const i in requiredProps) {
          const propName: string = requiredProps[i].reqVarName;
          const ref: string = requiredProps[i].ref;
          if (req.body[propName] && propName !== 'traits') {
            // Required prop present in body
            generateParams.push({
              name: propName,
              value: req.body[propName],
              ref: ref,
            });
          } else {
            // Bad request -> return
            generateParams = null;
            break;
          }
        }

        if (generateParams) {
          // All required paramaters for prompt generation available
          let finalPrompt: string = promptInUse.prompt;

          generateParams.forEach((param) => {
            finalPrompt = finalPrompt.replaceAll(param.ref, param.value);
          });

          const response:
            | AxiosResponse<any, any>
            | { error: any }
            | { result: string } = await GenerateDAO.generate({
            prompt: finalPrompt,
            maxTokens: promptInUse.maxTokens,
            temperature: promptInUse.temperature,
          });
          if (response) {
            res.json(response);
          }
        } else {
          // Invalid body - missing certain required params
          res.status(400).json({
            error: 'Missing prompt paramaters. Unable to process request.',
          });
        }
      } else {
        // Invalid request
        res.status(400).json({
          error: 'Missing prompt identifier. Unable to process request.',
        });
      }
    } catch (e: any) {
      console.error(
        '[PromptController]: Failed to generate text from prompt. ' + e
      );
    }
  }
}

export default GenerateController;
