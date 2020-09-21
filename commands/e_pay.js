require('dotenv').config()
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)

const db = eco.mongo();

module.exports.run = async (bot, message, args) => {
  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
    if(!message.content.startsWith(prefix))return;   
  
  if(message.author.bot) return;
  const  sender = await eco.fetch(`${message.author.id}`)
  const user = message.mentions.users.first();
  
  if(!user){
      return message.reply(`You have to mention someone!`)
  }

  if (!args[1]) {
    return message.reply('Please specify the amount!')
}
if (message.content.includes('-')) { 
    return message.reply(`Something went wrong! Don't include` + ' `-` symbol!')
}
if (sender < args[1]) {
    return message.channel.send(`You don't have enough coins to pay someone!`)
}

  function getHexColor(){
    let mColor = message.member.displayHexColor;
    if(mColor == null){
      return botconfig.primary;
    }else{
      return mColor;
    }
   }
  let pong = new Discord.MessageEmbed()
//   .setTitle("🏓 Pong!")
  .setColor(getHexColor())
  .setTimestamp()
  .setDescription(`:white_check_mark: You have sent ${args[1]} coins to  ${user.username} `)
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
  message.channel.send(pong)
  eco.add(user.id, args[1])
  eco.subtract(message.author.id, args[1]);
}

module.exports.help = {
  name: "pay",
  type:"fun",
  usage:"`pay <amount>`",
  about:"Pay/donate coins to someone!",
  aliases: ["send"],
}
