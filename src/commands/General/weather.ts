import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { getWeather } from '../../lib/weather';
@ApplyOptions<Command.Options>({
	aliases: ['weth'],
	description: 'Get the weather for a location',
	quotes: [],
	options: ['location'],
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder.setName(this.name).setDescription(this.description).addStringOption((option) =>
				option.setName('location').setDescription('The location to get the weather for').setRequired(true)
			)
		);

	}

	public async messageRun(message: Message, args: Args) {
		const location = await args.rest('string');
		const result = await getWeather(location);
		this.container.logger.info(result);
		const embed = new MessageEmbed()
			.setColor('#FF0000')
			.setTitle(`Weather for ${location}`)
			.setDescription(`**${result.weather[0].description}**`)
			.addFields(
				{ name: 'Temperature', value: `${result.main.temp}°C`, inline: true },
				{ name: 'Feels Like', value: `${result.main.feels_like}°C`, inline: true },
				{ name: 'Humidity', value: `${result.main.humidity}%`, inline: true },
				{ name: 'Wind Speed', value: `${result.wind.speed}m/s`, inline: true },
				{ name: 'Cloudiness', value: `${result.clouds.all}%`, inline: true }
			)
			.addFields(
				{ name: 'Sunrise', value: new Date(result.sys.sunrise * 1000).toLocaleTimeString(), inline: true },
				{ name: 'Sunset', value: new Date(result.sys.sunset * 1000).toLocaleTimeString(), inline: true }
			)
			.setThumbnail(`http://openweathermap.org/img/wn/${result.weather[0].icon}.png`)
			.setTimestamp();

		return await message.reply({ embeds: [embed] });
	}
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		const location = interaction.options.getString('location', true);
		const result = await getWeather(location);
		this.container.logger.debug(result);
		const embed = new MessageEmbed()
			.setColor('#FF0000')
			.setTitle(`Weather for ${location}`)
			.setDescription(`**${result.weather[0].description}**`)
			.addFields(
				{ name: 'Temperature', value: `${result.main.temp}°C`, inline: true },
				{ name: 'Feels Like', value: `${result.main.feels_like}°C`, inline: true },
				{ name: 'Humidity', value: `${result.main.humidity}%`, inline: true },
				{ name: 'Wind Speed', value: `${result.wind.speed}m/s`, inline: true },
				{ name: 'Cloudiness', value: `${result.clouds.all}%`, inline: true }
			)
			.addFields(
				{ name: 'Sunrise', value: new Date(result.sys.sunrise * 1000).toLocaleTimeString(), inline: true },
				{ name: 'Sunset', value: new Date(result.sys.sunset * 1000).toLocaleTimeString(), inline: true }
			)
			.setThumbnail(`http://openweathermap.org/img/wn/${result.weather[0].icon}.png`)
			.setTimestamp();

		return await interaction.reply({ embeds: [embed] });
	}
}
