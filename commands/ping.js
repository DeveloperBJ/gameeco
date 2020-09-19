const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  let prefix = config.prefix;
  
  if(!message.content.startsWith(prefix)) return;
  
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
  .addField("API Latency", `${Math.round(bot.ws.ping)}ms`, true)
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
  m.edit(pong)
}

module.exports.help = {
  name: "ping",
  type:"fun",
  usage:"`Ping`",
  about:"Ping pong command ...xD",
  aliases: [""],

}
