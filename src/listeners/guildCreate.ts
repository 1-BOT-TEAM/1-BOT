import { ApplyOptions } from '@sapphire/decorators';
import { Events, ListenerOptions } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import type { Guild } from 'discord.js';

@ApplyOptions<ListenerOptions>({
	event: Events.GuildCreate
})
export class UserEvent extends Listener<typeof Events.GuildCreate> {
	public async run(guild: Guild) {
		this.container.logger.info(`Joined ${guild.name} (${guild.id})`);
	}
}
