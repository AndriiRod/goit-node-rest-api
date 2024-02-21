import User from '../../models/user.js';

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.json({
      message: 'Logout success',
    });
  } catch (e) {
    next(e);
  }
};

export default logout;
