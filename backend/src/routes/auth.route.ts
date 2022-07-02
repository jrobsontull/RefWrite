import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router: Router = express.Router();

router.route('/register').post(AuthController.apiRegisterUser);

export default router;
