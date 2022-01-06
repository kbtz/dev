<script setup lang='ts'>
import { ref, onMounted, onUnmounted, watch } from 'vue'

import backdrop from '|backdrop'
import vPage from '-page'
import shaders from '#shaders.glsl?raw'
import logo from '#logo.gif'

const canvas = ref()

onMounted(() => {
	backdrop.is.done = false
	backdrop.init(canvas.value, shaders)
	backdrop.icon = logo
})

onUnmounted(() => {
	// break render call chain for HMR
	backdrop.is.done = true
})

watch(state.track.cover, value => {
	if (value) backdrop.close()
	else backdrop.open()
})

</script>

<template>
	<canvas ref="canvas" v-page="backdrop.events" />
</template>

<style >
main canvas {
	position: fixed;
	outline: 1px solid red;
}

main:not(.closed) canvas {
	pointer-events: none;
}
</style>