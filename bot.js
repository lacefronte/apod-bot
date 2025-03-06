

import { Client, EmbedBuilder, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
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

    // calls execute function when user types "/apod"
    if (interaction.commandName === 'apod') {
        await apod.execute(interaction);
        
    }

}





client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);