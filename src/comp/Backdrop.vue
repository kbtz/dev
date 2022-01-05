<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue'
import vPage from '-page'

import backdrop from '+backdrop'
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

</script>

<template>
	<canvas ref="canvas" v-page="backdrop.events" />
</template>

<style scoped>
canvas {
	pointer-events: none;
	outline: 1px solid red;
}
</style>