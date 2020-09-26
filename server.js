require('dotenv').config()

const Discord = require('discord.js');
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
        config.prefix +'set prefix',
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

  bot.on("message", async message => {
    let greetSet = await eco.fetch(`greet_${message.guild.id}`);
    // ==== if null then settings turned on ====
    if(greetSet) return;

    let Logs = ["...that was funny?", "...xD", "...lol", "ahaha..", "Owo....", "...ahaha"];
    let RandomLogs = Math.floor((Math.random() * Logs.length));
    
    if(message.content.startsWith('xD')){
      await message.channel.send(Logs[RandomLogs]);
    }
    
    if(message.content.startsWith('lol')){
      await message.channel.send(Logs[RandomLogs]);
    }

    if(message.content.startsWith('lmao')){
      await message.channel.send(Logs[RandomLogs]);
    }

    /*
     ========= good morning greetings =====

     */
    let gms = ["...good morning peeps!", "ahaha....morining pros", "...very happy good morning!", "ahaha..GM", "Owo....GM", "...ahaha"];
    let randomGms = Math.floor((Math.random() * gms.length));

    if(message.content.startsWith('good morning')){
      await message.channel.send(gms[randomGms]);
    }

    if(message.content.startsWith('Good morning')){
      await message.channel.send(gms[randomGms]);
    }

    if(message.content.startsWith('Morning')){
      await message.channel.send(gms[randomGms]);
    }

    /*

    ======== Good Night Greetings =======

    */
   let gns = ['....good night', 'ahahaa...good night', '...good night pros', '...Owo ...good night'];
   let randomGns = Math.floor((Math.random() * gns.length));

   if(message.content.startsWith('Good night')){
    await message.channel.send(gns[randomGns]);
   }

   if(message.content.startsWith('good night')){
    await message.channel.send(gns[randomGns]);
   }

   if(message.content.startsWith('Good Night')){
    await message.channel.send(gns[randomGns]);
   }



  })

/// Bot Token
// bot.login(config.Token);

bot.login(process.env.TOKEN)

