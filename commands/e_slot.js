require('dotenv').config()
const slotItems = [":tennis:", ":softball:", ":baseball:", ":soccer:", ":basketball:", ":volleyball:"];
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)

const db = eco.mongo();

module.exports.run = async (bot, message, args) => {

    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    if(guildPrefix === null) guildPrefix = config.prefix;
    if(!message.content.startsWith(guildPrefix))return;  
    function getHexColor(){
        let mColor = message.member.displayHexColor;
        if(mColor == null){
          return botconfig.primary;
        }else{
          return mColor;
        }
       }


    let user = message.author;
    let moneydb = await eco.fetch(`${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`${config.error_icon} You are betting more than you have!`);

    let moneyhelp = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`${config.error_icon} Specify an amount`);

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYay! You won ${money} coins`)
            .setColor(getHexColor())
        message.channel.send(slotsEmbed1)
        eco.add(`${message.author.id}`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n ${config.error_icon} You have lost ${money} coins by betting!`)
            .setColor(getHexColor())
        message.channel.send(slotsEmbed)
        eco.subtract(`${message.author.id}`, money)
    }

}
module.exports.help = {
    name: "slot",
    type:"games",
    usage:"`slot <amount>`",
    about:"Collect coins by playing slot game",
    aliases: ["sl"],
  
  }
