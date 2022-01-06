<script setup lang='ts'>
import Backdrop from '<Backdrop.vue';
import Scene from '<Scene.vue';

const { cover, pointer } = state.track
</script>

<template>
	<main :class="{ cover, pointer }">
		<Scene />
		<Backdrop />
	</main>
</template>

<style>
main {
	width: 100vw;
	height: 100vh;
}

main.pointer {
	cursor: pointer;
}
</style>