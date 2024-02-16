import Contact from '../../models/contact.js';

const getAllContacts = async (req, res, next) => {
  console.log('work');
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export default getAllContacts;
