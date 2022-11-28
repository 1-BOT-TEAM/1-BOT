import { fetch, FetchResultTypes } from '@sapphire/fetch';
// create function to fetch weather api data

export async function getWeather(city: string): Promise<OpenWeatherMapJson> {
	const response = await fetch<OpenWeatherMapJson>(
		`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`,
		{ method: 'GET' },
		FetchResultTypes.JSON
	);
	return response;
}

export async function getWeatherByCoordinates(lat: number, lon: number): Promise<OpenWeatherMapJson> {
	const response = await fetch<OpenWeatherMapJson>(
		`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`,
		{ method: 'GET' },
		FetchResultTypes.JSON
	);
	return response;
}
