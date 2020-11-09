require('dotenv').config()
const Discord = require("discord.js");
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    var prefix = (!guildPrefix) ? config.prefix : guildPrefix;

    let wishes = [
        `${message.author.username} wait  m doing....`,
        `${message.author.username} you should wait...`,
        `I'm making your wish card...`,
        `hey gimme sometimmme...`,
        `I'm creating something...`,
        `wait...`
    ]
    let pickWish = Math.floor((Math.random() * wishes.length));
    message.channel.send(wishes[pickWish])
        .then(msg => {
            msg.delete({ timeout: 2000 })
        })
        .catch(console.error);

    if (!message.content.startsWith(prefix)) return;


    var user = message.mentions.users.first() || message.author;

    let jimp = require('jimp');

    let wishCards = [
        `https://i.imgur.com/Gjx2c96.png`,
        `https://i.imgur.com/Gjx2c96.png`,
        `https://i.imgur.com/Gjx2c96.png`,
        'https://i.imgur.com/gynYxTp.png',
        `https://i.imgur.com/Gjx2c96.png`,
        'https://i.imgur.com/O1qn7BF.png',
        'https://i.imgur.com/fy3v5DH.png',
        `https://i.imgur.com/Gjx2c96.png`
    ]

    let pickWishCard = Math.floor((Math.random() * wishCards.length));

    let font = await jimp.loadFont(jimp.FONT_SANS_64_WHITE)
    let welcome = await jimp.read(wishCards[pickWishCard]) //We load the image from that link
    welcome.print(font, 750, 165, `${user.username.toUpperCase()}`)
    welcome.write('birthday.png') //We create a png file called Welcome2
    
    setTimeout(function () { message.channel.send(``, { files: ["birthday.png"] }); }, 1500)
}



module.exports.help = {
    name: "birthday",
    type: "fun",
    usage: "`birthday` or `bday`",
    about: "Make birhday wish card",
    aliases: ["bday", "bwish"]
};