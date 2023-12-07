require("dotenv").config();
import("node-fetch");

module.exports = {
  async execute(message) {
    let url = `https://tenor.googleapis.com/v2/search?q=kafka_pat&key=${process.env.TENORKEY}&client_key=my_test_app&limit=8`;
    let response = await fetch(url);
    let json = await response.json();
    const gifUrl = json.results[0].url;
    message.reply("Semangat ya~ Mommy percaya sama kamu");
    message.channel.send(gifUrl);
  },
};
