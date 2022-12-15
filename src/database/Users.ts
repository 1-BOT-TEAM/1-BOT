import type { NeroClient } from '../Nero/NeroClient';
import type { Snowflake } from 'discord-api-types/globals';
import type { users, Prisma } from '@prisma/client';

export class UserDB {
	public constructor(public readonly client: NeroClient) {}
	public async getUser(id: Snowflake, options: Prisma.usersFindFirstArgs = {}): Promise<users> {
		// if database nto found, create a new one
		const user = await this.client.prisma.users.findFirst({
			where: {
				id
			},
			...options
		});
		if (!user) {
			return this.client.prisma.users.create({
				data: {
					id
				}
			});
		}
		return user;
	}
}
