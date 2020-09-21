require('dotenv').config()
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const eco = new Ecobase(process.env.MONGO)

const config = require('../config.json');
const db = eco.mongo();

module.exports.run = async (bot, message, args) => {
  
  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
      var prefix = (!guildPrefix) ? config.prefix : guildPrefix;

   if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  const user = message.mentions.users.first();
  const m = await message.channel.send("Hold on .....")
  function getHexColor(){
    let mColor = message.member.displayHexColor;
    if(mColor == null){
      return botconfig.primary;
    }else{
      return mColor;
    }
   }
  let pong = new Discord.MessageEmbed()
  .setTitle("🏓 Pong!")
  .setColor(getHexColor())
  .setTimestamp()
  .addField("Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("API Latency", `${Math.round(bot.ws.ping)}ms `, true)
  .setFooter(`Requested by ${message.author.tag}`);
  m.edit(pong)
}

module.exports.help = {
  name: "ping",
  type:"fun",
  usage:"`Ping`",
  about:"Ping pong command ...xD",
  aliases: [""],

}
