import { Client, Message } from 'discord.js';
import config from '../../config.json';
import CommandList, { commands } from './commandList';


abstract class Command {
    client: Client;
    list: CommandList;

    constructor(c: Client) {
        this.client = c;
        this.client.on('message', message => this.onMessage(message));

        this.list = commands;
    }

    boot = (c: Client): void => {};
    onMessage = (message: Message): void => {};


    /**
     * Check if a string starts with a specific thing.
     * Including the prefix for the command
     * 
     * @param what The string starts with what?
     * @param where The bigger string that should be checked
     */
    starts_with(what: string, where: string): boolean {
        let prefix = config.prefix;
        let string = prefix + what;

        if (where.startsWith(string)) {
            return true;
        }

        return false;
    }


    /**
     * Checks if the received text isn't a 
     * registered command already.
     * 
     * @param from 
     * @param separator 
     */
    is_unique(prefix: string): boolean {
        let r = true;

        this.list.each(p => {
            if (prefix === p) {
                r = false;
            }
        });

        return r;
    }


    /**
     * Register the command prefix so that it doesn't
     * get used in other commands.
     * 
     * @param prefix 
     */
    register_prefix(prefix: string): void {
        this.list.register(prefix);
    }


    /**
     * Splits the command at a separator and returns
     * an item from the array while removing the prefix if 
     * it is present.
     * 
     * @param which 
     * @param from
     * @param separator
     */
    segment(which: number, from: string, separator: string = ' '): string {
        let prefix = config.prefix;
        let segments = from.split(separator);
        let segment = segments[which];

        if (!segment) {
            return undefined;
        }

        if (segment.startsWith(prefix)) {
            segment = segment.substring(prefix.length);
        }

        return segment;
    }


    /**
     * Returns count of all segments in the message
     * 
     * @param from 
     * @param separator 
     */
    segments(from: string, separator: string = ' '): number {
        return from.split(separator).length;
    }
}

export default Command;