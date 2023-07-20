<script>
export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
};
</script>

<template>
	<ul class="card__weather-info">
		<li class="card__row">
			<h5>Температура</h5>
			<h5>
				<span v-if="this.item.temp">{{ this.item.temp }}°C</span>
				<span v-else>Немає данних</span>
			</h5>
		</li>
		<li class="card__row">
			<h5>Відчувається</h5>
			<h5>
				<span v-if="this.item.feelsLike">{{ this.item.feelsLike }}°C</span>
				<span v-else>Немає данних</span>
			</h5>
		</li>
		<li class="card__row">
			<h5>Мінімальна</h5>
			<h5>
				<span v-if="this.item.tempMin">{{ this.item.tempMin }}°C</span>
				<span v-else>Немає данних</span>
			</h5>
		</li>
		<li class="card__row">
			<h5>Максимальна</h5>
			<h5>
				<span v-if="this.item.tempMax">{{ this.item.tempMax }}°C</span>
				<span v-else>Немає данних</span>
			</h5>
		</li>
		<div class="card__solid"></div>
		<li class="card__row">
			<h5>Швидкість вітру</h5>
			<h5>
				<span v-if="this.item.speed">{{ this.item.speed }}</span>
				<span v-else>Немає данних</span>
			</h5>
		</li>
		<li class="card__row">
			<h5>Вологість</h5>
			<h5>
				<span v-if="this.item.humidity">{{ this.item.humidity }} %</span>
				<span v-else>Немає данних</span>
			</h5>
		</li>
		<li class="card__row">
			<h5>Атмосферний тиск</h5>
			<h5>
				<span v-if="this.item.pressure">{{ this.item.pressure }} гПа</span>
				<span v-else>Немає данних</span>
			</h5>
		</li>
	</ul>
</template>
<style scoped>
.card__weather-info {
	text-align: start;

	width: 100%;

	display: flex;
	flex-direction: column;
	gap: 20px;
}

.card__row {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
}

.card__solid {
	width: 100%;
	height: 1px;

	border-radius: 4px;
	background-color: rgb(201, 201, 201);
}

h5 {
	font-size: 18px;
	font-weight: 500;
}
h5 span {
	font-size: 14px;
	font-weight: 400;
}
</style>
