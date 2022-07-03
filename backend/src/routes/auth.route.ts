import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router: Router = express.Router();

router.route('/register').post(AuthController.apiRegisterUser);
router.route('/login').post(AuthController.apiLoginUser);
router.route('/logout').post(AuthController.apiLogoutUser);
router.route('/verify').post(AuthController.apiVerifyUser);

export default router;
