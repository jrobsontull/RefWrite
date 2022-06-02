import express, { Router } from 'express';
import GenerateController from '../controllers/generate.controller';

const router: Router = express.Router();

// Get list of available prompts
router.route('/prompts').get(GenerateController.apiGetCurrentPrompts);

// Update available prompts
router.route('/prompts/update').post(GenerateController.apiUpdatePrompts);

export default router;
