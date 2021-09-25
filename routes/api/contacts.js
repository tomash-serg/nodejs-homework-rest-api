const express = require('express')
const router = express.Router()
const { validateData, models } = require('../../utils')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model')

router.get('/', models(listContacts))
router.get('/:contactId', models(getContactById))
router.post('/', validateData(), models(addContact, 'post'))
router.patch('/:contactId', validateData(), models(updateContact))
router.delete('/:contactId', models(removeContact))

module.exports = router
