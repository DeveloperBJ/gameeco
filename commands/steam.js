require('dotenv').config()
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
  if(!message.content.startsWith(prefix))return;    
  if(!args[0]){
    return message.channel.send('You have to specify the game name `'+ prefix +'data 2`')
  }
  let command = prefix + module.exports.help.name + 1;
  let msg = message.content.slice(command.length);

  let WeaponName = message.content.slice(command.length);
  axios
    .get(`https://steamcharts.com/search/?q=${WeaponName}`)
    .then(response => {
      const loadData = cheerio.load(response.data);
      const WeaponContainer = loadData("table.common-table tbody tr");
      for (let i = 0; i < 1; i++) {
        const ItemCon = loadData(WeaponContainer[i]).find("td.left a")[0];
        const ItemAmmo = loadData(WeaponContainer[i]).find("td.right.num")[0];
        const ItemIcon = loadData(WeaponContainer[i]).find("td img")[0];
        if (ItemCon) {
          const WeaponType = loadData(ItemCon).text();
          const WeaponAmmo = loadData(ItemAmmo).text();
          const AppLink = loadData(ItemCon).attr("href");
          const AppIcon = loadData(ItemIcon).attr("src");
          const getLink = AppLink.slice(5);
          const getAppIcon = `https://steamcharts.com${AppIcon}`;
          const gameLink = `https://store.steampowered.com/app/${getLink}`;
          function getHexColor(){
            let mColor = message.member.displayHexColor;
            if(mColor == null){
              return config.primary;
            }else{
              return mColor;
            }
           }

          const WeaponEmbed = new Discord.MessageEmbed();
          // WeaponEmbed.setTitle(`:mag: Found result for ${WeaponName}`);
          WeaponEmbed.setTitle(`**RESULT FOR ${WeaponName.toUpperCase()}** ━━━━`)
          WeaponEmbed.setColor(getHexColor())
          WeaponEmbed.setThumbnail(getAppIcon)
          WeaponEmbed.addField("Title", WeaponType, true);
          WeaponEmbed.addField("App ID", getLink, true);

          WeaponEmbed.addField("Playing now", `${WeaponAmmo} Players`, true);
          
          WeaponEmbed.setFooter(`Displaying data from Steam © 2020 ${bot.user.username}`);
          
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
