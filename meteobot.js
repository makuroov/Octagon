const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6730862677:AAFFM96PQISF0NKYWfvXKcbninFwXhX6Kgk';
const bot = new TelegramBot(token, {polling: true});

console.log('Bot has been started ...')

bot.onText(/\/start/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! Чтобы узнать температуру и остальные данные, скинь мне свою геолокацию :)`);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (msg.location)
    {
        console.log(msg.location);
        console.log(msg);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${msg.location.latitude}&lon=${msg.location.longitude}&exclude={part}&appid=c44e21e43bc6db0240e6572687b59a0a&units=metric`);
        console.log(response);
        await bot.sendMessage(chatId, `Местоположение: ${response.data.name}\nТемпература: ${response.data.main.temp} °C\nОщущается как: ${response.data.main.feels_like} °C\nДавление: ${response.data.main.pressure} мм рт. ст.\nВлажность: ${response.data.main.humidity} %`);
    }
})