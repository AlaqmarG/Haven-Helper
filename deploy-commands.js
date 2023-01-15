require('dotenv').config

const { REST, Routes } = require('discord.js');
const fs = require('node:fs');

const ClientId = process.env.CLIENT_ID;
const Token = process.env.DISCORD_TOKEN

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
};

const rest = new REST({ version: '10' }).setToken(Token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) command(s).`);

        const data = await rest.put(
            Routes.applicationCommands(ClientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) comamnd(s)`)
    } catch (error) {
        console.error(error)
    };
})();