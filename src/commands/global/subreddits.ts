import Command from '@foundation/command';
import { Client, Message } from 'discord.js';
import axios from 'axios';



type RedditResponse = {
    url: string,
    author: string,
    title: string
}



class Subreddits extends Command {
    boot = (c: Client) => this.register_prefix('subreddits')

    onMessage = async (message: Message): Promise<void> => {
        let content = message.content;

        let prefix = this.segment(0, content);

        if (!this.starts_with('', content)) {
            return;
        }

        // Make sure there aren't any commands called by the subreddit name
        if (!this.is_unique(prefix)) {
            return;
        }

        let channel = message.channel;
        let subreddit = prefix;


        // Make the request to the subreddit
        // and return something accordingly.
        await this.request(subreddit, results => {
            if (results.length === 0) {
                channel.send("Didn't get anything back from that subreddit <:pepeHands:782612334295384074>");
                return;
            }

            let post: RedditResponse = results[Math.floor(Math.random() * results.length)];
            channel.send(post.url);
        });
    }


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