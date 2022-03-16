<script lang="ts" setup>
import vPage from '-page'
import { ref } from 'vue';

const
	point = ref<HTMLElement>(null as 𝞌),
	ring = ref<HTMLElement>(null as 𝞌),
	size = 24

function pointermove({ isPrimary, pageX: x, pageY: y }: PointerEvent) {
	if (!isPrimary) return

	point.value.style.transform = `translate(${x}px, ${y}px)`
	setTimeout(() => {
		ring.value.style.transform = `translate(${x}px, ${y}px)`
	}, 20)
}
</script>

<template>
	<div class="pointer" v-page="{ pointermove }" :style="`--base-size:${size}px`">
		<div ref="point" class="point" />
		<div ref="ring" class="ring" />
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
		--size: calc(0.4 * var(--base-size));
		background: var(--gray);
	}

	.ring {
		--size: var(--base-size);
		transition: all 80ms ease-out;
		border: 2px solid var(--gray);
		box-sizing: border-box;
	}
}
</style>