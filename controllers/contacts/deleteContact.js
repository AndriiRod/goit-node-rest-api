import { Contact } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';

const deleteContact = async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
export default deleteContact;
