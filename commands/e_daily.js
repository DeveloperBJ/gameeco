const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const config = require('../config.json')
const Prefix = config.prefix;

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(Prefix))return;  

  let user = message.author;

  let timeout = 86400000;
  let amount = 250;

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);
  function getHexColor(){
    let mColor = message.member.displayHexColor;
    if(mColor == null){
      return config.primary;
    }else{
      return mColor;
    }
   }
  
  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor(getHexColor())
    .setDescription(`:x: You've already collected your daily points\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor(getHexColor())
  .setDescription(`:white_check_mark: You've collected your daily reward of ${amount} points`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
    name: "daily",
    type: "fun",
    usage: "`daily`",
    about: "Collect your daily rewards!",
    aliases: ["day"]
  };
