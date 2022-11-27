import { SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';

/**
 * The main client of the bot. This is where you can add your own properties and methods. You can also override the default SapphireClient methods.
 * @extends SapphireClient
 */
class NeroClient extends SapphireClient {
	constructor(option: ClientOptions) {
		super(option);
	}
	public async main(token: string): Promise<NeroClient> {
		this.logger.info('Starting NeroClient...');
		this.logger.info('Logging in');
		await this.login(token).catch((e) => this.logger.error(e));
		this.logger.info('logged in');

		return this;
	}
}

export { NeroClient };
