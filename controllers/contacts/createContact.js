import Contact from '../../models/contact.js';

const createContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export default createContact;
