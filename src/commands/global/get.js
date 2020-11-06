const { MessageEmbed } = require('discord.js');

const axios = require('axios').default;


class Get {
    boot = async client => {
        client.on('message', async message => {
            let content = message.content;

            if (!content.startsWith('$get')) {
                return;
            }

            // What subreddit to feed, and to what channel
            let subreddit = content.substring(content.indexOf(' ') + 1);
            let channel = message.channel;


            // Initial fetch, and run it once
            await this.request(subreddit, results => {
                let post = results[Math.floor(Math.random() * results.length)];
                channel.send(this.buildEmbed(post));
            });
        });
    }


    /**
     * Make a request to the reddit api and get the latest 100 posts
     * this week.
     * 
     * @param {string} subreddit What subreddit to fetch from
     * @param {callable} callback What to do when all data has been retrieved
     */
    request = async (subreddit, callback) => {
        axios.get(`https://www.reddit.com/r/${subreddit}/top.json?sort=top&t=week&limit=100`)
            .then(response => response.data.data.children)
            .then(data => callback(data.map(post => post.data)))
            .catch(err => console.log(err));      
    }


    /**
     * Build a discord embed with all the data so it's nice
     * and structured when it gets sent in chat
     * 
     * @param {object} data The reddit post object
     */
    buildEmbed = data => {
        let embed = new MessageEmbed()
            .setTitle(data.title)
            .setURL(data.url)
            .setImage(data.url)
            .setFooter(`By u/${data.author}`);

        return embed;
    }
}


module.exports = new Get();