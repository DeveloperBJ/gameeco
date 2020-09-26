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
      return post.setTitle(`**Please add some content**`);
    } else if (imgURL.test(args[0])) {
      return post.setImage(tagName);
    }
    else {
      return console.log('----> plain post detected');
    }
  }

  let imgURL = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;
  let isNotImg = imgURL.test(tagName) ? console.log('--->image url detected') : tagName;

  function getPostContent() {
    if (tagName !== null && imgURL.test(tagName)) {

      return post.setDescription(tagDescription);

    } else if (tagName !== null && imgURL.test(tagName) !== true) {

      return post.setDescription(`${tagName} ${tagDescription}`);

    } else {

      return post.setDescription('**Error:** something went wong!')
    }
  }
  const post = new Discord.MessageEmbed()
    .setColor(getHexColor())
    .setDescription(`${isNotImg} ${tagDescription}`)
  getImageUrl()
  getPostContent()
  setTimeout(function () { p.edit(Logs[RandomLogs]), p.edit(post) }, 2200)
  message.delete();


  // if(isImage) return message.reply('Invalid image url?');


};

module.exports.help = {
  name: "post",
  type: "general",
  usage: "post <image_url> <post_content>",
  about: "To make a emebed with image through the bot",
  aliases: [""]
}
