const Discord = require('discord.js');
const clientconfig = require('../../settings.json')
const ready = require('../../ready.json');
const { readdirSync } = require('fs');
module.exports = async client => {

    var now = new Date();

    let prefix = clientconfig.prefix;
    let status = ready.status;
    let desc = ready.description;
    let guilds = false;
    if (desc === "") {
        client.user.setActivity("panda!help", { type: "WATCHING" });
    }
    else {
        client.user.setActivity(desc, { type: "WATCHING" });
    }
    if (status === "online") {
        client.user.setStatus("online")
            .then(console.log)
            .catch(console.error);
    }
    else if (status === "idle") {
        client.user.setStatus("idle")
            .then(console.log)
            .catch(console.error);
    }
    else if (status === "dnd") {
        client.user.setStatus("dnd")
            .then(console.log)
            .catch(console.error);
    }
    else if (status === "inv") {
        client.user.setStatus("invisible")
            .then(console.log)
            .catch(console.error);
    }
    else {
        client.user.setStatus("online")
            .then(console.log)
            .catch(console.error);
    }
    const commands = readdirSync("./command/");
    commands.forEach(dirs => {
        const command = readdirSync(`./command/${dirs}/`).filter(d => d.endsWith('.js'));
        console.log(`${dirs}`);
        console.log(command);
    })

    const events = readdirSync("./events/");
    events.forEach(dirs => {
        const event = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        console.log(`${dirs}`);
        console.log(event);
    })


    client.channels.get("603294461002252317").send(`
    client User: ${client.user.tag}
    client Connection: ${client.user.presence.status}
    Presence: ${client.user.presence.game}
    Start Time: ${new Date()}
    Shards: 0
    `, { code: true });
    if (guilds) {
        console.log(`Panda client is in ${client.guilds.size} servers, ${client.channels.size} channels, and ${client.users.size} users.`);
        const guildMemberCount = client.guilds.map(g => g.memberCount).join('\n');
        const guildNames = client.guilds.map(g => g.name).join("\n");
        console.log("Guilds:");
        console.log(`${guildNames}`);
        //console.log(`${guildMemberCount}`);
    }

}