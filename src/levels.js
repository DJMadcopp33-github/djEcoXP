const mongo = require('./mongo')
const levelSchema = require('../schemas/levelSchema')
const getNeededXP = (level) => level * level * 100
const defaultXpPerMessage = 23
const defaultLevelUpMessage = `You are now level ${level} with ${xp} experience!`
const messageForLevel = `You now need ${getNeededXP(level)} XP to level up again.`


module.exports.defaultMessage = async (defaultMessage) => {
    defaultLevelUpMessage = defaultMessage
}

module.exports.defaultXp = async (defaultXp) => {
    defaultXpPerMessage = defaultXp
}

module.exports = (client) => {
  client.on('message', (message) => {
    const { guild, member } = message

    addXP(guild.id, member.id, defaultXpPerMessage, message)
  })
}

const addXP = async (guildId, userId, xpToAdd, message) => {
  await mongo().then(async (mongoose) => {
    try {
      const result = await levelSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            xp: xpToAdd,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      let { xp, level } = result
      const needed = getNeededXP(level)

      if (xp >= needed) {
        ++level
        xp -= needed

        message.reply(
          defaultLevelUpMessage + messageForLevel
        )

        await levelSchema.updateOne(
          {
            guildId,
            userId,
          },
          {
            level,
            xp,
          }
        )
      }
    } finally {
      mongoose.connection.close()
    }
  })
}

const getLevels = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
          const result = await coinsSchema.findOne({
            userId,
          })

          return result
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.addXP = addXP
module.exports.getLevels = getLevels