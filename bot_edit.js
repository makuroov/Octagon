var TelegramBot = require('node-telegram-bot-api');
var token = '6970104134:AAFafIkauKbTLpjCfI8KB7qqVxxL5LbrGCg';
var bot = new TelegramBot(token, {polling: true});

var notes = [];

bot.onText(/start/, function (msg, match) {
	var userId = msg.from.id;
	var text = match[1];

	notes.push({ 'uid': userId, 'text': text });

	bot.sendMessage(userId, 'Привет! Меня зовут Дос :)\nВсе команды ты можешь посмотреть по ссылке /menu');
});

bot.onText(/help/, function (msg, match) {
	var userId = msg.from.id;
	var text = match[1];

	notes.push({ 'uid': userId, 'text': text });

	bot.sendMessage(userId, 'Список всех команд находится по ссылке /menu');
});

bot.onText(/menu/, function (msg, match) {
	var userId = msg.from.id;
	var text = match[1];

	notes.push({ 'uid': userId, 'text': text });

	bot.sendMessage(userId, 'Список всех моих команд: \n/start - начинаем диалог заново;\n/help - возвращаю список команд;\n/site - даю ссылку на сайт Октагон;\n/creator - мой создатель;');
});

bot.onText(/site/, function (msg, match) {
	var userId = msg.from.id;
	var text = match[1];

	notes.push({ 'uid': userId, 'text': text });

	bot.sendMessage(userId, 'Вот ссылка на лучший сайт в мире: https://students.forus.ru/');
});

bot.onText(/creator/, function (msg, match) {
	var userId = msg.from.id;
	var text = match[1];

	notes.push({ 'uid': userId, 'text': text });

	bot.sendMessage(userId, 'Моего создателя зовут:\nМакуров Владимир Алексеевич\n@makuroov');
});