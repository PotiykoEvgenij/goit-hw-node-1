const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const contacts = require('./contacts');

const argv = yargs(hideBin(process.argv)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

      case 'remove':
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Невідомий тип дії!');
  }
}

invokeAction(argv);

// console.log('argv:', argv);
// console.log('contactsPath:', contactsPath);