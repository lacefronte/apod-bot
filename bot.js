

import { Client, EmbedBuilder, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { CronJob } from 'cron';
import * as apod from './commands/apod.js';

config();


const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

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

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);