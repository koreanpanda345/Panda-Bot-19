const prefix = process.env.prefix;
const fs = require('fs');
const ready = require("../../ready.json")
module.exports = async (client, message) => {
    if (message.author.client) return;
    if (message.channel.type == "dm") return;
    if (ready.status === "inv" && !message.author.id === "304446682081525772") return;

    if (message.content.toLowerCase().includes(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.hasArgs && !args.length) {
            return message.channel.send(command.args);
        }

        try {
            command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error trying to execute that command');
            client.channels.get("603294461002252317").send(` ${error.message}`, { code: true });
        }
    }

}