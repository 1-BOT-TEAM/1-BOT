import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { getUser } from '../../lib/api/github';

@ApplyOptions<Command.Options>({
	aliases: ['gh'],
	description: 'Get information about a GitHub user',
	quotes: [],
	options: ['username']
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption((option) => option.setName('username').setDescription('The GitHub user to get information for').setRequired(true))
		);
	}

	public async messageRun(message: Message, args: Args) {
		const username = await args.rest('string');
		const result = await getUser(username);
		this.container.logger.info(result);
		const embed = new MessageEmbed()
			.setColor('#FF0000')
			.setTitle(`GitHub user ${username}`)
			.setDescription(`**${result.bio}**`)
			.addFields(
				{ name: 'Name', value: `${result.name}`, inline: true },
				{ name: 'Public Repos', value: `${result.public_repos}`, inline: true },
				{ name: 'Public Gists', value: `${result.public_gists}`, inline: true },
				{ name: 'Followers', value: `${result.followers}`, inline: true },
				{ name: 'Following', value: `${result.following}`, inline: true }
			)
			.setThumbnail(result.avatar_url)
			.setTimestamp();

		return await message.reply({ embeds: [embed] });
	}
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		const username = interaction.options.getString('username', true);
		const result = await getUser(username);
		this.container.logger.debug(result);
		const embed = new MessageEmbed()
			.setColor('#FF0000')
			.setTitle(`GitHub user ${username}`)
			.setDescription(`**${result.bio}**`)
			.addFields(
				{ name: 'Name', value: `${result.name}`, inline: true },
				{ name: 'Public Repos', value: `${result.public_repos}`, inline: true },
				{ name: 'Public Gists', value: `${result.public_gists}`, inline: true },
				{ name: 'Followers', value: `${result.followers}`, inline: true },
				{ name: 'Following', value: `${result.following}`, inline: true }
			)
			.setThumbnail(result.avatar_url)
			.setTimestamp();

		return await interaction.reply({ embeds: [embed] });
	}
}
