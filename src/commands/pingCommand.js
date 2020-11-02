const { Command } = require('../command');


class Ping extends Command {
    boot = client => {
        console.log('Boot running');

        client.on('message', message => {
            if (message.content === 'ping') {
                message.reply('Pong!');
            }
        });
    }
}


module.exports = new Ping();