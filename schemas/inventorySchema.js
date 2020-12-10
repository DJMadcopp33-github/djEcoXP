const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [Object],
    required: true,
  },
})

module.exports = mongoose.model('inventory', inventorySchema)