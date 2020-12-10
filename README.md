# What is this?

This is a package that will help you with economy and levels bot with discord.js

# Installation

`npm install djecoxp --save`

In your bot file you must do this for the package to work.

```
const djEcoXP = require('djecoxp')
const Discord = require('discord.js')
const client = new Discord.Client

djEcoXP.connect('Your mongodb code')

// You can use this method for connecting or the other.

djEcoXP({
    connect: 'Your mongodb code',
    levelsConnect: client,
    defaultXpPerMessage: 23, // The default is 23
    defaultLevelUpMessage: `You are now level ${level} with ${xp} experience!` // You need to use ${level} and ${xp} to tell them their level.
    defaultCoins: 1000 // The default coins value is 0  
})

client.login('Your bot's token')
```

## Options
djEcoXP supports many options that are listed here:

Non-Optional Options:

* connect(client)
* levelsConnect(client)

Optional Options:

* addCoins(userId, coinsToAdd)
* getCoins(userId)
* removeCoins(userId, coinsToRemove)
* getItems(userId)
* addItems(userId, itemsToAdd, itemNumber)
* removeItems(userId, itemsToRemove)
* getLevels(guildId, userId)
* defaultXpPerMessage(value)
* defaultLevelUpMessage(value)
* defaultCoins(value)

# Information

This is in a beta version and may not work as intended.

I make discord bots check one of mine out!






[![Discord Bots](https://top.gg/api/widget/777542064333520946.svg)](https://top.gg/bot/777542064333520946)
