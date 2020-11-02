class Meme {
    boot = client => {
        client.on('message', message => {
            if (message.content !== '$memes here') {
                return;
            }

            let channel = message.channel;
            
            // Send a meme every 30 minutes?
            setInterval(() => {
                channel.send('A meme for your pleasures');
            }, 1E3 * 60 * 30);
        });
    }
}


module.exports = new Meme();