const TelegramBot = require('node-telegram-bot-api');
const token = '6970104134:AAFafIkauKbTLpjCfI8KB7qqVxxL5LbrGCg';
const bot = new TelegramBot(token, {polling: true});

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chatbottests'
});
connection.connect();

console.log('Bot has been started ....')

bot.setMyCommands([
  {command: '/start', description: 'Начало диалога'},
  {command: '/menu', description: 'Список команд'},
  {command: '/help', description: 'Правила заполнения команд для БД'},
  {command: '/site', description: 'Ссылка на Октагон'},
  {command: '/creator', description: 'Мой создатель'},
  {command: '/view', description: 'Просмотр всех данных БД'},
  {command: '/add', description: 'Добавление данных БД'},
  {command: '/delete', description: 'Удаление данных БД'},
  {command: '/webshot', description: 'Скриншот сайта'},
  {command: '/qr', description: 'Получение QR-Кода сайта'},
])

bot.onText(/\/start/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/29.webp');
  await bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! Меня зовут Цербер :)\nВсе команды ты можешь посмотреть по ссылке /menu`);
})

bot.onText(/\/menu/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Список всех моих команд: \n\nОсновные команды:\n/start - Начало диалога;\n/menu - Список команд;\n/help - Правила заполнения команд БД;\n/site - Ссылка на Октагон;\n/creator - Мой создатель;\n/webshot - Скриншот сайта;\n/qr - Получение QR-Кода сайта;\n\nВзаимодействие с БД:\n/view - Просмотр всех данных;\n/add - Добавление данных;\n/delete - Удаление данных;');
})

bot.onText(/\/help/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Чтобы заполнить данными таблицу, нужно ввести команду [/add TEXT, TEXT]\nГде TEXT - ваши введённые данные');
  await bot.sendMessage(chatId, 'Чтобы удалить запись из таблицы, нужно ввести команду [/delete ID]\nГде ID - номер записи в таблице');
})

bot.onText(/\/site/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Вот ссылка на лучший сайт в мире: https://students.forus.ru/');
})

bot.onText(/\/creator/, async (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Моего создателя зовут:\nМакуров Владимир Алексеевич\n@makuroov');
})

bot.onText(/\/view/, (msg) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  connection.query("SELECT * FROM `items`", (error, results, fields) => 
  {
    bot.sendMessage(chatId, 'Данные таблицы: ' + JSON.stringify(results));
  });
});

bot.onText(/\/add (.+), (.+)/, (msg, match) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  const name = match[1];
  const desc = match[2];
  connection.query("INSERT INTO `items` (`Name`, `Desc`) VALUES (?, ?)", [name, desc], (error, results, fields) => 
  {
    bot.sendMessage(chatId, 'Данные успешно добавлены');
  });
});

bot.onText(/\/delete (.+)/, (msg, match) => 
{
  console.log(msg);
  const chatId = msg.chat.id;
  const id = match[1];  
  connection.query("DELETE FROM `items` WHERE ID = ?", [id], (error, results, fields) => 
  {
    if (results.affectedRows > 0) 
    {
      bot.sendMessage(chatId, 'Данные успешно удалены');
    } 
    else 
    {
      bot.sendMessage(chatId, 'Ошибка! Такого предмета не существует в базе!');
    }
  });
});

bot.onText(/^\/webshot/, async function(msg) 
{
  console.log(msg);
  const userId = msg.from.id;
  const url = msg.text.substring(8).trim();
  const image = "https://api.letsvalidate.com/v1/thumbs/?url=" + url + "&width=1280&height=720";
  await bot.sendMessage(msg.chat.id, "[📷](" + image + ") Website screenshot: " + url, {parse_mode : "Markdown"});
});

bot.onText(/^\/qr/, async function(msg) 
{
  console.log(msg);
  const userId = msg.from.id;
  const data = msg.text.substring(3).trim();
  const imageqr = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;
  await bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ") QR code: " + data, {parse_mode : "Markdown"});
});