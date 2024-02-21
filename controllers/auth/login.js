import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { SECRET_KEY } = process.env;
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, 'Email or password invalid');
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, 'Email or password invalid');

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
    });
  } catch (e) {
    next(e);
  }
};

export default login;
