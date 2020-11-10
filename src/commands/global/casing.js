class Get {
    boot = async client => {
        client.on('message', async message => {
            let content = message.content;

            if (!content.startsWith('$rrCase')) {
                return;
            }

            message.delete();

            content = content.split(' ');
            content.shift();
            content = content.join(' ').split('');
            let final = '';

            for (let i = 0; i < content.length; i++) {
                if (i % 2 === 0) {
                    final += content[i].toUpperCase();
                } else {
                    final += content[i].toLowerCase();
                }
            }

            message.channel.send(final);
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