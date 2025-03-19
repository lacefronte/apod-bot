# Discord APOD Bot

![image](https://github.com/user-attachments/assets/4490086a-e62d-411b-93ea-22f9d32c1a10)


## Overview

My first Node.js Discord bot project that I started over a year ago that was initially developed using the [Choo Choo Discord Bot Tutorial](https://youtu.be/AvQcTjB3gPg?si=Am0eMYQ7VR3bQU2F) by Coding Train. I then adapted it to get data from NASA's Astronomy Photo of the Day(APOD) https://apod.nasa.gov/apod/astropix.html using Fetch API.

I wanted to automate this process where the bot will post once a day instead of manually inputting a slash command to fetch the data so I had to further reconfigure the bot. The Coding Train tutorial referenced earlier is really good at explaining how to do this if you wanted to go the slash command route. The bot will then be hosted on my Raspberry Pi so that it's able to do its daily post, however you can easily host this on a cloud server instead.

I know this is a really long README but I am being verbose in case anyone who is not familiar to coding comes across this repo and wants to learn.
 
## Prerequisites

To get this Discord bot to work on your computer, ensure you do the following:

- Register for an API Key at https://api.nasa.gov/
- Run `npm install discord.js dotenv` to ensure you have all the necessary dependencies
- Set up your `.env` file in whatever IDE you are using. This is where all your secret keys will reside (ie. The stuff you DON'T want people to see). On that note, if you plan on adding this to your own GitHub, **PLEASE ADD THIS FILE TO YOUR `.gitignore`!!!**

If I miss anything else in this section, I will update.

## Known Issues

- Formatting by APOD Bot can vary depending on how the json data is inputted by NASA. Sometimes you might see 'undefined' for Credit and it just means that the key for 'copyright' isn't set for that photo but you will still see the photo credits when you go to the APOD website.
