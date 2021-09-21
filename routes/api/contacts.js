const express = require('express')
const router = express.Router()
const { contactsSchema } = require('../../validation/validation')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await getContactById(contactId)
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let { error } = contactsSchema.validate(req.body)
    if (error) {
      error = new Error(error.message)
      error.status = 400
      throw error
    }
    const body = req.body
    const contacts = await addContact(body)
    res.status(201).json(contacts)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    await removeContact(contactId)
    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    let { error } = contactsSchema.validate(req.body)
    if (error) {
      error = new Error(error.message)
      error.status = 400
      throw error
    }
    const body = req.body
    const { contactId } = req.params
    const contact = await updateContact(contactId, body)
    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
})

module.exports = router
