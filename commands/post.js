require('dotenv').config()
const Discord = require("discord.js");
const ms = require("parse-ms");
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

  const p = await message.channel.send("Creating.....")
  function getHexColor() {
    let mColor = message.member.displayHexColor;
    if (mColor == null) {
      return config.primary;
    } else {
      return mColor;
    }
  }

  let Logs = ["Yay...created!", "Hold on...buddies", "Beep beep...", "ahaha..."]
  let RandomLogs = Math.floor((Math.random() * Logs.length));
  // if (message.content.startsWith(tagCmd)) {
  const splitArgs = tagCmd.split(' ');
  const tagName = splitArgs.shift();
  const tagDescription = splitArgs.join(' ');


  function getImageUrl() {
    let imgURL = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;
    if (args[0] == null) {
      return console.log('url not found');
    } else if (imgURL.test(args[0])) {
      return post.setImage(tagName);
    }
    else {
      return console.log('something went wrong');
    }
  }
  const post = new Discord.MessageEmbed()
    .setColor(getHexColor())
    .setDescription(tagDescription)
    getImageUrl()
  setTimeout(function () { p.edit(Logs[RandomLogs]), p.edit(post) }, 2200)
  message.delete()


  // if(isImage) return message.reply('Invalid image url?');


};

module.exports.help = {
  name: "post",
  type: "general",
  usage: "post <image_url> <post_content>",
  about: "To make a emebed with image through the bot",
  aliases: [""]
}