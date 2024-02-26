import { User } from '../../models/index.js';
import { HttpError, sendMail } from '../../helpers/index.js';
import dotenv from 'dotenv';
dotenv.config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw HttpError(404, 'User not found!');
    if (user.verify)
      throw HttpError(400, 'Verification has already been passed');
    const verifyEmail = {
      to: email,
      subject: 'Verify Email',
      html: `<a href="${BASE_URL}/users/verify/${user.verificationCode}">Submit email</a>`,
    };

    await sendMail(verifyEmail);
    res.json({ message: 'Verification email sent' });
  } catch (e) {
    next(e);
  }
};
export default resendVerifyEmail;
