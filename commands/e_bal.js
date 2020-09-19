const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../config.json')
const Prefix = config.prefix;


module.exports.run = async (bot, message, args, utils) => {
  if(!message.content.startsWith(Prefix))return;  

  let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;
  
  function getHexColor(){
    let mColor = message.member.displayHexColor;
    if(mColor == null){
      return config.purple;
    }else{
      return mColor;
    }
   }

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor(getHexColor())
  .setTitle(`**${user.tag.toUpperCase}'S ACCOUNT BALANCE ━━━━━'**`)
  .setDescription(`\n` + `Plase note that data (session) will reset after [here](https://pcgameson.com/fortrex/terms)`) 
  .setThumbnail(user.displayAvatarURL())
  .addField(`Purchase`, "`" + `${bal}` + " Points`", true)
  .addField(`Saved`, "`" + `${bank}` + " Points`", true)
  // .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`);
  message.channel.send(moneyEmbed)
};

module.exports.help = {
    name: "balance",
    type: "fun",
    usage: "`bal `",
    about: "To check balance/points ",
    aliases: ["bal"]
  };
