import { User } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';

const updateUserSub = async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export default updateUserSub;
