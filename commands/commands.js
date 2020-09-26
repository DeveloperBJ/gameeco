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
  let command = prefix + module.exports.help.name + 1;
  var generalCommands = "";
  var gamesCommands = "";
  var funCommands = "";
  var giveawayCommands = "";
  var adminCommands = "";
  bot.commands.forEach(command => {
    switch (command.help.type) {
      case "general":
        generalCommands += "`" + command.help.name + "`" + " ";
        break;
      case "games":
        gamesCommands += "`" + command.help.name + "`" + " ";
        break;

      case "fun":
        funCommands += "`" + command.help.name + "`" + " ";
        break;
        case "giveaway":
        giveawayCommands += "`" + command.help.name + "`" + " ";
        break;

      case "admin":
        adminCommands += "`" + command.help.name + "`" + " ";
        break;

      // ignore hidden commands :^)
    }
  });
  function getHexColor(){
    let mColor = message.member.displayHexColor;
    if(mColor == null){
      return config.primary;
    }else{
      return mColor;
    }
   }

  let embed = new Discord.MessageEmbed()
    .setTitle(`${bot.user.username.toUpperCase()}'S COMMAND LIST ━━━━━`,)
    .setColor(getHexColor())
    .setDescription( ` To learn how to use a command for example ` + "`f!help [command_name]` For more settings & customization - `f!set`"+
      '\n\n:white_small_square: **Some general and useful commands** \n'+
    generalCommands +
    '\n\n :white_small_square: **Play games earn coins; commands** \n' +
    gamesCommands +
    '\n\n :white_small_square: **Do giveaway by these commands** \n' +
    giveawayCommands +
    '\n\n :white_small_square: **Some fun and economy commands** \n' +
    funCommands +
    '\n\n :white_small_square: **Some admin and useless commands** \n' +
     adminCommands +
    '\n\n :white_small_square: **For custom bot prefix for this guild** \n' +
     '`f!set prefix <prefix>`')
     .setFooter(`Requested by ${message.author.tag}`)
     .setTimestamp()
  message.channel.startTyping();
  setTimeout(() => {
    message.channel.send(embed).then(message => {
      message.channel.stopTyping();
    });
  }, 2000);
};

module.exports.help = {
  name: "cmds",
  type: "general",
  usage: "`commands` or `cmds` or `all`",
  about: "To display command list",
  aliases: ["commands", 'botcommands', 'all']
};
