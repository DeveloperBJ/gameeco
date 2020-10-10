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

    //   ===== if the user dont have perm =======
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(`${config.error_icon} ` + "Only server's `admins` could use this command!")
    }

    function getHexColor() {
        let mColor = message.member.displayHexColor;
        if (mColor == null) {
            return botconfig.primary;
        } else {
            return mColor;
        }
    }
    let change = new Discord.MessageEmbed()
        .setColor(getHexColor())
        .setColor("GREEN")
        .setTitle(`**SETTINGS FOR ${message.guild.name.toUpperCase()} ━━━━**`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`)
        .setDescription('**:white_small_square: To change bot prefix for this guild** \n`' + prefix + 'set prefix <prefix>`' +
            ' \n\n **:white_small_square: To turn on/off geeting messages** \n `' + prefix + 'set greetings off`' +
            '\n\n **:white_small_square: To turn on/off welcome messages** \n `' + prefix + 'set welcome off` ' +
            '\n\n **:white_small_square: To turn on/off guide/tips ** \n `' + prefix + 'set tips on`')


    if (!args[0]) {
        return message.channel.send(change);
    }
    if (args[0] === 'prefix' && args[1] == null) {
        message.channel.send('You have to specify the prefix something like this `' + prefix + 'change prefix f+`')
    }

    if (args[0] === "prefix" && args[1].length > 3) {
        return message.channel.send("You can not set prefix more than 3 characters");

    } else if (args[0] === "prefix" && args[1] === config.prefix) {
        eco.delete(`prefix_${message.guild.id}`)
        return message.channel.send(":white_check_mark: Prefix has reset to default!");
    }

    else if (args[0] === "prefix" && args[1].length < 3) {
        eco.set(`prefix_${message.guild.id}`, args[1])

        let PrefixEmbed = new Discord.MessageEmbed()
            .setColor(getHexColor())
            .setColor("GREEN")
            .setDescription(`:white_check_mark: Prefix has changed to **${args[1]}**`)
        message.channel.send(PrefixEmbed)

    } else if (args[0] === "greetings" && args[1] === "off") {

        eco.set(`greet_${message.guild.id}`, args[1])
        return message.channel.send(`:white_check_mark: Greeting messages has turned **${args[1]}**`)

    } else if (args[0] === 'greetings' && !args[1]) {

        let greetSet = await eco.fetch(`greet_${message.guild.id}`);
        return message.channel.send(` Your greeting settings: **${greetSet}**` + '\n you can change it via `' + prefix + 'change on/off`')

    } else if (args[0] === "greetings" && args[1] === "on") {

        eco.delete(`greet_${message.guild.id}`)
        return message.channel.send(`:white_check_mark: Greeting messages has turned **${args[1]}** `)

    } else if (args[0] === "welcome" && args[1] === "on") {

        return message.channel.send(`This setting currently not availabe!`)

    } else if (args[0] === "welcome" && args[1] === "off") {

        return message.channel.send(`This feature currently not availabe!`)

    } else if (args[0] === "welcome" && args[1] == null) {

        return message.channel.send(`This feature not available!`)

    } else if(args[0] === "tips" && args[1] == null){

        return message.channel.send(`This feature not availble!`)
        
    } else if(args[0] === 'tips' && args=='off'){

        eco.set(`tips_${message.guild.id}`, args[1])
        return message.channel.send(`:white_check_mark: tips has turned **${args[1]}** `)

    }else if(args[0] === 'tips' && args=='on'){

        eco.delete(`tips_${message.guild.id}`)
        return message.channel.send(`:white_check_mark: tips has turned **${args[1]}** `)
        
    }

    // if (args.join("") === config.prefix) {
    //     eco.delete(`prefix_${message.guild.id}`)
    //     return await message.channel.send(":white_check_mark: Prefix has reset to default successfully!");
    // }

}



module.exports.help = {
    name: "set",
    type: "admin",
    usage: "`settings` or `change`",
    about: "Customize the things as per your needs.",
    aliases: ["change", "settings"],

}
