class Ping {
    boot = client => {
        client.on('message', message => {
            let textMessage = message.content.toLowerCase();

            if (textMessage.includes('ping') && !this.isBot(message)) {
                message.reply(message.content.replace(/([pP]ing)/gm, 'pong'));
            }

            if (textMessage.includes('pong') && !this.isBot(message)) {
                message.reply(message.content.replace(/([pP]ong)/gm, 'ping'));
            }
        });
    }

    isBot = message => {
        return message.author.bot;
    }
}


module.exports = new Ping();
