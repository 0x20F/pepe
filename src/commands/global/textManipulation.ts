import Command from '@foundation/command';

import { Client, Message } from 'discord.js';


class Casing extends Command {
    onMessage = (message: Message): void => {
        console.log('Got a message in casing command');
    }
}

export default Casing;