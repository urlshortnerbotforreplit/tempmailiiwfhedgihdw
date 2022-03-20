require('dotenv').config({
    path: './.env'
});

const {
    Telegraf,
    Markup
} = require('telegraf'); // importing telegraf.js
const express = require('express'); //For web app to keep the bot alive
const axios = require('axios'); //For making http requests
const res = require('express/lib/response'); 
const Mailjs = require('@cemalgnlts/mailjs'); 
const mailjs = new Mailjs();
const app = express();

app.get("/", (request, response) => {
    response.send("Bot is running!!! ⚙️");
});

if (process.env.BOT_TOKEN === undefined) {
    throw new TypeError('BOT_TOKEN must be provided!')
}
const bot = new Telegraf(process.env.BOT_TOKEN) // We saved our bot token to the bot variable

bot.start((ctx) => {
    ctx.reply(`Hello There`)
    mailjs.getDomains().then((res) => {
        console.log(res)
    })
});

bot.command(`CreateRandomAccount`, (ctx) => {
    mailjs.createOneAccount().then((res) => {
        ctx.reply(`Username: ${res.data.username}\nPassword: ${res.data.password}`)
    })
})

bot.command(`CreateAccount`, (ctx) => {
    console.log(ctx)
    var params = ctx.message.text.split(" ");
    var username = params[0]
    var password = params[1]
    username += 
    console.log(username)
    mailjs.register(username, password).then((res) => {
        console.log(res)
    })
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

app.listen(80);