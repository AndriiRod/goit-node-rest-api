import { Contact } from '../../models/index.js';

const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export default createContact;
