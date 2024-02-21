import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from '../controllers/contacts/index.js';

import {
  validateBody,
  isValidateId,
  authenticate,
} from '../middlewares/index.js';

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../models/index.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, getAllContacts);

contactsRouter.get('/:id', authenticate, isValidateId, getOneContact);

contactsRouter.delete('/:id', authenticate, isValidateId, deleteContact);

contactsRouter.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  '/:id',
  authenticate,
  isValidateId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidateId,
  validateBody(updateFavoriteSchema),
  updateFavorite
);

export default contactsRouter;
