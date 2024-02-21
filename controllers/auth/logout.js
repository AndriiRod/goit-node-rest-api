import { User } from '../../models/index.js';

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export default logout;
