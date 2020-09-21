require('dotenv').config()
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const eco = new Ecobase(process.env.MONGO)

const config = require('../config.json');
const db = eco.mongo();

module.exports.run = async (bot, message, args) => {
  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
      var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
    if(!message.content.startsWith(prefix))return;  
  
  if(message.author.bot) return;
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send( `${config.error_icon} ` + "Only server's `admins` could use this command!")
  }
  if(!args[0]) {
    return message.channel.send("Please give the prefix that you want to set.");
  }

  if(args[0].length > 3) {
    return message.channel.send("You can not set prefix more than 3 characters");
  }

  if(args.join("") === config.prefix) {
    eco.delete(`prefix_${message.guild.id}`)
   return await message.channel.send(":white_check_mark: Prefix has reset to default successfully!");
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
  .setColor(getHexColor())
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Prefix has changed successfully to **${args[0]}**`)
  message.channel.send(pong)
  eco.set(`prefix_${message.guild.id}`, args[0])
}

module.exports.help = {
  name: "prefix",
  type:"admin",
  usage:"`prefix <custom_prefix> `",
  about:"Ping pong command ...xD",
  aliases: [""],

}
