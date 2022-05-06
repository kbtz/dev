<script lang="ts" setup>
import { computed, inject, provide } from 'vue';
import Icon from '<Icon.vue'

interface Container {
	origin: Point
	unit: 𝝶
	gap: 𝝶
}

interface Parent {
	center: Point
	size: 𝝶
	group: 𝞁
	index: 𝝶
}

const props = defineProps<{
	icon: 𝞁
	center?: Point
	size?: 𝝶
	anchor?: 𝝶
	align?: 𝝶
	group?: 𝞁
}>()

const
	container = inject<Container>('container')!,
	length = (s: 𝝶) => Math.sqrt(3) * (s / 4)

const self = computed(() => {
	const
		{ gap, unit, origin } = container,
		attach = props.anchor != undefined

	let
		{ size = 1, align = 0, group } = props,
		index = 0, center: Point

	size = (size * unit).abs

	if (attach) {
		const
			parent = inject<Ref<Parent>>('parent', {} as 𝞌)!.value,
			distance = gap + length(parent.size) + length(size),
			angle = (30 + props.anchor! * 60),
			translation = angle.vec.map(v => v * distance)

		center = parent.center.slice() as Point
		center.add(translation)
		if (align) {
			const alignment = (parent.size / 2 - size / 2) / 2 * align
			center.add((angle + 90).vec.map(v => v * alignment))
		}

		group = parent.group
		index = parent.index + 1
	} else {
		center = props.center?.map(v => v * unit) as Point
		center ||= [0, 0]
		center.add(origin)
	}

	return { center, size, group, index }
})

provide('parent', self)
</script>

<template>
	<li class="focusable menu-item" :class="`menu-item--${props.icon} menu-item--${self.group}`"
		:style="`--index: ${self.index}; --size: ${self.size}px; left: ${self.center[0]}px; top: ${self.center[1]}px;`">
		<Icon :icon="(props.icon as 𝞌)" />
	</li>
	<slot />
</template>

<style lang="scss">
body>menu>li {
	list-style: none;
	position: absolute;
	background: var(--light);
	color: var(--dark);
	box-sizing: border-box;

	mask-image: url("/hex.svg");
	mask-size: cover;
	-webkit-mask-image: url("/hex.svg");
	-webkit-mask-size: cover;
	clip-path: polygon(28% 8%, 72% 8%, 100% 50%, 72% 92%, 28% 92%, 0% 50%);
	padding: calc(var(--size) * 0.2);
	width: var(--size);
	height: var(--size);
	margin-top: calc(var(--size) * -0.5);
	margin-left: calc(var(--size) * -0.5);

	.icon {
		pointer-events: none;
	}
}
</style>