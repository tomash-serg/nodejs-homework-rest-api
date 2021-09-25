const { Contact } = require('./contactSchema')

const listContacts = async () => await Contact.find({}, '_id name email phone')

const getContactById = async ({ params }) =>
  await Contact.findById(params.contactId, '_id name email phone')

const removeContact = async ({ params }) =>
  (await Contact.findByIdAndDelete(params.contactId)) && { message: 'contact deleted' }

const addContact = async ({ body }) => await Contact.create(body)

const updateContact = async ({ params, body }) =>
  await Contact.findByIdAndUpdate(params.contactId, body, { new: true })

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
