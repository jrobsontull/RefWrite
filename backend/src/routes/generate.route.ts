import express, { Router } from 'express';
import GenerateController from '../controllers/generate.controller';

const router: Router = express.Router();

router
  .route('/prompt')
  .get(GenerateController.apiGetCurrentPrompts)
  .post(GenerateController.apiGenerate);

// Update available prompts
router.route('/prompt/update').post(GenerateController.apiUpdatePrompts);

export default router;
