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
  function gamesCategory(){
    if(gamesCommands === null){
      return 'There is no command!';
    }else{
      return gamesCommands;
    }
  }

  function mainCategory(){
    if(generalCommands === null){
      return 'There is no command!';
    }else{
      return generalCommands;
    }
  }


  function getHexColor(){
    let mColor = message.member.displayHexColor;
    if(mColor == null){
      return config.primary;
    }else{
      return mColor;
    }
   }
   let gCommands = (giveawayCommands) ? giveawayCommands : '` Empty category! `'

  let embed = new Discord.MessageEmbed()
    .setTitle(`**MY COMMAND DIRECTORY** ━━━━━`,)
    .setThumbnail(bot.user.displayAvatarURL())
    .setColor(getHexColor())
     .addField(`**GENERAL**`, `${mainCategory()}`, false)
     .addField(`**GAMES**`, `${gamesCategory()}`, true)
     .addField(`**Giveaway**`, `${gCommands}`, true)
     .addField(`**Fun**`, `${funCommands}`, false)
     .addField(`**Admin**`, `${adminCommands}`, true)

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
  name: "commands",
  type: "admin",
  usage: "`commands` or `cmds` or `all`",
  about: "To display command list",
  aliases: ["cmds", 'botcommands', 'all']
};
