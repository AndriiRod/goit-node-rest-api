import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { loginSchema, registerSchema } from '../models/user.js';
import register from '../controllers/auth/register.js';
import login from '../controllers/auth/login.js';
import authenticate from '../middlewares/authenticate.js';
import getCurrent from '../controllers/auth/getCurrent.js';
import logout from '../controllers/auth/logout.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logout);
export default router;
