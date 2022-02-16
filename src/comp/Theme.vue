<script lang="ts" setup>
import { watch, reactive, onMounted } from "vue"
import ThemeIcon from '<ThemeIcon.vue'

export type ThemeMode = {
	bright: 𝝱
	saturate: 𝝶
	hue: 𝝶
}

const
	{ style } = document.documentElement,
	mode = reactive<ThemeMode>({
		bright: false,
		saturate: 0,
		hue: 0
	})

watch(mode, ({ bright, saturate, hue }) => {
	style.filter = ({
		invert: +bright,
		sepia: +(!!saturate),
		saturate, hue
	}).reduce((a = '', v, k) => a +
		(k == 'hue'
			? `${k}-rotate(${v}deg) `
			: `${k}(${v}) `))
})

//onMounted(() => mode.bright = true)
</script>

<template>
	<ThemeIcon :mode="mode" />
	<ThemeIcon :mode="mode" style="--size:32px" />
</template>

<style>
html {
	will-change: filter;
	transition: filter 1s ease-out;
}
</style>