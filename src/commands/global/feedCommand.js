

class Feed {
    feeds = {};

    boot = client => {
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
                interval: setInterval(what => {
                        channel.send('A meme for your pleasures on: ' + what);
                        channel.send('Feed id is: ' + feedId);
                    }, 1E3, what, feedId),
                seenContent: [],
                fetchedContent: []
            }

            console.log(this.feeds);    
        });
    }
}


module.exports = new Feed();