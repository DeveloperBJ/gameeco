
require('dotenv').config()
const Discord = require("discord.js");
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
  var prefix = (!guildPrefix) ? config.prefix : guildPrefix;

  if(!message.content.startsWith(prefix))return; 
  function getHexColor(){
    let mColor = message.member.displayHexColor;
    if(mColor == null){
      return botconfig.primary;
    }else{
      return mColor;
    }
   }
  
  let Logs = ["Hold on...", "Fetching accound details...", "collecting data...", "Here's your account balance..."]
  let RandomLogs = Math.floor((Math.random() * Logs.length));
  let m = await message.channel.send(Logs[RandomLogs])
  var user = message.mentions.users.first() || message.author;
  var bal = await eco.fetch(user.id)

  // If there is no balance, make it to 0
  if(bal == null) var bal = 0

  const account = new Discord.MessageEmbed()
  .setTitle(`${user.username.toUpperCase()}'S ACCOUNT BALANCE ━━━━`)
  .setDescription(`Wallet: **${bal} coins**`)
  .setTimestamp()
  .setFooter(`Requested by ${message.author.tag}`)
  .setColor(getHexColor())
  m.edit(account)
  
};


module.exports.help = {
    name: "balance",
    type:"fun",
    usage:"`bal` or `balance`",
    about:"To display how many coins user have.",
    aliases: ["bal"]
  };
