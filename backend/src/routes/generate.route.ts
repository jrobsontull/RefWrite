import express, { Router } from 'express';
import GenerateController from '../controllers/generate.controller';

const router: Router = express.Router();

// Get list of available prompts
router.route('/prompt').get(GenerateController.apiGetCurrentPrompts);

// Update available prompts
router.route('/prompt/update').post(GenerateController.apiUpdatePrompts);

// Generate text from prompt
router.route('/prompt').post(GenerateController.apiGenerate);

export default router;
