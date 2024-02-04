import * as contacts from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res, next) => {
  console.log("work");
  try {
    const result = await contacts.getAll();
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const result = await contacts.deleteContact(req.params.id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const result = await contacts.updateContact(req.params.id, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
};
