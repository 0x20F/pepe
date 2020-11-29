import Command from '@foundation/command';

import { Message } from 'discord.js';


class Ping extends Command {
    onMessage = (message: Message): void => {
        if (!this.isPingPongMessage(message)) {
            return;
        }

        let text = message.content;

        let pongs = text.split(/[Pp]ing/gm);
        let pings = pongs.map(p => p.split(/[Pp]ong/gm).join('ping'));
        message.reply(pings.join('pong'));
    }

    isPingPongMessage = (message: Message): boolean => {
        let textMessage = message.content.toLowerCase();
        return (textMessage.includes('ping') || textMessage.includes('pong')) && !this.isBot(message);
    }

    isBot = (message: Message): boolean => {
        return message.author.bot;
    }
}


export default Ping;