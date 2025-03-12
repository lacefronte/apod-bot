/* 
AUTHOR: lacefronte
PURPOSE: 
Command should fetch the photo plus the explanation of the APOD at a certain time each day at 0930 EST
*/

import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { config } from 'dotenv';

config();

// Creates the command name and description on Discord
export const data = new SlashCommandBuilder()
    .setName('apod')
    .setDescription('APOD Bot fetches information on today\'s Astronomy Picture of the Day');

// Handles request from NASA website

export async function execute(interaction) {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.APIKEY}`)
    const data = await response.json();

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

    await interaction.editReply({ embeds: [apodEmbed] });

    
}