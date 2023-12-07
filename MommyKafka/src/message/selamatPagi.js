const { Client, Intents } = require('discord.js');
import('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const message = async () => {
    const pesan = "@everyone\n Selamat Pagi, Ingat Baca Doa bangun tidur mu~\n Dan jangan lupa, kamu harus jadi programmer oke!";
    return pesan;
};

module.exports = message ;
