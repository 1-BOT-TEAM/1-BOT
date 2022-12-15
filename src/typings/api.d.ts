interface GithubUserJson {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	name: string;
	company: string;
	blog: string;
	location: string;
	email: string;
	hireable: boolean;
	bio: string;
	twitter_username: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}

interface OpenWeatherMapJson {
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

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
