import HttpError from '../helpers/HttpError.js';
import Contact from '../models/contact.js';

export const getAllContacts = async (req, res, next) => {
  console.log('work');
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const getOneContact = async (req, res, next) => {
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

export const deleteContact = async (req, res, next) => {
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

export const createContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const updateContact = async (req, res, next) => {
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

export const updateFavorite = async (req, res, next) => {
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
