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
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
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
    config.prefix + 'prefix',
    config.prefix + 'help',
    config.prefix + 'commands'
  ];
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1
    bot.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
  }, 10000);

  bot.on("message", async message => {
    if (!message.guild) return;
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

  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
  var prefix = (!guildPrefix) ? config.prefix : guildPrefix;

  if (message.content === config.prefix + 'prefix') {

    let pe = new Discord.MessageEmbed()
      .addField(`Current Prefix`, '` ' + prefix + ' `', true)
      .addField(`For Custom Prefix`, '`' + prefix + 'set prefix [prefix]`', true)
      .setColor("GREEN")
    return message.channel.send(pe);

  }

  let greetSet = await eco.fetch(`greet_${message.guild.id}`);
  // ==== if null then settings turned on ====
  if (greetSet) return;

  let Logs = [
    "...that was funny?",
    "...xD", "..cool!", "...noice!", "damn cool!",
    "...lol", "ahaha..", "Owo....", "...ahaha",
    "...is that joke?", "...how many lol xD.",
    `${message.author.username} nice try!`, `${message.author.username} ...lul`
  ];
  let RandomLogs = Math.floor((Math.random() * Logs.length));

  if (message.content.startsWith('xD')) {
    await message.channel.send(Logs[RandomLogs]);
  }

  if (message.content.startsWith('lol')) {
    await message.channel.send(Logs[RandomLogs]);
  }

  if (message.content.startsWith('lmao')) {
    await message.channel.send(Logs[RandomLogs]);
  }

  if (message.content.startsWith('LOL')) {
    await message.channel.send(Logs[RandomLogs]);
  }

  if (message.content.startsWith('Noice')) {
    await message.channel.send(Logs[RandomLogs]);
  }

  /*
   ========= good morning greetings =====

   */
  let gms = [
    "...good morning peeps!",
    "ahaha....morining pros",
    "...very happy good morning!",
    "ahaha..GM",
    "Owo....GM",
    "...ahaha...gm",
    `${message.author.username} ...morning`,
    `${message.author.username}.. good morning boi`
  ];
  let randomGms = Math.floor((Math.random() * gms.length));

  if (message.content.startsWith('good morning')) {
    await message.channel.send(gms[randomGms]);
  }

  if (message.content.startsWith('Good morning')) {
    await message.channel.send(gms[randomGms]);
  }

  if (message.content.startsWith('Morning')) {
    await message.channel.send(gms[randomGms]);
  }

  /*

  ======== Good Night Greetings =======

  */
  let gns = [
    `${message.author.username} ...good night mate!`,
    `...Yay..good night`,
    `${message.author.username} gn boi..`,
    'ahahaa...good night',
    '-__- gotta go?...good night',
    'Zzzzz..gn',
    `sleepy time?..gn`,
    '...Owo ...good night'
  ];
  let randomGns = Math.floor((Math.random() * gns.length));

  if (message.content.startsWith('Good night')) {
    await message.channel.send(gns[randomGns]);
  }

  if (message.content.startsWith('good night')) {
    await message.channel.send(gns[randomGns]);
  }

  if (message.content.startsWith('Good Night')) {
    await message.channel.send(gns[randomGns]);
  }
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  // ====== Fortrex =====
  if (message.mentions.has(bot.user)) {
    let greets = [
      `..hi this is ${bot.user.username}`,
      'hold on...',
      `Im loading...`,
      `**${message.author.username}**, you should wait...`];
    let randomGreets = Math.floor((Math.random() * greets.length));

    let m = await message.channel.send(`${greets[randomGreets]}`);
    const mbed = new Discord.MessageEmbed()
      .setTitle(`**${bot.user.username.toUpperCase()}'s BIO & STATS**`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(`\n You can set custom prefix for this guild **${prefix}settings** \n`)
      .addField(`Username`, `**${bot.user.tag}**`, true)
      .addField(`Bot Prefix`, `**${prefix}**`, true)
      .addField(`Commands`, `**${prefix}all**`, true)

      .addField(`Litency`, `**${Math.round(bot.ws.ping)}ms**`, true)
      .addField(`Library`, `**d.js v${Discord.version}**`, true)
      .addField(`Creator`, `**Biswa#5500**`, true)

      .addField(`Help`, `**${prefix}help**`, true)
      .addField(`Invite`, `[Invite Me](${process.env.Invite})`, true)
      .addField(`Docs`, `[Documentation](${process.env.Link})`, true)
    setTimeout(() => { m.edit(mbed) }, 1500);
  }

})

bot.login(process.env.TOKEN);

