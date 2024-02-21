import { Contact } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';

const getOneContact = async (req, res, next) => {
  try {
    console.log(`This is id: ${req.params}`);
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export default getOneContact;
