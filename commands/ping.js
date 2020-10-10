require(`dotenv`).config()
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)
const db = eco.mongo();

module.exports.run = async (bot, message, args) => {

    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
    if (!message.content.startsWith(prefix)) return;
    function getHexColor() {
        let mColor = message.member.displayHexColor;
        if (mColor == null) {
            return botconfig.primary;
        } else {
            return mColor;
        }
    }
    // ===================== PREMIUM =======================
    if (args[0] == 'premium') {
        const buyer = await eco.fetch(`${message.author.id}`);
        const vip = await eco.fetch(`account_${message.author.id}`);

        // check  if buyer already have premium account
        if (vip === 'premium') {
            return message.reply(`You are already a **premium** member!`);
        }
        // If the buyer have enough coins then purchase the item = true
        if (buyer > 12600) {
            eco.fetch(`items_${message.author.id}`)
            eco.add(`items_${message.author.id}`, 1)
            eco.fetch(`account_${message.author.id}`)
            eco.set(`account_${message.author.id}`, `premium`)
            eco.subtract(`${message.author.id}`, 12600)
            message.reply(`:white_check_mark: Account has been upgraded to **premium** `);
        }
        else {
            var bal = await eco.fetch(message.author.id)

            // If there is no balance, make it to 0
            if (bal == null) var bal = 0;
            return message.reply(`:x: You need more **${12600 - bal} coins** for premium membership !`);
        }
    }
    // ===================== PREMIUM =========================

    // ===================== diamond ===========================
    if (args[0] == 'diamond') {
        const buyer = await eco.fetch(`${message.author.id}`);
        const vip = await eco.fetch(`account_${message.author.id}`);

        // check  if buyer already have premium account
        if (vip === 'diamond') {
            return message.reply(`You are already a **diamond** member!`);
        }
        // If the buyer have enough coins then purchase the item = true
        if (buyer > 46000) {
            eco.fetch(`items_${message.author.id}`)
            eco.add(`items_${message.author.id}`, 1)
            eco.fetch(`account_${message.author.id}`)
            eco.set(`account_${message.author.id}`, 'diamond')
            eco.subtract(`${message.author.id}`, 46000)
            message.reply(`:white_check_mark: Account has been upgraded to **Diamond** `);
        }
        else {
            var bal = await eco.fetch(message.author.id)

            // If there is no balance, make it to 0
            if (bal == null) var bal = 0;
            return message.reply(`:x: You need more **${46000 - bal} coins** for diamond membership!`);
        }
    }
    // ===================== diamond ==============================

    // ===================== Steam ===========================
    if (args[0] == 'steam') {
        const buyer = await eco.fetch(`${message.author.id}`);
        // If the buyer have enough coins then purchase the item = true
        if (buyer > 9600) {
            // eco.fetch(`items_${message.author.id}`)
            // eco.add(`items_${message.author.id}`, 1)
            // eco.subtract(`${message.author.id}`, 9600)
            message.reply(`:white_check_mark: No items available `);
        } else {
            return message.reply(":x: You don't have enough coins to make a purchase!");
        }
    }
    // ===================== steam ==============================


}

module.exports.help = {
    name: "buy",
    type: "fun",
    usage: "`buy [itemname]` example: `buy premium`",
    about: "Make a purchase on the store!",
    aliases: ["purchase"],

}
