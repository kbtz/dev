<script setup lang="ts">
import Pointer from '<Pointer.vue';
import Backdrop from '<Backdrop.vue';
import Header from '<Header.vue';
import Menu from '<Menu.vue';
import Main from '<Main.vue'
import Footer from '<Footer.vue';
</script>

<template>
	<Header />
	<Menu />
	<Main />
	<Footer />
	<Backdrop />
	<Pointer />
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

.pointer {
	grid-area: 1 / 1 / -1 / -1;
	z-index: 12;
	pointer-events: none;
}

canvas {
	grid-area: 1 / 1 / -1 / -1;
	z-index: 11;
	pointer-events: none;
	// display: none;
}

header {
	grid-area: 3 / 3 / 4 / -3;
}

menu {
	grid-area: 4 / 3 / 6 / -3;
}

main {
	grid-area: 1 / 3 / -1 / -3;
	display: none;
}

footer {
	grid-area: 6 / 3 / 7 / -3;
}

.pointer {
	z-index: 12;
}
</style>