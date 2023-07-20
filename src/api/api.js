import axios from 'axios';

const apiKey = '5a0c348f24d3bb1d66f639572d6583db';

const weatherInstance = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5/',
});

const cityInstance = axios.create({
	baseURL: 'http://api.openweathermap.org/geo/1.0/',
});

export let cityApi = {
	getCityByName: (cityName) => {
		return cityInstance.get(`direct?q=${cityName}&appid=${apiKey}`);
	},
};

export let weatherApi = {
	getCurrentWeatherData: (lat, lon) => {
		return weatherInstance.get(`weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=uk`);
	},
	getCurrentHourlyWeather: (lat, lon) => {
		return weatherInstance.get(`forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
	},
};
