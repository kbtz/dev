<script lang="ts" setup>
import { provide, reactive } from 'vue'
import vResize from '-resize'
import Item from '<MenuItem.vue'

const container = reactive({
	gap: 6,
	unit: 60,
	origin: [0, 0]
})

function onResize({ width, height }: DOMRect) {
	container.unit = height / 2
	container.gap = container.unit * .1
	container.origin = [width / 2, height / 2]
}

provide('container', container)
</script>

<template>
	<menu v-resize="onResize">
		<Item :center="[0, 0]">
			<Item :size=".8" :anchor="5" :align="1"></Item>
			<Item :size=".8" :anchor="0" :align="-1">
				<Item :size="1" :anchor="5" :align="-1" />
			</Item>
		</Item>
	</menu>
</template>

<style lang="scss">
menu {
	margin: 0;
	padding: 0;
	outline: 1px solid red;
	position: relative;
}
</style>