<script lang="ts" setup>
import { computed, inject, provide } from 'vue';
import vPlace from '-place'

interface Container {
	origin: 𝝣<𝝶>
	unit: 𝝶
	gap: 𝝶
}

interface Parent {
	center: 𝝣<𝝶>
	size: 𝝶
}

const props = defineProps<{
	center?: [𝝶, 𝝶]
	size?: 𝝶
	anchor?: 𝝶
	align?: 𝝶
}>()

const
	container = inject<Container>('container')!,
	length = (s: 𝝶) => Math.sqrt(3) * (s / 4)

const self = computed(() => {
	const
		{ gap, unit, origin } = container,
		attach = props.anchor != undefined

	let { size = 1, align = 0 } = props,
		center: 𝝣<𝝶>

	size *= unit

	if (attach) {
		const
			parent = inject<Ref<Parent>>('parent', {} as 𝞌)!.value,
			distance = gap + length(parent.size) + length(size),
			angle = (30 + props.anchor! * 60),
			translation = angle.vec.map(v => v * distance)

		center = parent.center.slice()
		center['+'] = translation
		if (align) {
			const alignment = (parent.size - size) / 4 * align
			center['+'] = (angle + 90).vec.map(v => v * alignment)
		}
	} else {
		center = props.center?.map(v => v * unit) || [0, 0]
		center['+'] = origin
	}

	return { center, size }
})

provide('parent', self)
</script>

<template>
	<li v-place="self"></li>
	<slot></slot>
</template>

<style lang="scss">
body > menu > li {
	list-style: none;
	position: absolute;
	background: var(--light);

	mask-image: url("/hex.png");
	mask-size: contain;
	-webkit-mask-image: url("/hex.png");
	-webkit-mask-size: cover;

	&:hover {
		background-color: aquamarine;
	}
}
</style>