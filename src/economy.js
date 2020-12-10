const mongo = require('./mongo')
const coinsSchema = require('../schemas/coinsSchema')
const defaultNum = 0

module.exports.setDefault = async (defaultNumber) => {
    defaultNum = defaultNumber
    mongo.setDefault(defaultNumber)
}

module.exports.addCoins = async (userId, coinsToAdd) => {
    return await mongo().then(async (mongoose) => {
      try {
        const result = await coinsSchema.findOneAndUpdate(
          {
            userId,
          },
          {
            userId,
            $inc: {
              coinsToAdd,
            },
          },
          {
            upsert: true,
            new: true,
          }
        )
  
        return result.coins
      } finally {
        mongoose.connection.close()
      }
    })
}

module.exports.getCoins = async (userId) => {
    return await mongo().then(async (mongoose) => {
      try {
        const result = await coinsSchema.findOne({
          userId,
        })
  
        let coins = defaultNum
        if (result) {
          coins = result.coins
        } else {
          console.log('Inserting a document')
          await new coinsSchema({
            userId,
            coins,
          }).save()
        }
  
        return coins
      } finally {
        mongoose.connection.close()
      }
    })
}

module.exports.removeCoins = async  (userId, coinsToRemove) => {
    const result = this.addCoins(userId, coinsToRemove * -1)
  
    return result
}