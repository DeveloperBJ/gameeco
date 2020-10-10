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
    let user = message.author;

    let author = eco.fetch(`${message.author.id}`)


    // LIST OF ITEMS
    let item1 = 'premium'; let item2 = 'diamond'; let item3 = 'steam';
if(!args[0]){
    let storeEmbed = new Discord.MessageEmbed()
    .setTitle(`**${bot.user.username.toUpperCase()}'S STORE** ━━━━`)
    .setDescription(`To purchase an item **${prefix}buy [name]**`)
    .addField(`Name`, item1, true)
    .addField(`About`,`Upgrade & get extra perks!`, true)
    .addField(`Cost`,`12600 Coins`, true)

    .addField(`Name`, item2, true)
    .addField(`About`,`Make custom commands!`, true)
    .addField(`Cost`,`46000 Coins`, true)

    .addField(`Name`, item3, true)
    .addField(`About`,`Get random steam code`, true)
    .addField(`Cost`,`29600 Coins`, true)
    // .addField(`3.Game Code`, `cost: 11500 coins`, true)

    message.channel.send(storeEmbed);
}
if(args[0] === item1){
  let mm = new Discord.MessageEmbed()
  .setTitle(`**${item1.toUpperCase()} WILL UNLOCKS** ━━━━`)
  .setDescription(`**+ 300 Coins Daily Rewards** \n **+ 800 Coins Weekly Rewards** \n **+ 30% Win Possibility in slot`)

  await message.channel.send(mm);
}

if(args[0] === item2){
  let mm = new Discord.MessageEmbed()
  .setTitle(`**${item2.toUpperCase()} WILL UNLOCKS** ━━━━`)
  .setDescription(`**+ 500 Coins Daily Rewards** \n **+ 1500 Coins Weekly Rewards** \n **+ 50% Win Possibility in Slot** \n **+ Make custom Commands**`)

  await message.channel.send(mm);
}

if(args[0] === item3){
  let mm = new Discord.MessageEmbed()
  .setTitle(`**${item3.toUpperCase()} ** ━━━━`)
  .setDescription(`** *100% Real Steam Code** \n ** *Random But 100% Working ** `)

  await message.channel.send(mm);
}

}
module.exports.help = {
    name: "store",
    type:"fun",
    usage:"`store` or  `shop` or `market`",
    about:"Use the command to display store items!",
    aliases: ["market"],
  
  }
