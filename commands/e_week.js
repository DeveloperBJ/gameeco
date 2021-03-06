require('dotenv').config()
const Discord = require("discord.js");
const ms = require("parse-ms");
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)


module.exports.run = async (client, message, args) => {
    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
  if(!message.content.startsWith(prefix))return;  

 // First send a message
let m = await message.channel.send('collecting...')

// Then setup the timeout in ms. 300000ms = 5 Mintes
let timeout = 6.048e+8

// Define eco.mongo as db
const db = eco.mongo()

// Fetch the time of last Beg...
let lastBeg = await db.fetch(`lastWeekly_${message.author.id}`)

// Then setup the amount to give after beg...
let amount = Math.floor(Math.random() * 800)

// If the user already claimed his beg
if (lastBeg !== null && timeout - (Date.now() - lastBeg) > 0) {
    let time = ms(timeout - (Date.now() - lastBeg));
m.edit(":x: **You've already collected your weekly rewards**" + `\nClaim again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`)
}

// If the user did not begged in 5 minutes...
else{
m.edit(`:white_check_mark: You've just collected  **${amount} coins**`)

// Then add the amount to user's account...
eco.add(message.author.id, amount)

// Then set the cooldown...
db.set(`lastWeekly_${message.author.id}`, Date.now())

}
  
};


module.exports.help = {
    name: "weekly",
    type:"fun",
    usage:"`weekly`",
    about:"To collect weekly rewards!",
    aliases: ["week", "7days"]
  };