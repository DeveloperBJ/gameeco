require('dotenv').config()

const Discord = require('discord.js');
const request = require('request');
const entities = require('entities');
const logger = require('./log');
const validUrl = require('valid-url');
const fs = require("fs");
const bot = new Discord.Client();
const client = bot;

const { Ecobase } = require('mongo.eco')
const config = require('./config.json');
const eco = new Ecobase(process.env.MONGO)

bot.config = config;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#fa1675",
        reaction: "🔥"
    }
});

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
      console.log("Couldn't find commands.");
      return;
    }
  
  
    jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
  
      });
    });
  })
  bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    bot.user.setStatus('dnd');
    const activities_list = [
        config.prefix +'prefix',
        config.prefix + 'help',
        config.prefix + 'commands',
        "gg.gg/trexbot"
    ];
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1
        bot.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
      }, 10000); 
  
    bot.on("message", async message => {
      if(!message.guild) return;
      const db = eco.mongo;

      const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
      var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
      
      if (message.author.bot) return;
      if (message.channel.type === "dm") return;
      let messageArray = message.content.split(" ");
      let args = message.content.slice(prefix.length).trim().split(/ +/g);
      let cmd = args.shift().toLowerCase();
      let commandfile;
  
      if (bot.commands.has(cmd)) {
        commandfile = bot.commands.get(cmd);
      } else if (bot.aliases.has(cmd)) {
        commandfile = bot.commands.get(bot.aliases.get(cmd));
      }
  
      if (!message.content.startsWith(prefix)) return;
  
  
      try {
        commandfile.run(bot, message, args);
  
      } catch (e) {
      }
    }
    )
  })



let botReady = false;
let lastTimestamp = Math.floor(Date.now() / 1000);

let Guild;
let Channel;
bot.on('ready', () => {
    // bot.user.setStatus('online', `Spamming F5 on /r/${process.env.SUBREDDIT}`).then(logger.info('Changed status!')).catch('ready failed to change status', logger.error); // if you want to change the status of the bot and set the game playing to something specific you may uncomment this

    Guild = bot.guilds.cache.get(config.Server_ID);
    if (Guild) {
        Channel = Guild.channels.cache.get(config.Channel_ID);
    }

    if (!Channel) {
        logger.error('A matching channel could not be found. Please check your DISCORD_SERVERID and DISCORD_CHANNELID environment variables.');
        process.exit(1);
    } else {
        logger.info('Ready');
        botReady = true;
    }
});

bot.on('error', (error) => {
    logger.error('Connection error', error);
    botReady = false;
});

bot.on('reconnecting', () => {
    logger.debug('Reconnecting');
});


function onExit(error) {
    logger.info('Logging out before exiting');
    bot.destroy();


    if (error) {
        logger.error('Unknown error during logout', error);
        process.exit(-1);
    } else {
        logger.info('Logout success');
        process.exit(0);
    }
};

bot.login(process.env.TOKEN)

process.on('SIGINT', onExit);
process.on('SIGTERM', onExit);
process.on('uncaughtException', onExit);

