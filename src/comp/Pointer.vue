<script lang="ts" setup>
import vPage from '-page'
import { ref } from 'vue';

const
	point = ref<HTMLElement>(null as 𝞌),
	ring = ref<HTMLElement>(null as 𝞌),
	focused = {
		element: null as Element | null,
		morph: ref(false),
		scale: 1, x: 0, y: 0
	},
	size = 24

function pointermove({ isPrimary, pageX: x, pageY: y }: PointerEvent) {
	if (!isPrimary) return

	point.value.style.transform = `translate(${x}px, ${y}px)`
	after(.02, () => ring.value.style.transform =
		focused.element
			? `translate(${focused.x}px, ${focused.y}px) scale(${focused.scale})`
			: `translate(${x}px, ${y}px) scale(1)`
	)

	if (state.backdrop.cover) return
	const element = document.elementFromPoint(x, y)
	if (!element) throw 'wat'
	if (element == focused.element) return
	if (element.classList.contains('focusable')) focus(element)
	else blur()
}

function focus(element: Element) {
	const
		{ top, left, width, height } = element.getBoundingClientRect(),
		scale = Math.max(width, height) / size
	focused[𝞏] = {
		element, scale,
		x: left + width / 2,
		y: top + height / 2,
	}

	focused.morph.value = true
}

function blur() {
	if (!focused.element) return
	focused.element = null
	focused.morph.value = false
}

</script>

<template>
	<div class="pointer" v-page="{ pointermove }" :style="`--size-base:${size}px`">
		<div ref="ring" class="ring" :class="{ morph: focused.morph.value }" />
		<div ref="point" class="point" />
	</div>
</template>

<style lang="scss">
:root {
	cursor: none;
}

.pointer {
	position: fixed;
	top: 0;
	left: 0;
	.point,
	.ring {
		position: absolute;
		width: var(--size);
		height: var(--size);
		top: calc(var(--size) * -0.5);
		left: calc(var(--size) * -0.5);
		border-radius: 50%;
		will-change: transform;
	}

	.point {
		--size: calc(0.4 * var(--size-base));
		background: var(--gray);
	}

	.ring {
		--size: var(--size-base);
		transition: all 80ms ease-out;
		border: 2px solid var(--gray);
		box-sizing: border-box;
		backdrop-filter: invert(0);

		&.morph {
			backdrop-filter: invert(1);
			border-width: 0.1px;
			border-color: var(--light);
			-webkit-mask-box-image: url(hex.png);
		}
	}
}
</style>