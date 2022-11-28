import { fetch, FetchResultTypes } from '@sapphire/fetch';

interface OsuUserJson {
    user_id: number;
    username: string;
    count300: number;
    count100: number;
    count50: number;
    playcount: number;
    ranked_score: number;
    total_score: number;
    pp_rank: number;
    level: number;
    pp_raw: number;
    accuracy: number;
    count_rank_ss: number;
    count_rank_ssh: number;
    count_rank_s: number;
    count_rank_sh: number;
    count_rank_a: number;
    country: string;
    total_seconds_played: number;
    pp_country_rank: number;
    events: {
        display_html: string;
        beatmap_id: number;
        beatmapset_id: number;
        date: string;
        epicfactor: number;
    }[];
    avatar_url: string;
}

export async function getUser(username: string): Promise<OsuUserJson> {
    const response = await fetch<OsuUserJson>(
        `https://osu.ppy.sh/api/get_user?k=${process.env.OSU_API_KEY}&u=${username}`,
        { method: 'GET' },
        FetchResultTypes.JSON
    );
    // return to json not object
    return response;
}