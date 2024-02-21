import { Contact } from '../../models/index.js';

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, '', { skip, limit }).populate(
      'owner',
      'name'
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export default getAllContacts;
