import './lib/setup';
import { NeroClient } from './Nero/NeroClient';
import { ClientOpt } from './config/Config';

const client = new NeroClient(ClientOpt);

process.on('unhandledRejection', (e) => {
	client.logger.error(e);
});

process.on('uncaughtException', (e) => {
	client.logger.fatal(e);
	process.exit(1);
});

client.main(process.env.DISCORD_TOKEN);
