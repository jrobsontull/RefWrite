import express, { Router } from 'express';

const router: Router = express.Router();

router.route('/register').post();

export default router;
