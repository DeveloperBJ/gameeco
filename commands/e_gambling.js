const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)

module.exports.run = async (bot, message, args) => {
    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
      if(!message.content.startsWith(prefix))return;   

  let user = message.author;

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
    
let colour = args[0];
let money = parseInt(args[1]);
let moneydb = await eco.fetch(`${user.id}`)

let random = Math.floor(Math.random() * 37);

let moneyhelp = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`:x: you have to Specify the amount! | __${prefix}gamble <color> <amount>__`);

let moneymore = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`:x: You are betting more than you have`);

let colorbad = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`:x: Specify a color | Red [1.5x] Blue [2x] Green [15x]`);


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(moneyhelp); 
    if (money > moneydb) return message.channel.send(moneymore);
    
    if (colour == "b" || colour.includes("blue")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        money *= 10
        eco.add(`${user.id}`, money)
        let moneyEmbed1 = new Discord.MessageEmbed()
        .setColor("#19fc52")
        .setDescription(`*:white_check_mark: You won **${money} coins** on Green \n Multiplier: 10x`);
        message.channel.send(moneyEmbed1)
        console.log(`${message.author.tag} Won ${money} on green`)
    } else if (isOdd(random) && colour == 1) { // Red
        money = parseInt(money * 2)
        eco.add(`${user.id}`, money)
        let moneyEmbed2 = new Discord.MessageEmbed()
        .setColor("#ff0011")
        .setDescription(`:white_check_mark: You have won **${money} coins** on Red \n Multiplier: 2x`);
        message.channel.send(moneyEmbed2)
    } else if (!isOdd(random) && colour == 0) { // Blue
        money = parseInt(money * 2)
        eco.add(`${user.id}`, money)
        let moneyEmbed3 = new Discord.MessageEmbed()
        .setColor("#33adff")
        .setDescription(`:white_check_mark: Yay! You have won **${money} coins** on Blue \n Multiplier: 5x`);
        message.channel.send(moneyEmbed3)
    } else { // Wrong
        eco.subtract(`${user.id}`, money)
        let moneyEmbed4 = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`:x: You have lost ${money} coins in **Multiplier: 0x**`);
        message.channel.send(moneyEmbed4)
    }
}

  
module.exports.help = {
    name: "gamble",
    type:"games",
    usage:"`gamble <color_name> <amount>`",
    about:"Collect coins by playing slot game [color_names: red blue green]",
    aliases: ["roul"],
 
  }
