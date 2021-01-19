import 'module-alias/register';


import config from '../config.json';
import { Client } from 'discord.js';

// Ugly way of importing EVERYTHING
import Ping from './commands/ping';
import Subreddits from './commands/subreddits';
import Roll from './commands/roll';
import Xkcd from './commands/xkcd';
import Minecraft from './commands/minecraft';

const client = new Client();

const commands = [
    new Ping(client),
    new Subreddits(client),
    new Roll(client),
    new Xkcd(client),
    //new Minecraft(client)
];


/**
 * Init all commands
 * 
 * 💕❤😊
 */
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    commands.forEach(command => {
        command.boot();
    });
});

client.login(config.token);