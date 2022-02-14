<script lang="ts" setup>
import { reactive, watch } from 'vue';

const
	size = 512, center = size / 2,
	padding = size * .1,
	radius = size / 2 - padding,
	state = reactive<{
		open: 𝝱
		mode: 'dark' | 'light' | 'color' | 'selector'
	}>({
		open: false,
		mode: 'dark',
	}),
	path = reactive({
		star: star(),
		handle: handle()
	})

function star() {
	const
		{ open, mode } = state,
		count = 8, offset = +open * (180 + 30),
		clip = (open ? padding * .8 : radius - padding * 1.6).int

	const points = [1 + count * 2].make(idx =>
		(offset / 2 + ((360 - offset) / (count * 2) * idx))
			.vec.amp(idx % 2 ? radius : radius - padding * .9)
			.map(v => v.int).join(',')
	)

	return `
		M ${points[0]}
		L ${points.slice(1).join(' L')}
		L ${points[0]}
		Z

		M ${clip},0
		a ${clip},${clip} 0 1,0 ${clip * -2},0
		a ${clip},${clip} 0 1,0 ${clip * +2},0
		Z
	`
}

function handle() {
	return ''
}

watch(state, () => {
	path.star = star()
	path.handle = handle()
})

	; (() => {
		state.open = !state.open
	}).every(5)
</script>

<template>
	<svg :viewBox="`0 0 ${size} ${size}`" class="icon icon-theme">
		<g :transform="` translate(${center} ${center}) rotate(-90)`">
			<path :d="path.star" />
			<g>
				<path :d="path.handle" />
			</g>
		</g>
	</svg>
</template>

<style scoped>
svg {
	outline: 1px solid grey;
}

path {
	fill: var(--light);
	fill: #888;
	fill-rule: evenodd;
	transition: d 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>