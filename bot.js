const TelegramBot = require('node-telegram-bot-api');
const token = '6970104134:AAFafIkauKbTLpjCfI8KB7qqVxxL5LbrGCg';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => 
{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет, Октагон!');
});