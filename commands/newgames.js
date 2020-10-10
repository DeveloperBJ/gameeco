require('dotenv').config()
const Discord = require("discord.js");
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const eco = new Ecobase(process.env.MONGO)
const db = eco.mongo();
const cheerio = require("cheerio");
const axios = require("axios");

module.exports.run = async (bot, message, args) => {
  const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
  var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
  if(!message.content.startsWith(prefix))return;  
  let topGames = "";
  let platform = args[0];

  axios
    .get(
      `https://www.metacritic.com/browse/games/release-date/coming-soon/${platform}/date?view=condensed`
    )
    .then(response => {
      // Load the web page source code into a cheerio instance
      const Loader = cheerio.load(response.data);

      // The pre.highlight.shell CSS selector matches all `pre` elements
      // that have both the `highlight` and `shell` class
      const urlElems = Loader("table.clamp-list.condensed tr.expand_collapse");

      // We now loop through all the elements found
      for (let i = 0; i < 10; i++) {
        const urlSpan = Loader(urlElems[i]).find("td.details h3")[0];
        const ratingSpan = Loader(urlElems[i]).find(
          "td.details span"
        )[2];

        if (urlSpan) {
          const urlText = Loader(urlSpan).text();
          const score = Loader(ratingSpan).text();
          let embed = new Discord.MessageEmbed();
          let gameList =
            `** #${i + 1}:  ${urlText} **\n    ` +
            "  `Release: " +
            score +
            "`";
          let gameArr = gameList;
          topGames += `\n${gameArr}`;
          let counter = i + 1;
          console.log(
            "**" +
              `#${counter} ` +
              urlText.trim() +
              "**" +
              "  `" +
              "Rating: " +
              score +
              "`"
          );
          console.log(urlText);
        }
      }
      function getHexColor(){
        let mColor = message.member.displayHexColor;
        if(mColor == null){
          return config.primary;
        }else{
          return mColor;
        }
       }
      function gamesFor(){
        if(!args[0]){
          return 'PC';
        }else{
          return args[0];
        }
      }
      let gameEmbed = new Discord.MessageEmbed()
        .setColor(getHexColor())
        .setTitle(`**UPCOMING GAMES FOR ${gamesFor().toUpperCase()} ━━━━`)
        .setDescription(`${topGames}`)
        
      message.channel.startTyping();

      setTimeout(() => {
        message.channel.send(gameEmbed).then(message => {
          message.channel.stopTyping();
        });
      }, 2000);
    });
};

module.exports.help = {
  name: "newgames",
  type: "general",
  usage: '`newgames <platform>`',
  about: 'To display upcoming games, platform: `pc` `xboxone` `ps4` `wii` `stadia`',
  aliases: ["upcoming", "unrelease"]
};
