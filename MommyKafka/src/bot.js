require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const cron = require("cron");
const selamatPagi = require("../src/message/selamatPagi.js");
const gifpagi = require("../src/message/gifPagi.js");
const { connect } = require("mongoose");
const { OpenAI } = require('openai');
const CharacterAI = require("node_characterai");
const characterai = new CharacterAI;
const mongoUrl = process.env.MONGO_URI;
const messageHandler = require("../src/message/messageHandler.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
client.commands = new Collection();

//OpenAI Fucntion, not used yet
const openai = new OpenAI({
  organization: process.env.OPENAIORG,
  apiKey: process.env.OPENAIKEY,
});


client.commandArray = [];
//Function command
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
};




//Chat Reply
const patern = /^(?=.*\b(hari|day)\b)(?=.*\bprogrammer\b)/i;
client.on("messageCreate", async function(message){
  if (message.channel.id == "1174592519577796660") {
    if(patern.test(message.content)){
    try {
      if (message.author.bot) return;
        console.log("Executing Command~");
        messageHandler.execute(message);
      }
    catch (error) {
      console.error(error);
      message.reply(
        "Terjadi kesalahan saat mencoba menjalankan perintah tersebut."
      );
    }
  }else{
     try{
        if(message.author.bot) return;
        const characterId = "arDXjij4KdGp6AcUu0f9_sxekMIWtTc_o9RK0iu7Yyg";        //Character AI Integrated chat
        const chat = await characterai.createOrContinueChat(characterId);
        const response = await chat.sendAndAwaitResponse(message.content, true);
        message.reply(response.text);
        console.log(response)
        return;
    } catch(err){
      console.log(err);
    } 
}
}
});


const task = new cron.CronJob("00 7 * * *", async () => {
  const channel = client.channels.cache.get('1174592519577796660');
  console.log("Pesan berhasil terkirim");
  const dailyMessage = await selamatPagi();
  const dailyGif = await gifpagi();
  channel.send(dailyMessage);
  channel.send(dailyGif);
 });



task.start();
client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN);
(async () => {  
  await characterai.authenticateWithToken(process.env.CHAI);
  await connect(mongoUrl).catch(console.error);
})();
