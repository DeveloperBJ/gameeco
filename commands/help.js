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

  if (!args[0]) {
    let embed = new Discord.MessageEmbed()
      .setColor(getHexColor())
      .setDescription(`**HELP CENTER** ━━ \n`)
      .setThumbnail(bot.user.displayAvatarURL())
       .addField(`Commands`, `__${prefix}all__`, true)
       .addField(`Info`, `__${prefix}info <command>__`, true)
       .addField(`Settings`, `__${prefix}settings__`, true)
       .addField(`Docs`, `[Documentation](${process.env.Link})`, true)
       .addField(`Report`, `[Repot a bug](${process.env.report})`, true)
       .addField(`Feedback`, `__${prefix}feedback__`, true)
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  type: "admin",
  usage: "help <command_name>",
  about: "Learn about a command",
  aliases: ["learn", 'info','wiki', 'support','about']
};
