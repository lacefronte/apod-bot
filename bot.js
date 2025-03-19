import { Client, Events, GatewayIntentBits, EmbedBuilder } from 'discord.js';
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

    // Embed object for the NASA APOD post
    const apodEmbed = new EmbedBuilder()
        .setColor(`Blurple`)
        .setTitle(`${data.title}`)
        .setURL(`https://apod.nasa.gov/apod/astropix.html`)
        .setAuthor({ name: `NASA`, iconURL:`https://i.imgur.com/S4oQ4OT.png`, url: `https://www.nasa.gov/`})
        .setDescription(`${data.explanation}`)
        .setThumbnail(`https://i.imgur.com/S4oQ4OT.png`)
        .addFields( { name: `Date`, value: `${data.date}` })
        .setImage(`${data.url}`)
        .setTimestamp()
        .setFooter({ text: `${data.copyright}`, iconURL: `https://i.imgur.com/S4oQ4OT.png`});
    
    // 86400000 milliseconds = 24 hours
    try {
        setInterval( () => {
        testChannel.send({ embeds: [apodEmbed] });
    }, 86400000);}

    catch(err) {
        console.error(err);
        console.log('Oop, something went wrong D:');
    }
})