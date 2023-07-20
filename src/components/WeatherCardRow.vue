<script>
export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	methods: {
		getImg(icon) {
			let iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
			return iconUrl;
		},
	},
};
</script>

<template>
	<div class="card__weather-item-row">
		<h2>
			<span class="font-size__big" v-if="this.item.temp">{{ this.item.temp }}°C</span>
			<span v-else>Немає данних</span>
		</h2>
		<h3>{{ this.item.localName }}</h3>
		<div v-if="this.item.icon">
			<img class="card__icon" :src="this.getImg(this.item.icon)" alt="" />
			<p class="p_text_upper-case">{{ this.item.description }}</p>
		</div>
	</div>
</template>

<style scoped>
.card__weather-item-row {
	flex: 1 1 60%;
	align-self: flex-end;

	padding: 35px;

	display: flex;
	align-items: center;
	gap: 30px;
}

h2 {
	font-size: 72px;
	font-weight: 600;
}

h3 {
	font-size: 48px;
	font-weight: 600;
}

h2 span {
	font-size: 48px;
	font-weight: 400;
}
h2 span.font-size__big {
	font-size: 72px;
	font-weight: 600;
}

.p_text_upper-case {
	text-transform: uppercase;
}

@media (max-width: 1000px) {
	.card__weather-item-row {
		flex: 1 1 50%;

		padding: 15px;

		gap: 20px;
	}

	h2 {
		font-size: 36px;
	}

	h3 {
		font-size: 36px;
	}

	h2 span {
		font-size: 36px;
	}
	h2 span.font-size__big {
		font-size: 52px;
	}
}
@media (max-width: 765px) {
	.card__weather-item-row {
		flex: 1 1 50%;

		padding: 15px;

		gap: 10px;
		flex-direction: column;
	}

	h2 {
		font-size: 26px;
	}

	h3 {
		font-size: 26px;
	}

	h2 span {
		font-size: 26px;
	}
	h2 span.font-size__big {
		font-size: 34px;
	}
}
@media (max-width: 499px) {
	h2 {
		font-size: 20px;
	}

	h3 {
		font-size: 16px;
	}

	h2 span {
		font-size: 16px;
	}
	h2 span.font-size__big {
		font-size: 20px;
	}
}
</style>
