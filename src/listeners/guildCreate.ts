import type { Events } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import type { Guild } from 'discord.js';

export class UserEvent extends Listener<typeof Events.GuildCreate> {
	public async run(guild: Guild) {
		this.container.logger.info(`Joined ${guild.name} (${guild.id})`);
	}
}
