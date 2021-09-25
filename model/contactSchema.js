const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    },
  },
  { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('contact', contactSchema)

module.exports = { Contact }
