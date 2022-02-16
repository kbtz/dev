<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { ThemeMode } from '<Theme.vue'

const
	size = 512, pad = 32, center = size / 2,
	count = 10, step = 360 / (count * 2),
	radius = center - pad,
	clip = (radius - pad * 3).int,
	dot = (clip * .7).int,
	star = [1 + count * 2].make(
		idx => (step * idx)
			.vec.amp(idx % 2 ? radius - pad * 1.5 : radius)
			.map(v => v.int).join(',')
	),
	{ mode } = defineProps<{
		mode: ThemeMode
	}>()

function toggle() {
	mode.bright = !mode.bright
}
</script>

<template>
	<svg :viewBox="`0 0 ${size} ${size}`" class="icon icon-theme" @click="toggle">
		<g :transform="` translate(${center} ${center})`">
			<defs>
				<rect id="th-rect" :x="-center" :y="-center" :width="size" :height="size" />
				<circle id="th-circle" cx="0" cy="0" :r="clip" />
				<clipPath id="th-clip">
					<use href="#th-circle" transform="translate(-16 0)" />
				</clipPath>
				<mask id="th-mask">
					<use href="#th-rect" fill="white" />
					<use href="#th-circle" fill="black" />
				</mask>
			</defs>
			<g class="icon-theme-shapes">
				<path
					mask="url(#th-mask)"
					:d="`M ${star[0]} L ${star.slice(1).join(' L')} L ${star[0]} Z`"
					:transform="`rotate(${mode.bright ? 36 * 3 : 0})`"
				/>
				<g clip-path="url(#th-clip)">
					<circle
						cx="0"
						cy="0"
						:r="dot"
						:transform="`translate(${mode.bright ? 0 : -dot} 0) scale(${mode.bright ? 1 : 1.4})`"
					/>
				</g>
			</g>
		</g>
	</svg>
</template>

<style lang="scss" >
$t: 0.6s;

.icon-theme {
	outline: 1px solid grey;

	&-shapes {
		path,
		circle {
			fill: var(--light);
			fill-rule: evenodd;
			transition: transform $t cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}
}
</style>