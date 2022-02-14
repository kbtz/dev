<script lang="ts" setup>
import { watch, reactive, onMounted } from "vue"
const
	{ style } = document.documentElement,
	theme = reactive({
		invert: 0,
		sepia: 0,
		saturate: 0,
		'hue-rotate': '0'
	})

watch(theme, () => {
	style.filter = theme
		.map((v, k) => `${k}(${v})`)[𝝼]
		.join(' ')
})

function shuffle() {
	theme.sepia = (1).dice
	if (theme.sepia) {
		theme.invert = 0
		theme.saturate = 1 + (4).dice
		theme['hue-rotate'] = 10 * (36).dice + 'deg'
	} else {
		theme.invert = (1).dice
	}
}

onMounted(shuffle)
shuffle.every(2)
</script>

<template>
	<button @click="shuffle">eee</button>
</template>

<style>
html {
	will-change: filter;
	transition: filter 1s ease-out;
}
</style>