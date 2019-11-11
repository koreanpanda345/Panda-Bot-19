process.on("unhandledRejection", console.error);

const Token = process.env.token;
const {Client, Collection} = require('discord.js');
const client = new Client({disableEveryone: true});

["commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handler/${x}`)(client));

client.login(Token);