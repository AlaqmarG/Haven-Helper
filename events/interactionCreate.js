const { Events } = require('discord.js')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
    
        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) {
            console.error(`No commmand matching ${interaction.commandName} was found`);
            return;
        };
    
        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true})
        };
    }
};
