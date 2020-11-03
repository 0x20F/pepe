const { MessageEmbed } = require('discord.js');

const axios = require('axios').default;


class Feed {
    feeds = {};

    boot = async client => {
        client.on('message', async message => {
            let content = message.content;

            if (!content.startsWith('$feed') && !content.startsWith('$unfeed')) {
                return;
            }

            // What subreddit to feed, and to what channel
            let subreddit = content.substring(content.indexOf(' ') + 1);
            let channel = message.channel;
            let feedId = channel.toString() + subreddit;

            // Check if cleanup requested
            if (content.startsWith('$unfeed')) {
                channel.send(`Stopping feed for: ${subreddit}`);
                
                clearInterval(this.feeds[feedId].interval);
                delete this.feeds[feedId];

                console.log('Remaining feeds after deletion:', Object.keys(this.feeds).length);
                return;
            }

            // Add identifiers with content to prevent colisions
            this.feeds[feedId] = {
                id: feedId,
                interval: setInterval(async () => await this.next(subreddit, feedId), 1E3 * 60 * 30, subreddit, feedId),
                seenContent: [],
                fetchedContent: [],
                channel: channel
            }


            channel.send(`- Initialized feed for subreddit: ${subreddit}\n- Images/Posts will come in every 30 minutes.\n- Fetching top 100 posts of the week...`);

            // Initial fetch, and run it once
            await this.request(subreddit, results => {
                let feed = this.feeds[feedId];

                feed.fetchedContent = this.shuffle(results);
                this.next(subreddit, feed.id);
            });
        });
    }


    request = async (subreddit, callback) => {
        axios.get(`https://www.reddit.com/r/${subreddit}/top.json?sort=top&t=week&limit=100`)
            .then(response => response.data.data.children)
            .then(data => callback(data.map(post => post.data)))
            .catch(err => console.log(err));      
    }


    next = async (subreddit, feedId) => {
        let feed = this.feeds[feedId];

        if (feed.fetchedContent.length > 0) {
            let next = feed.fetchedContent.pop();
            
            feed.channel.send(this.buildEmbed(next));
            feed.seenContent.push(next);
        }

        if (feed.fetchedContent.length === 0) {
            console.log('Fetching more for feed', feedId);
            await this.request(subreddit, results => feed.fetchedContent = this.shuffle(results));
        }
    }


    buildEmbed = data => {
        let embed = new MessageEmbed()
            .setTitle(data.title)
            .setURL(data.url)
            .setImage(data.url)
            .setFooter(`By u/${data.author}`, data.thumbnail);

        return embed;
    }


    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}


module.exports = new Feed();