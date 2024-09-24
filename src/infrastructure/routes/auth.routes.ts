import * as AuthController from '@controllers/auth.controller.js';
import { Router } from 'express';

const router: Router = Router();

/**
 * @route POST /auth/register
 * @description Route for adding new user
 */
router.post('/register', AuthController.register);

export default router;
