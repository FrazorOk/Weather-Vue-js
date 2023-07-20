<script>
import Schedule from './Schedule.vue';
import WeatherCardRow from './WeatherCardRow.vue';
import WeatherCardInfo from './WeatherCardInfo.vue';

export default {
	components: {
		Schedule,
		WeatherCardRow,
		WeatherCardInfo,
	},

	data() {
		return {
			inputValue: '',
		};
	},
	props: {
		item: {
			type: Object,
			required: true,
		},
		index: {
			type: Number,
			required: true,
		},
		addedMode: {
			type: Boolean,
			required: false,
		},
	},
	methods: {
		updateCity() {
			this.$emit('update', this.inputValue, this.index);
			this.inputValue = '';
		},
		reomoveBlock() {
			this.$emit('remove', this.index);
		},
		followed() {
			this.$emit('follow', this.index);
		},
		unfollowed() {
			this.$emit('unfollow', this.index);
		},
	},

	mounted() {},
};
</script>

<template>
	<div class="card">
		<div class="card__container">
			<WeatherCardRow :item="this.item" />

			<div class="card__weather-item">
				<div class="card__inputs">
					<input v-model="inputValue" type="text" tabindex="1" placeholder="Введіть місто" />
					<button @click="updateCity" type="button" tabindex="2">ЗНАЙТИ</button>
				</div>

				<WeatherCardInfo :item="this.item" />
			</div>
		</div>

		<Schedule :hourlyList="this.item.hourlyList" />

		<button v-if="this.addedMode" @click="reomoveBlock" class="card__remove-button">Х</button>
		<button v-if="this.item.favorite" @click="unfollowed" class="card__star-button-unsubmit"></button>
		<button v-if="!this.item.favorite" @click="followed" class="card__star-button-submit"></button>
	</div>
</template>

<style scoped>
.card {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 14px;
	color: white;
	text-align: center;

	position: relative;

	border-radius: 25px;
	box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.305);

	background-image: url(https://imgpng.ru/d/air_balloon_PNG19405.png);
	background-size: 13%;
	background-repeat: no-repeat;
	background-position: 35% 10%;
	background-color: rgb(113, 160, 253);
}

.card__container {
	width: 100%;
	height: 100%;
	overflow: hidden;

	position: relative;

	display: flex;
	justify-content: space-between;
	gap: 20px;

	border-top-right-radius: 25px;
}

.card__inputs {
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.305);
}

.card__inputs input {
	width: 100%;
	font-size: 16px;
	padding: 8px 12px;

	border: 1px solid rgb(171, 171, 171);
	background-color: white;
}
.card__inputs button {
	font-size: 16px;
	font-weight: 700;
	color: white;

	padding: 8px 20px;

	background-color: rgba(58, 114, 180, 1);

	transition: all 0.3s ease 0s;
}
.card__inputs button:hover {
	color: white;
	background-color: rgba(34, 44, 63, 0.871);
}

.card__weather-item {
	color: rgb(221, 221, 221);

	flex: 1 1 40%;

	padding: 35px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 35px;

	background: rgba(34, 44, 63, 0.871);
	background: linear-gradient(35deg, rgba(88, 91, 95, 0.7) 0%, rgba(17, 25, 34, 0.7) 100%);
}

.card__remove-button {
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	font-size: 16px;
	font-weight: 700;
	color: rgb(55, 69, 97);

	width: 30px;
	height: 40px;

	position: absolute;
	left: 100%;
	top: 50%;
	transform: translate(0, -50%);

	border: 4px solid rgb(55, 69, 97);
	border-left: none;
	border-top-right-radius: 50%;
	border-bottom-right-radius: 50%;

	background-color: white;

	transition: all 0.3s ease 0s;
}
.card__remove-button:hover {
	color: white;
	width: 40px;
	background-color: rgb(55, 69, 97);
}
.card__star-button-submit {
	width: 40px;
	height: 40px;

	position: absolute;
	top: 20px;
	left: 20px;

	background-color: transparent;
	background-image: url(../assets/star.png);
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}
.card__star-button-unsubmit {
	width: 40px;
	height: 40px;

	position: absolute;
	top: 20px;
	left: 20px;

	background-color: transparent;
	background-image: url(../assets/starWhite.png);
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;

	filter: invert(100%);
	-webkit-filter: invert(100%);
}

@media (max-width: 1000px) {
	.card__weather-item {
		flex: 1 1 50%;

		padding: 15px;

		gap: 25px;
	}
}
@media (max-width: 765px) {
	.card__container {
		flex-direction: column;
	}
}
</style>
