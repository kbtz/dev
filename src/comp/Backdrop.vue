<script setup lang='ts'>
import { ref, watch, onMounted, onUnmounted } from 'vue'

import backdrop from '|backdrop'
import vPage from '-page'
import shaders from '#shaders.glsl?raw'

const canvas = ref()

onMounted(() => {
	backdrop.is.done = false
	backdrop.init(canvas.value, shaders)
	backdrop.icon = '/logo.svg'
})

onUnmounted(() => {
	// break render call chain for HMR
	backdrop.is.done = true
})

watch(state.backdrop, ({ cover }) => {
	if (cover) backdrop.close()
	else backdrop.open()
})
</script>

<template>
	<canvas ref="canvas" v-page="backdrop.events" />
</template>