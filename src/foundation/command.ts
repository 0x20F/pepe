import { Client } from 'discord.js';
import config from '../../config.json';

abstract class Command {
    abstract boot(c: Client): void;


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

        if (segment.startsWith(prefix)) {
            segment = segment.substring(prefix.length);
        }

        return segment;
    }
}

export default Command;