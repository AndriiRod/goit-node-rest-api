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
  emailSchema,
} from '../models/index.js';
import {
  register,
  logout,
  login,
  getCurrent,
  updateUserSub,
  updateAvatar,
  resendVerifyEmail,
  verifyEmail,
} from '../controllers/auth/index.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.get('/verify/:verificationCode', verifyEmail);
router.post('/verify', validateBody(emailSchema), resendVerifyEmail);
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
