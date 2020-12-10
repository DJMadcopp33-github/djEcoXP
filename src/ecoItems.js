const mongo = require('./mongo')
const inventorySchema = require('../schemas/inventorySchema')

module.exports.getItems = async (userId) => {
    await mongo().then(async (mongoose) => {
      try {
        const results = await inventorySchema.findOne({
          userId,
        })
  
        const itemsReply
        if(results){
          for (const item of results.items) {
            const { items, itemNumber } = item
  
            itemsReply = `${items} - ${itemNumber}`
          }
        } else {
          itemsReply = 'Nothing'
        }
  
        return itemsReply
      } finally {
        mongoose.connection.close()
      }
    })
  }
  
  module.exports.addItems = async (userId, itemsToAdd, itemNumber) => {
    await mongo().then(async (mongoose) => {
      try {
  
        const item = {
          item: itemsToAdd,
          itemsNumber: itemNumber,
        }
  
        const result = await inventorySchema.findOneAndUpdate(
          {
            userId,
          },
          {
            userId,
            $push: {
              items: item,
            },
          },
          {
            upsert: true,
          }
        )
  
        return result.items
      } finally {
        mongoose.connection.close()
      }
    })
  }
  
  module.exports.removeItems = async (userId, itemToRemove) => {
    const arr = this.getItems(userId);
    const itemRemove

    if(arr === 'Nothing' || arr.itemNumber === 0 ){
        console.log(`Can not remove items from ${userId}! They either have nothing or 0 of that item.`)
    } else {
        if(arr.itemNumber === 1){
            itemRemove = arr.filter(e => e !== itemToRemove)
            this.addItems(userId, itemRemove, 0)
        } else {
            itemRemove = arr.itemNumber - 1
            this.addItems(userId, itemToRemove, itemRemove)
        }
    }
}  