class Ping {
    boot = client => {
        client.on('message', message => {
            if (message.content === 'ping') {
                message.reply('Pong!');
            }

            if (message.content === 'pong') {
                message.reply('Ping!');
            }
        });
    }
}


module.exports = new Ping();