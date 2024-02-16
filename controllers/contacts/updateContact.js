import Contact from '../../models/contact.js';
import HttpError from '../../helpers/HttpError.js';

const updateContact = async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
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

export default updateContact;
