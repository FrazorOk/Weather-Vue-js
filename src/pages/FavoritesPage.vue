<script>
import WeatherList from '../components/WeatherList.vue';

export default {
	components: {
		WeatherList,
	},

	data() {
		return {
			citys: [],
		};
	},

	methods: {
		setCitys(arr) {
			this.citys = arr;
		},
	},

	mounted() {
		let storedCitys = JSON.parse(localStorage.getItem('citys'));

		this.setCitys(storedCitys);
	},
};
</script>

<template>
	<div>
		<WeatherList v-if="citys.length > 0" :citys="citys" :addedMode="false" />
		<h5 v-else>Немає збережених владок</h5>
	</div>
</template>

<style scoped>
h5 {
	font-size: 36px;

	margin-top: 70px;
}
</style>
