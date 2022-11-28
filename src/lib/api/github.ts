import { fetch, FetchResultTypes } from '@sapphire/fetch';

export async function getUser(username: string): Promise<GithubUserJson> {
    const response = await fetch<GithubUserJson>(
        `https://api.github.com/users/${username}`,
        { method: 'GET' },
        FetchResultTypes.JSON
    );
    return response;
}