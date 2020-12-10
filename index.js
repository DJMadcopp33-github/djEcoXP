const mongo = require('./src/mongo')
const economy = require('./src/economy')
const levels = require('./src/levels')
const ecoItems = require('./src/ecoItems')
const coinsSchema = require('./schemas/coinsSchema')

function connect(code) {
    mongo(code)
}

function addCoins(userId, coinsToAdd) {
    economy.addCoins(userId, coinsToAdd)
}

function getCoins(userId) {
    economy.getCoins(userId)
}

function removeCoins(userId, coinsToRemove){
    economy.removeCoins(userId, coinsToRemove)
}

function defaultCoins(value){
    coinsSchema.setDefault(value)
}

function defaultXpPerMessage(value){
    levels.defaultXp(value)
}

function defaultLevelUpMessage(string){
    levels.defaultLevelUpMessage(string)
}

function levelsConnect(client){
    levels(client)
}

function djEcoXP(options) {
    if(options.connect){
        connect(options.connect)
    }
    if(options.defaultXpPerMessage){
        defaultXpPerMessage(options.defaultXpPerMessage)
    }
    if(options.defaultLevelUpMessage){
        defaultLevelUpMessage(options.defaultLevelUpMessage)
    }
    if(options.levelsConnect){
        levelsConnect(options.levelsConnect)
    }
    if(options.defaultCoins){
        defaultCoins(options.defaultCoins)
    }
}

function getItems(userId){
    ecoItems.getItems(userId)
}

function addItems(userId, itemToAdd, itemNumber){
    ecoItems.addItems(userId, itemToAdd, itemNumber)
}

function removeItems(userId, itemToRemove) {
    ecoItems.removeItems(userId, itemToRemove)
}

function getLevels(guildId, userId){
    levels.getLevels(guildId, userId)
}

module.exports.connect = connect
module.exports.addCoins = addCoins
module.exports.getCoins = getCoins
module.exports.removeCoins = removeCoins
module.exports.defaultXpPerMessage = defaultXpPerMessage
module.exports.defaultLevelUpMessage = defaultLevelUpMessage
module.exports.levelsConnect = levelsConnect
module.exports.djEcoXP = djEcoXP
module.exports.getItems = getItems
module.exports.addItems = addItems
module.exports.removeItems = removeItems
module.exports.getLevels = getLevels