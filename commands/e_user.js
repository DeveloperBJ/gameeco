require('dotenv').config();
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)
const db = eco.mongo();

module.exports.run = async (bot, message, args) => {

  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
  var prefix = (!guildPrefix) ? config.prefix : guildPrefix;

    if(!message.content.startsWith(prefix))return;  
    var user = message.mentions.users.first() || message.author;
  
    let money = await eco.fetch(`${user.id}`)
    if (money === null) money = 0;

  
    let vip = await eco.fetch(`account_${user.id}`)
      if(vip === null) vip = '**BRONZE**'
      if(vip === 'diamond') vip = `**DIAMOND**`
      if(vip === 'premium') vip = `**PREMIUM**`
      
  
    let items = await eco.fetch(`items_${user.id}`)
    if(items === null) items = '0'

    function getHexColor(){
        let mColor = message.member.displayHexColor;
        if(mColor == null){
          return botconfig.primary;
        }else{
          return mColor;
        }
       }


    let moneyEmbed = new Discord.MessageEmbed()
    .setColor(getHexColor())
    .setTitle(`${user.username.toUpperCase()}'S PROFILE ━━━━`)
    .addField(`Balance`, `**${money} coins**`, false)
    .addField(`Account`, `${vip}`, true)
    .addField(`Items`, `${items} items claimed.`, true)
    .addField(`Help`, `__${prefix}help__`, true)
    .setThumbnail(`${user.displayAvatarURL()}`)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`);
    message.channel.send(moneyEmbed)
  };

  module.exports.help = {
    name: "user",
    type:"fun",
    usage:"`Profile`",
    about:"To display user's stats & balance.",
    aliases: ["player","member", "profile"],
  
  }
