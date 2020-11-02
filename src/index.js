const fs = require('fs');
const path = require('path');

const config = require('../config');
const Discord = require('discord.js');

const client = new Discord.Client();


const allCommands = (dir, _files) => {
    files = fs.readdirSync(dir);
  
    _files = _files || [];
  
    files.forEach(file => {
        if (fs.statSync(dir + "/" + file).isDirectory()) {
            _files = getAllFiles(dir + "/" + file, _files);
        } else {
            _files.push(path.join(dir, "/", file));
        }
    });
  
    return _files;
}

/**
 * Init all commands
 * 
 * 💕❤😊
 */
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    let commands = allCommands(path.join(__dirname, 'commands'), []);

    commands.forEach(command => {
        command = require(command);
        command.boot(client);
    });
});

client.login(config.token);