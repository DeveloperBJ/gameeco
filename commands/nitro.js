require('dotenv').config()
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const eco = new Ecobase(process.env.MONGO)
const config = require('../config.json');
const db = eco.mongo();

module.exports.run = async (bot, message, args) => {
    
    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    var prefix = (!guildPrefix) ? config.prefix : guildPrefix;

    if (!message.content.startsWith(prefix)) return;
    let hasPerm = (message.guild.me.hasPermission("ADMINISTRATOR"));
    if(!hasPerm){
        return message.channel.send(`:/ I need `/`administrator`/` permission for this action! `)
    }
    let cmd = prefix + module.exports.help.name + 1;
    let Addmsg = message.content.slice(cmd.length);
    const splitArgs = Addmsg.split(' ');
    const emote = splitArgs.shift();
    const emotDesc= splitArgs.join(' ');
    const channel = bot.channels.cache.get(message.channel.id);
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first();
    if(!webhook) {
        channel.createWebhook(`${bot.user.username} Nitro Hook`, {
            reason: 'For Animated Emoji' ,
        }).then(webhook => console.log(`Created webhook ${webhook}`)).catch(console.error);
    }
    let nickName = message.guild.members.cache.get(message.author.id).displayName;
    function getUsersName(){
        if(!nickName){
            return message.author.username;
        }else{
            return nickName;
        }
    }
    var bean = bot.emojis.cache.find(emoji => emoji.name == emote);
    if(!bean){
        return message.reply(`There is no animated emoji named `/`${emote}`/` \n I think you should uplaod some animated emoji: __server-settings>emojis__ `)
    }
	try {
    message.delete();
		const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
        
    var bean = bot.emojis.cache.find(emoji => emoji.name == emote);
		await webhook.send(`<a:${bean.name}:${bean.id}> ${emotDesc}`, {
			username: getUsersName(),
			avatarURL: message.author.displayAvatarURL()
      
		});
	} catch (error) {
		console.error('Error trying to send: ', error);
	}
    message.delete();
};

module.exports.help = {

    name: "a",
    type: "fun",
    usage: `a`,
    about: "To use animated emojis",
    aliases: [""]
};
