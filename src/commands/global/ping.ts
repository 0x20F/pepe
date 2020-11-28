import Command from '@foundation/command';

import { Client, Message } from 'discord.js';


class Ping extends Command {
    boot = async (c: Client): Promise<any> => {
        c.on('message', message => {
            if (!this.isPingPongMessage(message)) {
                return;
            }

            let text = message.content;

            let pongs = text.split(/[Pp]ing/gm);
            let pings = pongs.map(p => p.split(/[Pp]ong/gm).join('ping'));
            message.reply(pings.join('pong'));
        });
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