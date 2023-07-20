<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
	<div class="wrapper">
		<div class="container">
			<div class="app-block">
				<header>
					<nav class="route-btns">
						<RouterLink class="route-btn" to="/">Головна</RouterLink>
						<RouterLink class="route-btn" to="/about">Обране</RouterLink>
					</nav>
				</header>
				<main>
					<RouterView />
				</main>
			</div>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	height: 100vh;
	display: flex;
	flex-direction: column;

	background-image: url(./assets/pngwing.com.png);
	background-repeat: no-repeat;
}

.app-block {
	margin-top: 80px;
	margin-bottom: 80px;

	padding: 50px;

	background-color: white;
	border-radius: 35px;

	box-shadow: 15px 15px 35px rgba(0, 0, 0, 0.3);
}

.route-btns {
	display: flex;
	width: fit-content;

	overflow: hidden;

	box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
	border: 2px solid rgb(55, 69, 97);
	border-radius: 20px;
	background-color: rgb(55, 69, 97);
}
.route-btn {
	color: white;
	font-size: 18px;
	text-align: center;

	padding: 12px 25px;

	transition: all 0.3s ease 0s;
}
.route-btn:hover {
	color: rgb(55, 69, 97);

	background: white;
}

main {
	margin-top: 30px;
}

@media (max-width: 1000px) {
	.app-block {
		margin-top: 25px;
		margin-bottom: 25px;

		padding: 35px;
	}
}
</style>
