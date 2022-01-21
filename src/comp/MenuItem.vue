<script lang="ts" setup>
import { inject, provide } from 'vue';
import vPlace from '-place'

interface Parent {
	center: Point
	size: 𝝶
}

const props = defineProps({
	size: { type: Number, default: 1 },
	origin: { type: Array, validator: (v: 𝝣<𝝶>) => v.length == 2 },
	anchor: { type: Number, validator: (v: 𝝶) => v.between(0, 5) },
	align: { type: Number, default: 0, validator: (v: 𝝶) => v.between(-1, 1) },
})

const
	anchored = props.anchor != undefined,
	unit = 24, lenght = (s: 𝝶) => Math.sqrt(3) * (s / 2)

let center: Point, size = props.size * unit
if (anchored) {
	const
		gap = unit * <𝝶>inject('gap'),
		parent = inject('parent') as Parent,
		angle = 30 + 60 * props.anchor,
		distance = gap + lenght(parent.size) + lenght(size),
		translation = angle.vec.map(v => v * distance)

	center = parent.center.map((v, k) => v + translation[k as 'x' | 'y'])
} else {
	const [x, y] = props.origin! as 𝝣<𝝶>
	center = { x, y }
}

const self = { center, size }
provide('parent', self)
</script>

<template>
	<li v-place="self">
		<i>{{ size }}</i>
	</li>

	<!-- slot to flatten element tree -->
	<slot></slot>
</template>

<style lang="scss">
body > menu > li {
	list-style: none;
	position: absolute;

	background-color: green;
	font-size: 50%;
}
</style>