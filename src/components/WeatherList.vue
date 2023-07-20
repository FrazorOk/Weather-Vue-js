<script>
import { cityApi, weatherApi } from '../api/api';
import WeatherCard from './WeatherCard.vue';

export default {
	components: {
		WeatherCard,
	},

	data() {
		return {
			weatherList: [],
			maxBlocks: 5,
			removed: false,
			removedIndex: 0,
			limitedMode: false,
		};
	},

	props: {
		citys: {
			type: Array,
			required: true,
		},
		addedMode: {
			type: Boolean,
			required: true,
		},
	},

	methods: {
		setWeatherNewBlock() {
			if (this.weatherList.length < this.maxBlocks) {
				this.weatherList.push({
					city: '',
					localName: '',
					description: '',
					icon: '',
					speed: '',
					humidity: '',
					pressure: '',
					feelsLike: '',
					temp: '',
					tempMin: '',
					tempMax: '',
					fetched: false,
					favorite: false,
					hourlyList: {
						dataList: [],
						tempList: [],
					},
				});
			} else {
				this.limitedMode = true;
			}
		},
		removeBlock(index) {
			this.removed = true;
			this.removedIndex = index;
			// this.weatherList = this.weatherList.filter((block, indexBlock) => indexBlock !== index);
		},
		removeWeatherBlock() {
			this.removed = false;
			this.weatherList = this.weatherList.filter((block, indexBlock) => indexBlock !== this.removedIndex);
		},
		unremovedMode() {
			this.removed = false;
			this.removedIndex = 0;
		},
		toggleLimitedMode() {
			this.limitedMode = false;
		},
		updateCity(inputCity, index) {
			this.setInfoInWeatherBlock(inputCity, index);
		},
		setCity(name, index, localName) {
			this.weatherList[index].city = name;
			this.weatherList[index].localName = localName;
		},
		setWeather(data, index) {
			let { weather, wind, main } = data;
			this.weatherList[index].description = weather[0].description;
			this.weatherList[index].icon = weather[0].icon;
			this.weatherList[index].speed = wind.speed;
			this.weatherList[index].feelsLike = main.feels_like;
			this.weatherList[index].temp = main.temp;
			this.weatherList[index].tempMin = main.temp_min;
			this.weatherList[index].tempMax = main.temp_max;
			this.weatherList[index].humidity = main.humidity;
			this.weatherList[index].pressure = main.pressure;
		},
		setHourlyWeatherList(data, index) {
			let dataList = data.data.list.map((item) => item.dt_txt);
			let tempList = data.data.list.map((item) => item.main.temp);

			this.weatherList[index].hourlyList.dataList = dataList;
			this.weatherList[index].hourlyList.tempList = tempList;
		},

		toggleFetched(status, index) {
			this.weatherList[index].fetched = status;
		},
		follow(index) {
			if (this.weatherList[index].city) {
				let storedCitys = JSON.parse(localStorage.getItem('citys'));

				if (storedCitys.length < this.maxBlocks) {
					storedCitys.push(this.weatherList[index].city);
					localStorage.setItem('citys', JSON.stringify(storedCitys));

					this.weatherList[index].favorite = true;
				} else {
					this.limitedMode = true;
				}
			}
		},
		unfollow(index) {
			if (this.weatherList[index].city) {
				let storedCitys = JSON.parse(localStorage.getItem('citys'));

				let arr = storedCitys.filter((city) => city !== this.weatherList[index].city);

				localStorage.setItem('citys', JSON.stringify(arr));

				this.weatherList[index].favorite = false;
			}

			// for favorite page
			if (!this.addedMode) {
				this.removeBlock(index);
			}
		},

		async getCity(name) {
			let getCity = await cityApi.getCityByName(name);

			if (getCity.data.length > 0) {
				let response = {
					lat: getCity.data[0].lat,
					lon: getCity.data[0].lon,
					localName: getCity.data[0].local_names.uk,
					status: true,
				};

				return response;
			} else {
				let response = {
					status: false,
				};

				return response;
			}
		},
		async getWeather(lat, lon) {
			let response = await weatherApi.getCurrentWeatherData(lat, lon);

			return response.data;
		},
		async getHourlyWeather(lat, lon) {
			let hurlyWeather = weatherApi.getCurrentHourlyWeather(lat, lon);

			return hurlyWeather;
		},
		async setInfoInWeatherBlock(city, index) {
			let currentCityName = await this.getCity(city);

			if (currentCityName.status) {
				let currentWeatherData = await this.getWeather(currentCityName.lat, currentCityName.lon);
				let hurlyWeather = await this.getHourlyWeather(currentCityName.lat, currentCityName.lon);

				this.setCity(city, index, currentCityName.localName);
				this.setWeather(currentWeatherData, index);
				this.setHourlyWeatherList(hurlyWeather, index);
				this.toggleFetched(true, index);

				let storedCitys = JSON.parse(localStorage.getItem('citys'));

				this.weatherList[index].favorite = false;

				storedCitys.forEach((storedCity) => {
					if (storedCity === this.weatherList[index].city) {
						this.weatherList[index].favorite = true;
					}
				});
			}
		},
	},

	mounted() {
		this.citys.forEach((city, index) => {
			this.setWeatherNewBlock();
			this.setInfoInWeatherBlock(city, index);
		});
	},
};
</script>

<template>
	<div class="weather-list">
		<ul>
			<li v-for="(item, index) in this.weatherList">
				<WeatherCard
					@update="updateCity"
					@remove="removeBlock"
					@follow="follow"
					@unfollow="unfollow"
					:item="item"
					:index="index"
					:addedMode="addedMode"
				/>
			</li>
		</ul>
		<button class="added-button" v-if="this.addedMode" @click="setWeatherNewBlock"></button>
		<div v-if="this.removed" class="popup">
			<div class="popup__container">
				<h3>Ви впевнені, що хочете видалити?</h3>
				<div class="popup__btns">
					<button @click="removeWeatherBlock">Видалити</button>
					<button @click="unremovedMode">Повернутися</button>
				</div>
			</div>
		</div>
		<div v-if="this.limitedMode" class="popup">
			<div class="popup__container">
				<h3>Перевищенний ліміт блоків, спочатку видаліть інший блок</h3>
				<div class="popup__btns">
					<button @click="toggleLimitedMode">Закрити</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.weather-list ul {
	display: flex;
	flex-direction: column;
	gap: 25px;
}
.weather-list .added-button {
	position: relative;

	display: block;
	margin: 0 auto;
	margin-top: 30px;

	padding: 35px;

	border: 4px solid rgb(55, 69, 97);
	border-radius: 50%;
	box-shadow: 10px 10px 15px rgb(0, 0, 0, 0.3);

	background-color: white;

	transition: all 0.3s ease 0s;
}

.weather-list .added-button:hover {
	background-color: rgb(55, 69, 97);
}

.weather-list .added-button::after {
	content: '';

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%);

	width: 70%;
	height: 4px;

	border-radius: 8px;
	background-color: rgb(55, 69, 97);

	transition: all 0.3s ease 0s;
}
.weather-list .added-button::before {
	content: '';

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%) rotate(90deg);

	width: 70%;
	height: 3px;

	border-radius: 6px;
	background-color: rgb(55, 69, 97);

	transition: all 0.3s ease 0s;
}

.weather-list .added-button:hover::after {
	background-color: white;
}
.weather-list .added-button:hover::before {
	background-color: white;
}

.popup {
	position: fixed;
	top: 0;
	left: 0;

	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.453);

	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.342);
}
.popup h3 {
	font-size: 22px;
	text-align: center;
	color: rgb(55, 69, 97);
}
.popup button {
	color: rgb(55, 69, 97);
	font-size: 18px;

	padding: 8px 15px;

	background-color: transparent;
	border: 2px solid rgb(55, 69, 97);
	border-radius: 24px;

	transition: all 0.3s ease 0s;
}
.popup button:hover {
	color: white;
	background-color: rgb(55, 69, 97);
}
.popup__container {
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%);

	width: fit-content;

	padding: 40px;

	border-radius: 25px;

	background-color: white;
}
.popup__btns {
	display: flex;
	justify-content: center;
	gap: 20px;

	margin-top: 30px;
}
</style>
