import { User } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';

const verifyEmail = async (req, res, next) => {
  const { verificationCode } = req.params;
  try {
    const user = await User.findOne({ verificationCode });
    if (!user) throw HttpError(404, 'User notfound! ');
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationCode: '',
    });
    res.json({
      message: 'Email verify success',
    });
  } catch (e) {
    next(e);
  }
};

export default verifyEmail;
