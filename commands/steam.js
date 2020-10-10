require('dotenv').config();
const Discord = require("discord.js");
const cheerio = require("cheerio");
const axios = require("axios");
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)

const db = eco.mongo();
module.exports.run = async (bot, message, args) => {
  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
  var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
  // if (!message.content.startsWith(prefix)) return;
  if (!args[0]) {
    console.log('Please specify the game, like this `'+ prefix +'steam dota 2`')
  }

  let conName = prefix + module.exports.help.name + 1;

  let gameName = message.content.slice(conName.length);
  axios
    .get(`https://steamcharts.com/search/?q=${gameName}`)
    .then(response => {
      const loadData = cheerio.load(response.data);
      const SteamContainer = loadData("table.common-table tbody tr");
      for (let i = 0; i < 1; i++) {
        const ItemCon = loadData(SteamContainer[i]).find("td.left a")[0];
        const curPlaying = loadData(SteamContainer[i]).find("td.right.num")[0];
        const ItemIcon = loadData(SteamContainer[i]).find("td img")[0];
        if(ItemIcon === null || !ItemIcon ){
          message.channel.send(`**Rip:** No result found!`)
        }
        if (ItemIcon) {
          const gameTitle = loadData(ItemCon).text();
          const currentPlyers = loadData(curPlaying).text();
          const AppLink = loadData(ItemCon).attr("href");
          const AppIcon = loadData(ItemIcon).attr("src");
          const getLink = AppLink.slice(5);
          const getAppIcon = `https://steamcharts.com${AppIcon}`;
          const gameLink = `https://store.steampowered.com/app/${getLink}`;
          const WeaponEmbed = new Discord.MessageEmbed();
          // WeaponEmbed.setTitle(`:mag: Found result for ${WeaponName}`);
          WeaponEmbed.setTitle(`**FOUND! ${gameTitle.toUpperCase()}** ━━━━`)
          WeaponEmbed.setColor('BLUE')
          WeaponEmbed.setThumbnail(getAppIcon)
          WeaponEmbed.addField(":stop_sign: LIVE", `**${currentPlyers} PLAYERS ONLINE**`, true);
          WeaponEmbed.addField("LINK", `[View on Steam](${gameLink})`, true);
          WeaponEmbed.addField("HUB", `[Steam Community](https://steamcommunity.com/app/${getLink})`, false)
          WeaponEmbed.setFooter(`Data provided by steam`);
          WeaponEmbed.setTimestamp()

          message.channel.startTyping();

          setTimeout(() => {
            message.channel.send(WeaponEmbed).then(message => {
              message.channel.stopTyping();
            });
          }, 2000);
          // console.log(WeaponIcon);
        }
      }
    });

};

module.exports.help = {
  name: "steam",
  type: "general",
  usage: '`steam <game_name>`',
  about: 'To display live stats of any game thats available on steam',
  aliases: [""]
};
