import 'module-alias/register';


import config from '../config.json';
import { Client } from 'discord.js';

// Ugly way of importing EVERYTHING
import Ping from './commands/global/ping';
import Subreddits from './commands/global/subreddits';
import Roll from './commands/global/roll';

const client = new Client();

const commands = [
    new Ping(client),
    new Subreddits(client),
    new Roll(client)
];


/**
 * Init all commands
 * 
 * 💕❤😊
 */
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    commands.forEach(command => {
        command.boot(client);
    });
});

client.login(config.token);