const fs = require('fs/promises')
const path = require('path')

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
  contacts.push(body)
  fs.writeFile(contactPath, JSON.stringify(contacts), 'utf-8')
  return contacts
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
  return updatingContacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
