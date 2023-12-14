const TelegramBot = require('node-telegram-bot-api');
const token = '6970104134:AAFafIkauKbTLpjCfI8KB7qqVxxL5LbrGCg';

console.log('Bot has been started ....')
const bot = new TelegramBot(token, {polling: true});

bot.setMyCommands([
    {command: '/menu', description: 'Список команд'},
    {command: '/start', description: 'Начало диалога'},
    {command: '/site', description: 'Ссылка на Октагон'},
    {command: '/creator', description: 'Мой создатель'},
])

bot.on
('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/menu') 
    {
        return bot.sendMessage(chatId, 'Список всех моих команд: \n/start - Начало диалога;\n/menu - Список команд;\n/site - Ссылка на Октагон;\n/creator - Мой создатель;');
    }
    if (text === '/start') 
    {
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/29.webp')
        return bot.sendMessage(chatId, 'Привет, ' + msg.from.first_name + '! ' + 'Меня зовут Дос :)\nВсе команды ты можешь посмотреть по ссылке /menu');
    }
    if (text === '/site') 
    {
        return bot.sendMessage(chatId, 'Вот ссылка на лучший сайт в мире: https://students.forus.ru/');
    }
    if (text === '/creator') 
    {
        return bot.sendMessage(chatId, 'Моего создателя зовут:\nМакуров Владимир Алексеевич\n@makuroov');
    }
    return bot.sendMessage(chatId, 'Я не знаю такой команды!');
})
