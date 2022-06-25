import { Request, Response } from 'express';
import { AxiosResponse } from 'axios';
import GenerateDAO from '../dao/generateDAO';

// Import types
import { prompt, generalOpts } from '../types/global.types';

// Interfaces

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
        const generalOpts: generalOpts | null = req.body.generalOpts;
        if (generalOpts) {
          const prompt: string | null = req.body.prompt;

          if (!prompt) {
            // Use prompt from prompts.json and build final prompt
            let finalPrompt: string = promptInUse.prompt;
            finalPrompt = replaceGeneralOpts(generalOpts, finalPrompt); // replace general opts

            // Use switch for prompt-specific replacements
            switch (promptInUse.identifier) {
              case 'intro-3':
                const traits: string[] = req.body.userInput;
                const joinedTraits = traits.join(', ');
                finalPrompt.replace('TRAITS', joinedTraits);
                break;
            }

            // Send request to openAI
            const completionResponse = await GenerateDAO.generate({
              model: promptInUse.model,
              maxTokens: promptInUse.maxTokens,
              temperature: promptInUse.temperature,
              prompt: finalPrompt,
            });

            if (completionResponse) {
              const result = completionResponse.result
                .trim()
                .replaceAll('\n', '');
              res.json({ result: result });
            }
          } else {
            // Use prompt for basis of next generation
          }
        } else {
          // Invalid request
          res.status(400).json({
            error: 'Missing general options. Unable to process request.',
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
      res.status(500).json({ error: e });
    }
  }
}

// Replaces the generalOpts fields in a given prompt and returns the final string
const replaceGeneralOpts = (
  generalOpts: generalOpts,
  prompt: string
): string => {
  let finalPrompt: string = prompt;
  for (let [key, value] of Object.entries(generalOpts)) {
    finalPrompt = finalPrompt.replaceAll(key.toUpperCase(), value);
  }
  return finalPrompt;
};

export default GenerateController;
