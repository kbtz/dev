<script lang="ts" setup>
import { provide, reactive } from 'vue'
import vResize from '-resize'
import Item from '<MenuItem.vue'

const
	gap = .02,
	container = reactive({
		gap: 1,
		unit: 10,
		origin: [0, 0]
	})

function onResize({ width, height }: DOMRect) {
	container.unit = height / 2
	container.gap = container.unit * gap
	container.origin = [width / 2, height / 2]
}

provide('container', container)
</script>

<template>
	<menu v-resize="onResize">
		<Item icon="vue" :center="[.5, -.2]">
			<Item icon="nuxt" :anchor="5" :size=".75" :align="1">
				<Item icon="sass" :anchor="5" :size=".5" :align="1">
					<Item icon="tailwind" :anchor="0" :size=".5" />
				</Item>
				<Item icon="figma" :anchor="0" :size=".5" :align="-1" />
			</Item>
			<Item icon="vite" :anchor="0" :size=".5" :align="-1">
				<Item icon="d3" :anchor="0" :size=".75">
					<Item icon="node" :anchor="5" :size=".5" :align="1" />
					<Item icon="r" :anchor="0" :size=".5" :align="-1" />
				</Item>
			</Item>
		</Item>
		<Item icon="github" :center="[-.25, .1]" :size=".75">
			<Item icon="upwork" :anchor="3" :align="1" />
			<Item icon="stackoverflow" :anchor="4" :size=".5" :align="-1" />
		</Item>
	</menu>
</template>

<style lang="scss">
menu {
	margin: 0;
	padding: 0;
	position: relative;
}
</style>