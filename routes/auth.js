import express from 'express';
import {
  validateBody,
  authenticate,
  isValidateId,
} from '../middlewares/index.js';
import {
  loginSchema,
  registerSchema,
  updateUserSubSchema,
} from '../models/index.js';
import {
  register,
  logout,
  login,
  getCurrent,
  updateUserSub,
} from '../controllers/auth/index.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logout);
router.patch(
  '/users/:id/subscription',
  isValidateId,
  validateBody(updateUserSubSchema),
  updateUserSub
);
export default router;
