import Command from '@foundation/command';

import { Message, Client } from 'discord.js';


class Xkcd extends Command {
    boot = (c: Client) => this.register_prefix('xkcd');

    onMessage = (message: Message): void => {
        let content = message.content;

        if (!this.starts_with('xkcd', content)) {
            return;
        }

        let number = this.segment(1, content);
        let xkcd = Math.floor(Math.random() * (2400 - 1 + 1) + 1);

        if (number) {
            xkcd = parseInt(number);
        }

        message.channel.send(`https://xkcd.com/${xkcd}`);
    }
}


export default Xkcd;