<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'vue-chartjs';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
	components: { Line },

	props: {
		hourlyList: {
			hourlyList: Object,
			required: true,
		},
	},

	data() {
		return {
			myStyles() {
				return {
					position: 'relative',
				};
			},
			chartOptions: {
				responsive: true,
			},
		};
	},

	mounted() {
		console.log(this.hourlyList);
	},
};
</script>

<template>
	<div class="schedule">
		<div class="schedule__container">
			<Line
				:style="myStyles"
				:options="chartOptions"
				:data="{
					labels: this.hourlyList.dataList,
					datasets: [{ label: 'Температура', backgroundColor: '#f87979', data: this.hourlyList.tempList }],
				}"
			/>
		</div>
	</div>
</template>

<style scoped>
.schedule {
	padding: 35px;
	background-color: white;

	border-bottom-left-radius: 25px;
	border-bottom-right-radius: 25px;
}

@media (max-width: 1000px) {
	.schedule {
		padding: 15px;
	}
}
</style>
