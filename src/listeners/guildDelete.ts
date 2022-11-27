import { ApplyOptions } from '@sapphire/decorators';
import type { Events, ListenerOptions } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import type { Guild } from 'discord.js';

@ApplyOptions<ListenerOptions>({})
export class UserEvent extends Listener<typeof Events.GuildCreate> {
	public async run(guild: Guild) {
		this.container.logger.info(`Left ${guild.name} (${guild.id})`);
	}
}
