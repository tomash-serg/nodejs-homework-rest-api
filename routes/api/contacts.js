const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.json(contacts)
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contacts = await getContactById(contactId)
  res.json(contacts)
})

router.post('/', async (req, res, next) => {
  const body = req.body
  const contacts = await addContact(body)
  res.json(contacts)
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contacts = await removeContact(contactId)
  res.json(contacts)
})

router.patch('/:contactId', async (req, res, next) => {
  const body = req.body
  const { contactId } = req.params
  const contacts = await updateContact(contactId, body)
  res.json(contacts)
})

module.exports = router
