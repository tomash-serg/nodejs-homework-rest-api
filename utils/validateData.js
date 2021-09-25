const { contactsSchema } = require('../validation')

const validateData = () => {
  return async(req, res, next) => {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message
      })
      return
    }
    next(error)
  }
}

module.exports = validateData
