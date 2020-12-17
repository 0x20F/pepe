import Command from "@foundation/command";
import { Client, Message } from "discord.js";

class Roll extends Command {
    boot = (c: Client) => this.register_prefix('roll')

    onMessage = async (message: Message): Promise<void> => {
        let content = message.content;

        if (!this.starts_with('roll', content)) {
            return;
        }

        let total_segments = this.segments(content);

        if (total_segments >= 3) {
            // Random number between 2 values
            let a = parseInt(this.segment(1, content));
            let b = parseInt(this.segment(2, content));

            message.reply(`Random number between ${a} and ${b}: ${this.randomNumber(a, b)}`);
        }

        if (total_segments === 2) {
            // Random number between 0 and value
            let a = parseInt(this.segment(1, content));

            message.reply(`Random number between 0 and ${a}: ${this.randomNumber(0, a)}`);
        }

        if (total_segments === 1) {
            // Random number between 0 and 100
            message.reply(`Random number between 0 and 100: ${this.randomNumber(0, 100)}`);
        }
    }

    
    /**
     * Generate a random number between 2 values
     * 
     * @param min 
     * @param max 
     */
    randomNumber = (min: number, max: number): number => {
        if (min > max) {
            let temp = max;
            max = min;
            min = temp;
        }

        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}


export default Roll;