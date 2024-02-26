import { User } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import { sendMail } from './index.js';
dotenv.config();

const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) throw HttpError(409, 'Email in use');

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationCode,
    });
    const verifyEmail = {
      to: email,
      subject: 'Verify Email',
      html: `<a href="${BASE_URL}/users/verify/${verificationCode}">Submit email</a>`,
    };
    await sendMail(verifyEmail);
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (e) {
    next(e);
  }
};

export default register;
