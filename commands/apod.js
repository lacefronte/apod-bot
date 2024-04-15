/* 
AUTHOR: lacefronte
PURPOSE: 
Command should fetch the photo plus the explanation of the APOD at a certain time each day
around 9AM NST
*/

import { SlashCommandBuilder } from "discord.js";
import { config } from 'dotenv';

config();

export const data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('This is a demo.');

export async function execute(interaction) {
    await interaction.reply('picture should be here');
}

async function fetchNasaInfo() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=' + process.env.APIKEY)
    const data = await response.json()
    return data
}