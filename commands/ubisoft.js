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
  let command = prefix + module.exports.help.name + 1;
  let msg = message.content.slice(command.length);

  let WeaponName = message.content.slice(command.length);
  axios
    .get(`https://store.ubi.com/ie/search?q=${WeaponName}`)
    .then(response => {
      const loadData = cheerio.load(response.data);
      const WeaponContainer = loadData("ul#search-result-items li.grid-tile.cell.shrink");
      for (let i = 0; i < 1; i++) {
        //   parse the title of the game
        const ItemTitle = loadData(WeaponContainer[i]).find("h2.prod-title")[0];
        const ItemPrice= loadData(WeaponContainer[i]).find("div.card-details-wrapper > div > div.card-info.wishlist-product-tile > div > div > span")[0];
        const ItemLink = loadData(WeaponContainer[i]).find(".product-tile.card a.thumb-link")[0];
        const ItemImage = loadData(WeaponContainer[i]).find("img.product_image.primary-image.lazy.card-image.swapped.loaded")[0];
        if (ItemTitle) {
          const getItemTitle = loadData(ItemTitle).text();
          const getItemPrice = loadData(ItemPrice).text();
          const getItemLink = loadData(ItemLink).attr("href");
          const AppIcon = loadData(ItemImage).attr("src");
          function getHexColor(){
            let mColor = message.member.displayHexColor;
            if(mColor == null){
              return config.primary;
            }else{
              return mColor;
            }
           }
           console.log(AppIcon);
          const WeaponEmbed = new Discord.MessageEmbed();
          // WeaponEmbed.setTitle(`:mag: Found result for ${WeaponName}`);
          WeaponEmbed.setTitle(`**RESULT FOR ${WeaponName.toUpperCase()}** ━━━━`)
          WeaponEmbed.setColor(getHexColor())
          // WeaponEmbed.setThumbnail(``)
          WeaponEmbed.addField("Title", getItemTitle, true);
          WeaponEmbed.addField("Link", `[Buy now](https://store.ubi.com${getItemLink})`, true);
          WeaponEmbed.addField("Price", `${getItemPrice}`, true);
          WeaponEmbed.setFooter(`Displaying data from ubisoft © 2020 ${bot.user.username}`);
          
          message.channel.send(WeaponEmbed);
          // console.log(WeaponIcon);
        }
      
      }
    });

};

module.exports.help = {
  name: "ubisoft",
  type: "general",
  usage: '`ubi <game_name>`',
  about: 'Explore the ubisoft store',
  aliases: []
};
