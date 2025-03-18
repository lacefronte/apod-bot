import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

// loads process.env contents
config();

// client object to get APOD bot
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// indicates that bot is running in console
function readyDiscord(){
    console.log( '🚀' + client.user.tag);
}

client.once(Events.ClientReady, readyDiscord);

// APOD authentication 
client.login(process.env.TOKEN);


// Finds Discord channel ID to post the Astronomy Photo of the Day in a readable format
client.on('ready', async () => {

    var testChannel = client.channels.cache.find(channel => channel.id === process.env.CHANNELID);
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.APIKEY}`)
    const data = await response.json();
    
    // 86400000 milliseconds = 24 hours
    try {
        setInterval( () => {
        testChannel.send(`## **${data.title}** \n**Credit:** ${data.copyright} \n${data.date} \n\n*${data.explanation}*\n${data.url}`);
    }, 86400000);}

    catch(err) {
        console.error(err);
        console.log('Oop, something went wrong D:');
    }
})