const config = require('../config');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    let commands = [
        require('./commands/pingCommand')
    ];

    commands[0].boot(client);
});

client.login(config.token);