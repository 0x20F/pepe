const axios = require('axios').default;


class Feed {
    feeds = {};

    boot = async client => {
        client.on('message', message => {
            let content = message.content;

            if (!content.startsWith('$feed')) {
                return;
            }

            // What subreddit to feed, and to what channel
            let what = content.substring(content.indexOf(' ') + 1);
            let channel = message.channel;
            let feedId = channel.toString() + what;

            // Add identifiers with content to prevent colisions
            this.feeds[feedId] = {
                interval: setInterval(async what => {
                    let feed = this.feeds[feedId];

                    if (feed.fetchedContent.length > 0) {
                        let next = feed.fetchedContent.pop();

                        channel.send(next.title);
                        channel.send(next.url);

                        feed.seenContent.push(next);
                    }

                    if (feed.fetchedContent.length === 0) {
                        console.log('Fetching more for feed', feedId);
                        await this.request(what, results => feed.fetchedContent = this.shuffle(results));
                    }

                }, 1E4, what, feedId),
                seenContent: [],
                fetchedContent: []
            }
        });
    }


    request = async (subreddit, callback) => {
        axios.get(`https://www.reddit.com/r/${subreddit}/top.json?sort=top&t=day&limit=100`)
            .then(response => response.data.data.children)
            .then(data => callback(data.map(post => post.data)))
            .catch(err => console.log(err));      
    }


    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}


module.exports = new Feed();