import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { getUser } from '../../lib/api/osu';

@ApplyOptions<Command.Options>({
    aliases: ['osu'],
    description: 'Get information about a osu! user',
    quotes: [],
    options: ['username'],
})
export class UserCommand extends Command {
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description).addStringOption((option) =>
                option.setName('username').setDescription('The osu! user to get information for').setRequired(true)
            )
        );

    }

    public async messageRun(message: Message, args: Args) {
        const username = await args.rest('string');
        const result = await getUser(username);
        this.container.logger.info(result);
        // osu user info
        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`osu! user ${username}`)
            .addFields(
                { name: 'Name', value: `${result.username}`, inline: true },
                { name: 'playcount', value: `${result.playcount}`, inline: true },
                { name: 'ranked_score', value: `${result.ranked_score}`, inline: true },
                { name: 'total_score', value: `${result.total_score}`, inline: true },
                { name: 'pp_rank', value: `${result.pp_rank}`, inline: true },
                { name: 'level', value: `${result.level}`, inline: true },
                { name: 'pp_raw', value: `${result.pp_raw}`, inline: true },
                { name: 'accuracy', value: `${result.accuracy}`, inline: true },
            )
            .setThumbnail(result.avatar_url)
            .setTimestamp();


        return await message.reply({ embeds: [embed] });
    }
    public async chatInputRun(interaction: Command.ChatInputInteraction) {
        const username = interaction.options.getString('username', true);
        const result = await getUser(username);
        this.container.logger.debug(result);
        // osu user info    
        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`osu! user ${username}`)
            .addFields(
                { name: 'Name', value: `${result.username}`, inline: true },
                { name: 'playcount', value: `${result.playcount}`, inline: true },
                { name: 'ranked_score', value: `${result.ranked_score}`, inline: true },
                { name: 'total_score', value: `${result.total_score}`, inline: true },
                { name: 'pp_rank', value: `${result.pp_rank}`, inline: true },
                { name: 'level', value: `${result.level}`, inline: true },
                { name: 'pp_raw', value: `${result.pp_raw}`, inline: true },
                { name: 'accuracy', value: `${result.accuracy}`, inline: true },
            )
            .setThumbnail(result.avatar_url)

        return await interaction.reply({ embeds: [embed] });
    }
}