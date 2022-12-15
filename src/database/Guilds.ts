import type { NeroClient } from '../Nero/NeroClient';
import type { Snowflake } from 'discord-api-types/globals';
import type { guilds, Prisma } from '@prisma/client';

export class GuildDB {
	public constructor(public readonly client: NeroClient) {}
	public async getGuild(id: Snowflake, options: Prisma.guildsFindFirstArgs = {}): Promise<guilds> {
		if (options.select) {
			options.select.id = true;
		}
		// if database not found, create a new one
		const guild = await this.client.prisma.guilds.findFirst({
			where: {
				id
			},
			...options
		});
		if (!guild) {
			return this.client.prisma.guilds.create({
				data: {
					id
				}
			});
		}
		return guild;
	}
}
