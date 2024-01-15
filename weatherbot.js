const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6776537662:AAFwGioTiYcAcc-7ADOplQ8fjF8Qb-y7hso';
const bot = new TelegramBot(token, {polling: true});

console.log('Bot has been started ...')

bot.onText(/\/start/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! Чтобы узнать температуру и остальные данные, скинь мне свою геолокацию :]\nОстальная информация тут: /menu`);
});

bot.onText(/\/menu/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Список всех команд: \n/start - Начальное приветствие\n/help - Как пользоваться ботом\n/site - Сайт, откуда бот берёт данные о погоде');
});

bot.onText(/\/site/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'https://openweathermap.org/');
});

bot.onText(/\/help/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Для получения данных о погоде, нужно в строке для сообщений выбрать "Геопозиция", после чего нажать "Отправить выбранную геопозицию"');
});

bot.on('message', async (msg) => 
{
  const chatId = msg.chat.id;
  if (msg.location)
  {
    console.log(msg);
    console.log(msg.location);
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${msg.location.latitude}&lon=${msg.location.longitude}&exclude={part}&appid=c44e21e43bc6db0240e6572687b59a0a&units=metric`);
    console.log(response);
    await bot.sendMessage(chatId, `Температура: ${response.data.main.temp} °C\nОщущается как: ${response.data.main.feels_like} °C\nДавление: ${response.data.main.pressure} мм рт. ст.\nВлажность: ${response.data.main.humidity} %\nСкорость ветра: ${response.data.wind.speed} км/ч`);
  }
})
