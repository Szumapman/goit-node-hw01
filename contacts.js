const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
        return `Contact with id:  ${contactId} not found.`;
    }
    return contact;
};

const removeContact = async (contactId) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        throw new Error(`Contact with id:  ${contactId} not found.`);
    }
    contacts.splice(index, 1);
    return fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const addContact = async (name, email, phone) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const id = uuidv4(); // to generate id in format symilar to used in file, we can use nanoid instead of uuid ;)
        const newContact = { id, name, email, phone };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return getContactById(id);
};

module.exports = { listContacts, getContactById, removeContact, addContact };