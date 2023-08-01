const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        return [];
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(contact => contact.id === contactId);
        return contact;
    } catch (error) {
        return null;
    }
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const updateContacs = contacts.filter((contact) => contact.id !== contactId);
    // console.log('updateContacs:', updateContacs);
    await fs.writeFile(contactsPath, JSON.stringify(updateContacs, null, 2));
    // console.log('contactId:', contactId);
    const removedContact = await getContactById(contactId);
    return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: Date.now().toString(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};