const mongoose = require('mongoose')

const coinsSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    coins: {
      type: Number,
      default: 0,
    },
})

const reqString = {
  type: String,
  required: true,
}

module.exports.setDefault = async (defaultCoins) => {
        coinsSchema = mongoose.Schema({
        guildId: reqString,
        userId: reqString,
        coins: {
          type: Number,
          default: defaultCoins,
        },
    })
}

module.exports = mongoose.model('coins', coinsSchema)