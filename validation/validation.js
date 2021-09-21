const Joi = require('joi')

const contactsSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(5).email().required(),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
})

module.exports = { contactsSchema }
