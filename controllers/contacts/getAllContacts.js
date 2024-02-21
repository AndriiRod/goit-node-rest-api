import { Contact } from '../../models/index.js';

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5, favorite } = req.query;
    const skip = (page - 1) * limit;
    let query = { owner };

    if (favorite) {
      query = {
        ...query,
        favorite,
      };
    }

    const result = await Contact.find(query, '', {
      skip,
      limit,
    }).populate('owner', 'name');
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export default getAllContacts;
