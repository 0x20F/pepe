class Ping {
    boot = client => {
        client.on('message', message => {
            if (!this.isPingPongMessage(message)) {
                return;
            }

            let text = message.content;

            let pongs = text.split(/[Pp]ing/gm);
            let pings = pongs.map(p => p.split(/[Pp]ong/gm).join('ping'));
            message.reply(pings.join('pong'));
        });
    }

    isPingPongMessage = message => {
        let textMessage = message.content.toLowerCase();
        return (textMessage.includes('ping') || textMessage.includes('pong')) && !this.isBot(message);
    }

    isBot = message => {
        return message.author.bot;
    }
}


module.exports = new Ping();
