import 'module-alias/register';


import config from '../config.json';
import { Client } from 'discord.js';

// Ugly way of importing EVERYTHING
import Feed from './commands/global/feed';
import Ping from './commands/global/ping';
import Subreddits from './commands/global/subreddits';

const client = new Client();

const commands = [
    new Feed(),
    new Ping(),
    new Subreddits()
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