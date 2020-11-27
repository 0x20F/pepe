import Command from '../../foundation/command';
import { Client, MessageEmbed } from 'discord.js';
import axios from 'axios';



type RedditResponse = {
    url: string,
    author: string,
    title: string
}



class Subreddits extends Command {
    boot = async (c: Client): Promise<any> => {
        c.on('message', async message => {
            let content = message.content;

            // Only check if it starts with prefix
            if (!this.starts_with('', content)) {
                return;
            }

            let subreddit = this.segment(0, content);
            let channel = message.channel;


            // Make the request to the subreddit
            // and return something accordingly.
            await this.request(subreddit, results => {
                if (results.length === 0) {
                    channel.send("Didn't get anything back from that subreddit :thinking:");
                    return;
                }

                let post: RedditResponse = results[Math.floor(Math.random() * results.length)];
                channel.send(post.url);
            });
        });
    };


    /**
     * Make a request to the reddit api and get the latest 100 posts
     * this week.
     * 
     * @param {string} subreddit What subreddit to fetch from
     * @param {callable} callback What to do when all data has been retrieved
     */
    request = async (subreddit: string, callback: (a: []) => void) => {
        axios.get(`https://www.reddit.com/r/${subreddit}/top.json?sort=top&t=week&limit=100`)
            .then(response => response.data.data.children)
            .then(data => callback(data.map((post: any) => post.data)))
            .catch(err => callback([]));      
    }
}


export default Subreddits;