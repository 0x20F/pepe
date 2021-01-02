import Command from '@foundation/command';
import axios from 'axios';
import config from '../../config.json';

import { Message, Channel, User } from 'discord.js';


const HOURS = 3;
const DEADLINE = HOURS * 60 * 60 * 1000;
// 2.5 hours
const WARNING = DEADLINE - 30 * 60 * 1000;


type Interval = {
    channel: Channel,
    author: User,
    deadline: ReturnType<typeof setTimeout>,
    warning: ReturnType<typeof setTimeout>
}


class Minecraft extends Command {
    timer: Interval;

    boot = () => this.register_prefix('mc');

    onMessage = async (message: Message): Promise<void> => {
        let content = message.content;

        if (!this.starts_with('mc', content)) {
            return;
        }

        // Check if this is a DM or not
        if (message.channel.type !== 'text') {
            message.reply("This command doesn't work outside a server!");
            return;
        }

        // Check if this guild is allowed to run the command
        if (message.channel.guild.id !== config.minecraft.controlGuild) {
            message.reply("That command is only available inside the `█ Hoon` server!");
            return;
        }

        let command = this.segment(1, content);
        let author = message.author.id;

        // Check if the author is allowed to run this command
        if (!config.minecraft.admins.includes(author)) {
            message.reply("You don't have permission to do that!");
            return;
        }

        switch (command) {
            case "start":
                if (this.timer) {
                    message.reply("Server is already running!");
                    return;
                }

                this.timer = {
                    channel: message.channel,
                    author: message.author,
                    deadline: setTimeout(message => this.stop(message), DEADLINE, message),
                    warning: setTimeout(message => this.warn(message), WARNING, message)
                };

                this.start(message);
                break;
            
            case "stop":
                if (!this.timer) {
                    message.reply("There is no server to stop!");
                    return;
                }
                
                this.stop(message);
                break;

            case "renew":
                if (!this.timer) {
                    message.reply("There is no server running!");
                    return;
                }

                this.renew(message);
                break;
        }
    }


    /**
     * Stop the server and message the response data
     * 
     * @param message 
     */
    stop = async (message: Message) => {
        let stop = config.minecraft.stopUrl;

        clearTimeout(this.timer.deadline);
        clearTimeout(this.timer.warning);
        this.timer = undefined;

        axios.get(stop).then(res => {
            message.reply("\n" + res.data);
        }).catch(_ => message.reply("Couldn't stop the server, something went wrong!"));
    }


    /**
     * Start the server and message the response data
     * 
     * @param message 
     */
    start = async (message: Message) => {
        let start = config.minecraft.startUrl;

        axios.get(start).then(res => {
            message.channel.send("\n" + res.data);
        }).catch(_ => message.reply("Couldn't start the server, something went wrong!"));
    }


    /**
     * Reset the timers that keep track of how long
     * the server has been running.
     * 
     * @param message 
     */
    renew = async (message: Message) => {
        message.reply(`Adding \`${ HOURS }\` more hours of uptime! Have fun :pray:`);
                
        clearTimeout(this.timer.deadline);
        clearTimeout(this.timer.warning);

        this.timer.deadline = setTimeout(() => this.stop(message), DEADLINE);
        this.timer.warning = setTimeout(() => this.warn(message), WARNING);
    }


    /**
     * Warn the user that started the server that
     * the server is going to shut down in 30 minutes
     * 
     * @param message 
     */
    warn = async (message: Message) => {
        message.reply("The minecraft server will shutdown soon. Use `@mc renew` to reset the timer!");
    }
}


export default Minecraft;