const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const contactPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactPath))
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  return contacts.filter((el) => Number(el.id) === Number(contactId))
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const updatedContacts = contacts.filter((el) => Number(el.id) !== Number(contactId))
  fs.writeFile(contactPath, JSON.stringify(updatedContacts), 'utf-8')
  return updatedContacts
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const contact = { ...body, id: crypto.randomInt(0, 1000) }
  contacts.push(contact)
  fs.writeFile(contactPath, JSON.stringify(contacts), 'utf-8')
  return contact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const updatingContacts = contacts.map(el => {
    if (Number(el.id) === Number(contactId)) {
      return { ...el, ...body }
    } else {
      return el
    }
  })
  fs.writeFile(contactPath, JSON.stringify(updatingContacts), 'utf-8')
  return updatingContacts.filter(el => Number(el.id) === Number(contactId))
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
