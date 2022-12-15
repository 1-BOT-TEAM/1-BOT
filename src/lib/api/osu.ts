import { fetch, FetchResultTypes } from '@sapphire/fetch';

export async function getUser(username: string): Promise<OsuUserJson> {
	const response = await fetch<OsuUserJson>(
		`https://osu.ppy.sh/api/get_user?k=${process.env.OSU_API_KEY}&u=${username}`,
		{ method: 'GET' },
		FetchResultTypes.JSON
	);
	// return to json not object
	return response;
}
