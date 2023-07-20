<script>
import WeatherList from '../components/WeatherList.vue';

export default {
	components: {
		WeatherList,
	},

	data() {
		return {
			citys: ['Київ'],
		};
	},
};
</script>

<template>
	<div>
		<WeatherList :citys="citys" :addedMode="true" />
	</div>
</template>

<style scoped></style>
