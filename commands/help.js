const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const ms = require('parse-ms');
const eco = new Ecobase(config.mongo_url)

const db = eco.mongo();
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
  let msg = message.content.slice(command.length);

  var cmdName = args[1];
  bot.commands.forEach(command => {
    if (msg === command.help.name) {
      var embed = new Discord.MessageEmbed()
        .setColor(getHexColor())
        .setDescription(`**Usage:** ${command.help.usage}\n**Description:** ${command.help.about}`);
      message.channel.send(embed);
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
  if (msg === "") {
    let embed = new Discord.MessageEmbed()
      .setColor(getHexColor())
      .addField(`Learn how to use a command ━━`, `1. ` + "To display command list - `"+ guildPrefix + "commands` \n " + "2. Learn more about a command - `"+ guildPrefix + "help [command_name]`")
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  type:"admin",
  usage:"help <command_name>",
  about:"Learn about a command",
  aliases: [""]
};
