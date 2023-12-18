const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6730862677:AAFFM96PQISF0NKYWfvXKcbninFwXhX6Kgk';
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
  await bot.sendMessage(chatId, 'Список всех моих команд: \n/start - Начальное приветствие\n/help - Как пользоваться ботом\n/site - Сайт, откуда я беру данные о погоде');
});

bot.onText(/\/site/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Ссылка на openweather: https://openweathermap.org/');
});

bot.onText(/\/help/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Для получения данных о погоде нужно в строке для сообщений выбрать пункт "Геопозиция"\nШаги указаны ниже:');
  await bot.sendPhoto(chatId, 'https://sun4-22.userapi.com/impg/XHwJeb-z6wg5diPQCmS52ktzM-2LEQ5Pypbnkg/ShBtvsk_N0g.jpg?size=1080x301&quality=95&sign=34f4137e9f4898fc17251ed33511952e&type=album');
  await bot.sendPhoto(chatId, 'https://sun9-53.userapi.com/impg/g95boaI41aZD1IW977NwOmXtCnj_Mjmj60syRQ/RLZOh1RFp3g.jpg?size=985x1280&quality=95&sign=350e3f336d2bb58eda54900a70a52976&type=album');
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
    await bot.sendMessage(chatId, `Местоположение: ${response.data.name}\nТемпература: ${response.data.main.temp} °C\nОщущается как: ${response.data.main.feels_like} °C\nДавление: ${response.data.main.pressure} мм рт. ст.\nВлажность: ${response.data.main.humidity} %\nСкорость ветра: ${response.data.wind.speed} км/ч`);
  }
})
