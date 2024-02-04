import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const currentFilePath = new URL(import.meta.url).pathname;
const dataPath = path.join(path.dirname(currentFilePath),'..', 'db', 'contacts.json');
console.log(currentFilePath);
console.log(dataPath);
export const getAll = async () => {
  // console.log("privet");
  const data = await fs.readFile(dataPath);
  return JSON.parse(data);
};

export const getById = async id => {
  const data = await getAll();
  return data.find(contact => contact.id === id) || null;
};

export const addContact = async newContact => {
  const contact = {
    id: nanoid(),
    ...newContact,
  };
  const data = await getAll();
  data.push(contact);
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  return contact;
};

export const updateContact = async (id, contact) => {
  const data = await getAll();
  const indexContact = data.findIndex(contact => contact.id === id);
  if (indexContact === -1) return null;
  data[indexContact] = { id, ...contact };
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  return data[indexContact];
};

export const deleteContact = async id => {
  const data = await getAll();
  const indexContact = data.findIndex(contact => contact.id === id);
  if (indexContact === -1) return null;
  const [deleteContact] = data.splice(indexContact, 1);
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  return deleteContact;
};
