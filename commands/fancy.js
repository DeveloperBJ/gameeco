require('dotenv').config()
const Discord = require('discord.js');
const { Ecobase } = require('mongo.eco')
const config = require('../config.json');
const ms = require('parse-ms');
const eco = new Ecobase(process.env.MONGO)
const db = eco.mongo();

const fs1 = {
  'A': '𝔸',
  'B': '𝔹',
  'C': 'ℂ',
  'D': '𝔻',
  'E': '𝔼',
  'F': '𝔽',
  'G': '𝔾',
  'H': 'ℍ',
  'I': '𝕀',
  'J': '𝕁',
  'K': '𝕂',
  'L': '𝕃',
  'M': '𝕄',
  'N': 'ℕ',
  'o': '𝕆',
  'P': 'ℙ',
  'Q': 'ℚ',
  'R': 'ℝ',
  'S': '𝕊',
  'T': '𝕋',
  'U': '𝕌',
  'V': '𝕍',
  'W': '𝕎',
  'X': '𝕏',
  'Y': '𝕐',
  'Z': 'ℤ',
  'a': '𝕒',
  'b': '𝕓',
  'c': '𝕔',
  'd': '𝕕',
  'e': '𝕖',
  'f': '𝕗',
  'g': '𝕘',
  'h': '𝕙',
  'i': '𝕚',
  'j': '𝕛',
  'k': '𝕜',
  'l': '𝕝',
  'm': '𝕞',
  'n': '𝕟',
  'o': '𝕠',
  'p': '𝕡',
  'q': '𝕢',
  'r': '𝕣',
  's': '𝕤',
  't': '𝕥',
  'u': '𝕦',
  'v': '𝕧',
  'w': '𝕨',
  'x': '𝕩',
  'y': '𝕪',
  'z': '𝕫'
}

const fs2 = {
  'a': '𝖆',
  'b': '𝖇',
  'c': '𝖈',
  'd': '𝖉',
  'e': '𝖊',
  'f': '𝖋',
  'g': '𝖌',
  'h': '𝖍',
  'i': '𝖎',
  'j': '𝖏',
  'k': '𝖐',
  'l': '𝖑',
  'm': '𝖒',
  'n': '𝖓',
  'o': '𝖔',
  'p': '𝖕',
  'q': '𝖖',
  'r': '𝖗',
  's': '𝖘',
  't': '𝖙',
  'u': '𝖚',
  'v': '𝖛',
  'w': '𝖜',
  'x': '𝖝',
  'y': '𝖞',
  'z': '𝖟'
}

const fs4 = {
  'a': 'α',
  'b': 'в',
  'c': 'c',
  'd': 'd',
  'e': 'є',
  'f': 'f',
  'g': 'g',
  'h': 'h',
  'i': 'í',
  'j': 'j',
  'k': 'k',
  'l': 'l',
  'm': 'm',
  'n': 'n',
  'o': 'σ',
  'p': 'p',
  'q': 'q',
  'r': 'r',
  's': 's',
  't': 't',
  'u': 'u',
  'v': 'v',
  'w': 'w',
  'x': 'х',
  'y': 'ч',
  'z': 'z'
}

const fs5 = {
  'a': 'α',
  'b': 'в',
  'c': 'c',
  'd': '∂',
  'e': 'ε',
  'f': 'ғ',
  'g': 'g',
  'h': 'н',
  'i': 'ι',
  'j': 'נ',
  'k': 'к',
  'l': 'ℓ',
  'm': 'м',
  'n': 'η',
  'o': 'σ',
  'p': 'ρ',
  'q': 'q',
  'r': 'я',
  's': 's',
  't': 'т',
  'u': 'υ',
  'v': 'v',
  'w': 'ω',
  'x': 'x',
  'y': 'ү',
  'z': 'z'
}


function strtr(s, p, r) {
  return !!s && {
      2: function () {
          for (var i in p) {
              s = strtr(s, i, p[i]);
          }
          return s;
      },
      3: function () {
          return s.replace(RegExp(p, 'g'), r);
      },
      0: function () {
          return;
      }
  }[arguments.length]();
}

module.exports.run = async (bot, message, args) => {
    const guildPrefix = await eco.fetch(`prefix_${message.guild.id}`)
    var prefix = (!guildPrefix) ? config.prefix : guildPrefix;
  if(!message.content.startsWith(prefix))return;  
//   if(!args[0]){
//       await message.repy(`Rip! You have to specify a word ` + '`' + prefix +' fancy myname`')
//   }
  
  let fancyCmd = prefix + module.exports.help.name + 1;
  let FancyTextMsg = message.content.slice(fancyCmd.length);
  const user = message.mentions.users.first();

  function genName(){
      if(!args[0]){
          return message.author.username;
      }else if(user){
          return user.username;
      }else if (!user) {
          return FancyTextMsg;
      }
  }
  
  // Covert with specific 
  function fancy_style_1() {
    const str = genName(); // Text
    const style = fs1 // Font Style 1
    let output = strtr(str, style);
    return output;
}

function fancy_style_2() {
    const str = genName(); // Text
    const style = fs2; // Text style
    let output = strtr(str, style);
    return output;
}
function fancy_style_4() {
    const str = genName(); // Text
    const style = fs4; // Text style
    let output = strtr(str, style);
    return output;
}
function fancy_style_5() {
    const str = genName(); // Text
    const style = fs5; // Text style
    let output = strtr(str, style);
    return output;
}


function getHexColor(){
  let mColor = message.member.displayHexColor;
  if(mColor == null){
    return config.primary;
  }else{
    return mColor;
  }
 }
    const embed = new Discord.MessageEmbed()
    .setTitle(`**FANCY TEXT GENRETOR ━━━━━━**`)
    .setColor(getHexColor())
    .addField(':white_small_square: FONTS WITHOUT SYMBOLS', '```'+  fancy_style_1() + 
    '\n' + fancy_style_2() + '\n' +  fancy_style_4() + '\n' + fancy_style_5() + '```')
    .addField(`:white_small_square: COOL SYMBOLS & SIGNS`, '\n\n`••¤(×[¤ name ¤]×)¤••`'+
    ' `★彡 name 彡★` `𓊈𒆜 name 𒆜𓊉` ')
    .setFooter(`@${bot.user.username} displaying data using its own api.`)
        const p = await message.channel.send("Generating .....")
      
    return setTimeout(function(){ p.edit(`Generated`), p.edit(embed); }, 2200);

}

module.exports.help = {
  name: "fancy",
  type: "general",
  usage: '`fancy coolname`',
  about: 'To generate fancy name',
  aliases: ["textgenerator","coolfont", "fancyfont"]
};
