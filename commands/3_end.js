require('dotenv').config()
const ms = require('ms');
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const eco = new Ecobase(process.env.MONGO)

const config = require('../config.json');
const db = eco.mongo()
exports.run = async (bot, message, args) => {

    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
  var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
    if(!message.content.startsWith(prefix))return;  
    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: You don\'t have permission to reroll giveaways.');
    }

    // Giveaway message ID
    let messageID = args[0];
    // If no channel is mentionned
    if(!messageID){
        return message.channel.send(':x: You have to specify a valid channel!');
    }

    try {
        // Edit the giveaway
        bot.giveawaysManager.edit(messageID, {
            setEndTimestamp: Date.now()
        });
        // Success message
        message.channel.send('Giveaway will end in less than '+(bot.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    } catch (error) {
        // If the giveaway isn't found
        if(error.startsWith(`No giveaway found with ID ${messageID}.`)){
            message.channel.send('Cannot find any giveaway for the message ID: '+messageID);
        }
        // If the giveaway is not ended
        if(err.startsWith(`Giveaway with message ID ${messageID} is already ended.`)){
            message.channel.send('That giveaway is already ended!');
        }
    }

};
module.exports.help = {
    name: "end",
    type: "giveaway",
    usage: "`end-giveaway <message_id>`",
    about: "End giveaways!!",
    aliases: ["end-giveaway"]
  };
