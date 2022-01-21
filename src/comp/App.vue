<script setup lang="ts">
import Backdrop from '<Backdrop.vue';
import Header from '<Header.vue';
import Menu from '<Menu.vue';
import Main from '<Main.vue'
</script>

<template>
	<Backdrop />
	<Header />
	<Menu />
	<Main />
</template>

<style lang="scss">
$cols: 12;
$rows: 6;

body {
	display: grid;
	grid-template: repeat($rows, 1fr) / repeat($cols, 1fr);

	margin: 0;
	height: 100vh;
	overflow: hidden;
}

canvas {
	z-index: 11;
	grid-area: 1 / 1 / -1 / -1;
	display: none;
}

header {
	grid-area: 3 / 3 / 4 / -3;
}

menu {
	grid-area: 4 / 3 / 5 / -3;
}

main {
	grid-area: 1 / 3 / -1 / -3;
	display: none;
}

cursor {
	z-index: 12;
}
</style>