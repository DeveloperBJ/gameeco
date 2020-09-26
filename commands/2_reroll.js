
const ms = require('ms');
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(config.mongo_url)
const db = eco.mongo()
exports.run = async (bot, message, args) => {
    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    if(guildPrefix === null) guildPrefix = config.prefix;
    if(!message.content.startsWith(guildPrefix))return;  
    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: You need to have the manage messages permissions to reroll giveaways.');
    }

    // Giveaway message ID
    let messageID = args[0];
    // If no channel is mentionned
    if(!messageID){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    try {
        // Reroll the giveaway
        bot.giveawaysManager.reroll(messageID);
        // Success message
        message.channel.send('Giveaway rerolled!');
    } catch (error) {
        // If the giveaway isn't found
        if(error.startsWith(`No giveaway found with ID ${messageID}.`)){
            message.channel.send('Cannot find any giveaway for the message ID: '+messageID);
        }
        // If the giveaway is not ended
        if(err.startsWith(`Giveaway with message ID ${messageID} is not ended.`)){
            message.channel.send('This giveaway is not ended!');
        }
    }

};
module.exports.help = {
    name: "reroll-giveaway",
    type: "giveaway",
    usage: "`reroll-giveaway <message_id>`",
    about: "Reroll giveaways!",
    aliases: [""]
  };
