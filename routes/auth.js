import express from 'express';
import {
  validateBody,
  authenticate,
  isValidateId,
  upload,
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
  updateAvatar,
} from '../controllers/auth/index.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logout);
router.patch(
  '/:id/subscription',
  isValidateId,
  validateBody(updateUserSubSchema),
  updateUserSub
);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);
export default router;
