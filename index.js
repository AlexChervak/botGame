import TelegramBot from "node-telegram-bot-api"
import myOptions from './options.js'

const token = "5326500327:AAH5zlf9PKJTWENIHCa6aqL0whCRKT19HYQ"

const bot = new TelegramBot(token, { polling: true })
const chats = {};
const startGame = async (chatid) => {

    await bot.sendMessage(chatid, `Сейчас я загадаю число от 1 до 10 твоя задача его отгадать!!!`, myOptions.gameOptions);
    const num = Math.floor(Math.random() * 10);
    chats[chatid] = num;
}

bot.on('message', async msg => {
    const text = msg.text;
    const chatid = msg.chat.id;
    bot.setMyCommands([
        { command: '/game', description: 'Игра угадай число' }
    ])
    if (text === "/start") {
        await bot.sendSticker(chatid, 'https://cdn.tlgrm.app/stickers/848/be3/848be3f5-be18-426f-8d6a-18ff7f5224cb/256/1.webp')
        await bot.sendMessage(chatid, `${msg.from.last_name} ${msg.from.username} Добро пожаловать в чат!!!`)
    }
    if (text === '/game') {
        startGame(chatid);
    }

    console.log(msg)
}
)
bot.on("callback_query", async msg => {
    const data = msg.data;
    const chatid = msg.message.chat.id;
    if (msg.data === 'replay') {
        startGame(chatid);
    } else if (Number.parseInt(data) === chats[chatid]) {
        await bot.sendMessage(chatid, `Ура победа!!!!! Ето число ${data}`, myOptions.replayOptions)

    }
    else {
        await bot.sendMessage(chatid, `Ето не ${data}`)
    }


})