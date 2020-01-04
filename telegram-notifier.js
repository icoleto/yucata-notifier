const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const bot = new TelegramBot(token, { polling: true });

class TelegramNotifier {
  client;
  async send(msg) {
    bot.sendMessage(chatId, msg)
  }
}
module.exports = {
TelegramNotifier
}
