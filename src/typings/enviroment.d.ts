declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			NODE_ENV: 'development' | 'production';
			OPENWEATHERMAP_API_KEY: string;
		}
	}
}

export {};
