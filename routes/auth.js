import express from 'express';
import { validateBody, authenticate } from '../middlewares/index.js';
import { loginSchema, registerSchema } from '../models/index.js';
import {
  register,
  logout,
  login,
  getCurrent,
} from '../controllers/auth/index.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logout);
export default router;
