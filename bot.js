

import { Client, EmbedBuilder, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { CronJob } from 'cron';
import * as apod from './commands/apod.js';

config();

// client object to get APOD bot
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// indicates that bot is running in console
function readyDiscord(){
    console.log( '🚀' + client.user.tag);
}

async function handleInteraction(interaction) {

    if (!interaction.isCommand()) return;

    interaction.deferReply();

    // calls execute function when user types "/apod" and creates CronJob object that posts at 0930EST daily
    if (interaction.commandName === 'apod') {
        const job = new CronJob(
            '30 9 * * *',
             function () {
                apod.execute(interaction);

             });
        job.start();        
    }

}

client.once(Events.ClientReady, readyDiscord);

// APOD authentication 
client.login(process.env.TOKEN);

// APOD signed on and ready to action slash command
client.on(Events.InteractionCreate, handleInteraction);