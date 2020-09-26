require('dotenv').config()
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const ms = require('parse-ms');
const eco = new Ecobase(process.env.MONGO)
const db = eco.mongo();
module.exports.run = async (bot, message, args) => {
  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
  var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
  if (!message.content.startsWith(prefix)) return;

  // let command = prefix + module.exports.help.name + 1;
  // let msg = message.content.slice(command.length);
  function getHexColor() {
    let mColor = message.member.displayHexColor;
    if (mColor == null) {
      return config.primary;
    } else {
      return mColor;
    }
  }
  var cmdName = args[1];
  bot.commands.forEach(command => {
    if (args[0] === command.help.name) {
      var embed = new Discord.MessageEmbed()
        .setTitle(`** ABOUT ${command.help.name.toUpperCase()} ━━━━**`)
        .setColor(getHexColor())
        .setDescription(`**Usage:** ${command.help.usage}\n**Description:** ${command.help.about}`);
      message.channel.send(embed);
    }
  });

  if (msg === "") {
    let embed = new Discord.MessageEmbed()
      .setColor(getHexColor())
      .addField(`Learn how to use a command ━━`, `1. ` + "To display command list - `" + prefix + "commands` \n " + "2. Learn more about a command - `" + prefix + "help [command_name]`")
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  type: "admin",
  usage: "help <command_name>",
  about: "Learn about a command",
  aliases: ["learn", 'wiki', 'about']
};
