require('dotenv').config()
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)
const db = eco.mongo();

module.exports.run = async (bot, message, args) => {

    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    if(guildPrefix === null) guildPrefix = config.prefix;

    if(!message.content.startsWith(guildPrefix))return;  
    let user = message.author;

    let author = eco.fetch(`${message.author.id}`)

    let storeEmbed = new Discord.MessageEmbed()
    .setTitle(`**${bot.user.username.toUpperCase()}**'S STORE -----`)
    .addField(`1.Game Coupon`, `cost: 9600 coins`, true)
    .addField(`2.GTA 5`,`cost: 9600 coins`, true)
    .addField(`3.PayDay 2`, `cost: 11500 coins`, true)

    message.channel.send(storeEmbed);

}
module.exports.help = {
    name: "store",
    type:"fun",
    usage:"`store` or  `shop` or `market`",
    about:"Use the command to display store items!",
    aliases: ["market"],
  
  }
