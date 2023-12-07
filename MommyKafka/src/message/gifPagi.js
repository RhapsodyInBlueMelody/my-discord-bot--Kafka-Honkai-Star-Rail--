const { Client, Intents } = require('discord.js');
import('node-fetch');
const dotenv = require('dotenv');
dotenv.config();


const getRandomGif = async () => {
    let url = `https://tenor.googleapis.com/v2/search?q=kafka_stelle&key=${process.env.TENORKEY}&client_key=my_test_app&limit=8`;
    let response = await fetch(url);
    let json = await response.json();
    const gifUrl = json.results[1].url;
    return gifUrl;
};

module.exports = getRandomGif
