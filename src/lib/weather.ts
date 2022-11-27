import { fetch, FetchResultTypes } from '@sapphire/fetch';

// create function to fetch weather api data
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
export async function getWeather(city: string): Promise<OpenWeatherMapJson> {
	const response = await fetch<OpenWeatherMapJson>(
		`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`,
		{ method: 'GET' },
		FetchResultTypes.JSON
	);
	return response;
}
