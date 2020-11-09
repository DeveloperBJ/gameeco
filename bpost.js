require('dotenv').config()
const Discord = require("discord.js");
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)

module.exports.run = async (client, message, args) => {

  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
  var prefix = (!guildPrefix) ? config.prefix : guildPrefix;

    if (message.author.bot) return;
    let cmd = prefix + module.exports.help.name + 1;
    let tagCmd = message.content.slice(cmd.length);
    if (!message.content.startsWith(prefix)) return;

    const p = await message.channel.send("Hold on .....")
    function getHexColor(){
        let mColor = message.member.displayHexColor;
        if(mColor == null){
          return config.primary;
        }else{
          return mColor;
        }
       }

    // if (message.content.startsWith(tagCmd)) {
    const splitArgs = tagCmd.split(' ');
    const tagName = splitArgs.shift();
    const isImage = tagName.endsWith('.jpg') || tagName.endsWith('.png');
    const tagDescription = splitArgs.join(' ');
    const post = new Discord.MessageEmbed()
        .setColor(getHexColor())
        .setImage(tagName)
        .setDescription(tagDescription)
    p.edit(post);
    message.delete();
    // if(isImage) return message.reply('Invalid image url?');
    

};

module.exports.help = {
    name: "bpost",
    type: "general",
    usage:"post <image_url> <post_content>",
    about: "To make a emebed with image through the bot",
    aliases: ["bp"]
}