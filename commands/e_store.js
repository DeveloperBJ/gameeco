const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../config.json')
const Prefix = config.prefix;
const mysql = require('mysql');


var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(Prefix))return;  
   function getHexColor(){
    let mColor = message.member.displayHexColor;
    if(mColor == null){
      return config.primary;
    }else{
      return mColor;
    }
   }
  
     con.connect(function (err) {
    if (err) throw err;
    console.log('database connected successfully :)');

    var sql = `CREATE TABLE IF NOT EXISTS store(id INT(20) AUTO_INCREMENT PRIMARY KEY, item VARCHAR(255), content VARCHAR(255), status VARCHAR(20) DEFAULT 'YES')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("TABLE named 'store' successfully created !");
    });
      
    function getHexColor(){
    let mColor = message.member.displayHexColor;
    if(mColor == null){
      return config.primary;
    }else{
      return mColor;
    }
   }
    
    con.query("SELECT * FROM store", function (err, result) {
        if (err) throw err;
      
//         for (let i = 0; i < result.length; i++) {
       function stockItem(){
         if(result[0].status === "YES"){
           return 'cost: 9500 Points';
         }else{
           return 'out of stock';
         }
       }
      function stockItem1(){
         if(result[1].status === "YES"){
           return 'cost: 9500 Points';
         }else{
           return 'out of stock';
         }
       }
      function stockItem2(){
         if(result[2].status === "YES"){
           return 'cost: 9500 Points';
         }else{
           return 'out of stock';
         }
       }
      function stockItem3(){
         if(result[3].status === "YES"){
           return 'cost: 9500 Points';
         }else{
           return 'out of stock';
         }
       }
      function stockItem4(){
         if(result[4].status === "YES"){
           return 'cost: 9500 Points';
         }else{
           return 'out of stock';
         }
       }
      function stockItem5(){
         if(result[5].status === "YES"){
           return 'cost: 9500 Points';
         }else{
           return 'out of stock';
         }
       }
          
           let embed = new Discord.MessageEmbed()
           .setTitle(`**${bot.user.username.toUpperCase()} GAME STORE ━━━━━ **`)
           .setDescription('\n use command to purchase an item for example - `f!buy 1` . These items will changed time to time. \n\n')
           .setThumbnail('https://my.games/hotbox/mygames/media/news/0376e83f545c5626a902201c4aa504f7.png')
           .addField(`${result[0].id}. ${result[0].item}`, "`" + ` ${stockItem()} ` + "`" , true)
           .addField(`${result[1].id}. ${result[1].item}`, "`" + ` ${stockItem1()} ` + "`" , true)           
           .addField(`${result[2].id}. ${result[2].item}`, "`" + ` ${stockItem2()} ` + "`" , true)           
           .addField(`${result[3].id}. ${result[3].item}`, "`" + ` ${stockItem3()} ` + "`" , true)
           .addField(`${result[4].id}. ${result[4].item}`, "`" + ` ${stockItem4()} ` + "`" , true)
           .addField(`${result[5].id}. ${result[5].item}`, "`" + ` ${stockItem5()} ` + "`" , true)
           .setColor(getHexColor())
           .setTimestamp()
           .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(embed)
          // }
          
      });
     con.end();
  });



}

module.exports.help = {
    name: "store",
    type: "fun",
    usage: "`store`",
    about: "display store items",
    aliases: ["shop"]
  };
