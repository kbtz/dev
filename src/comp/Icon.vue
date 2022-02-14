<script lang="ts" setup>
import { viewBox, paths } from '#menu.icons.json'

const { icon } = defineProps<{
	icon: keyof typeof paths
}>()

</script>
<template>
	<svg :viewBox="`0 0 ${viewBox}`" :class="`icon icon-${icon}`">
		<path v-for="(data, idx) in paths[icon]" :class="`layer-${idx}`" :d="data" />
	</svg>
</template>

<style lang="scss">
.icon {
	path {
		fill: currentColor;
	}

	path.layer-0:not(:last-child) {
		opacity: 0.6;
	}

	path.layer-2 {
		opacity: 0.4;
	}
}
</style>