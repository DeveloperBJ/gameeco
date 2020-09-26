const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(config.mongo_url)
const db = eco.mongo();
const url = config.url;
const Icon = [
  "",
  "https://i.imgur.com/NyQucPe.png",
  "https://i.imgur.com/BsczYnp.png",
  "https://i.imgur.com/WFRpoGL.png"
];

module.exports.run = async (bot, message, args) => {

  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    if(guildPrefix === null) guildPrefix = config.prefix;

    if(!message.content.startsWith(guildPrefix))return;  
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
      return botconfig.primary;
    }else{
      return mColor;
    }
   }
  let say = message.content.slice(command.length);
  let embed = new Discord.MessageEmbed()
    .setTitle(`${bot.user.username.toUpperCase()}'S COMMAND LIST ━━━━━`,)
    .setDescription(`\n\n To learn how to use a command for example ` + "`" + prefix + "help [command]`")
    .setColor(getHexColor())
    .addField("General commands", generalCommands, false)
    .addField("Games commands", gamesCommands, false)
    .addField("Giveaway commands", giveawayCommands, false)
    .addField("Fun commands", funCommands, false)
    .addField("Other commands", adminCommands, false);
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
  usage: "`commands` or `cmds`",
  about: "To display command list",
  aliases: ["commands"]
};
