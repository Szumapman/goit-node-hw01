const contacts = require("./contacts");
const logError = require("./logger");
const errorsLogPath = require("./logger").errorsLogPath;
require('colors');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const errorHandle = (error) => {
  logError(error);
  console.log(`Error: ${error.message},\n\n`.red, `You can check all errors in error.log file at:\n`.yellow, `${errorsLogPath}`.blue);
}

// TODO: refaktor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          contacts.listContacts()
            .then(contacts => console.table(contacts))
              .catch(error => {
                  errorHandle(error);
              });
      break;

    case "get":
      if (id) {
        contacts.getContactById(id)
          .then(contact => console.log(contact))
            .catch(error => {
                errorHandle(error);
            });
      } else {
        console.warn("\x1B[31m Please enter id!");
      }
      break;

    case "add":
      if (name && email && phone) {
        contacts.addContact(name, email, phone)
          .then(contact => console.log(contact, "\x1B[32m Contact added successfully!".green))
            .catch(error => {
                errorHandle(error);
            });
      } else {
        console.warn("\x1B[31m Please enter name, email and phone!");
      }
      break;

    case "remove":
      if (id) {
        contacts.removeContact(id)
          .then(() => console.log("\x1B[32m Contact removed successfully!".green))
            .catch(error => {
                errorHandle(error);
            });
      } else {
        console.warn("\x1B[31m Please enter id!");
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);