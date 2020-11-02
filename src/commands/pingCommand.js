class Ping {
    boot = client => {
        client.on('message', message => {
            if (message.content === 'ping') {
                message.reply('Pong!');
            }
        });
    }
}


module.exports = new Ping();