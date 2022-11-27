import type { ClientOptions, ClientPresenceStatus } from 'discord.js';
// import type { InternationalizationContext } from '@sapphire/plugin-i18next';
import { LogLevel } from '@sapphire/framework';

export const ClientOpt: ClientOptions = {
	defaultPrefix: '1!',
	regexPrefix: /^(hey +)?bot[,! ]/i,
	caseInsensitiveCommands: true,
	loadDefaultErrorListeners: false,
	logger: {
		level: process.env.NODE_ENV === 'development' ? LogLevel.Debug : LogLevel.Info
	},
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS'
	],
	partials: ['CHANNEL'],
	loadMessageCommandListeners: true
};

export const PresenceStatus = {
	status: 'online' as ClientPresenceStatus,
	activities: ['Developer', 'Discord Bot', 'Discord.js', 'JavaScript', 'TypeScript'],
	interval: 10000
};
