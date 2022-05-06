<script lang="ts" setup>
import { ref, provide, reactive, watch } from 'vue'
import vResize from '-resize'
import Item from '<MenuItem.vue'

const
	gap = .02, visible = ref(''),
	{ backdrop } = state,
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

watch(backdrop, ({ cover, intro }) => {
	if (cover || !intro) {
		visible.value = ''
		return
	}
	after(2.5, () => visible.value = 'skill')
	after(6.5, () => visible.value += ' link')
})

provide('container', container)
</script>

<template>
	<menu v-resize="onResize" :class="visible">
		<Item group="skill" icon="vue" :center="[.5, -.2]">
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
		<Item group="link" icon="stackoverflow" :center="[-.25, .1]" :size=".75">
			<Item icon="wakatime" :anchor="4" :size=".5" :align="-1" />
			<Item icon="upwork" :anchor="3" :align="1">
				<Item icon="github" :anchor="2" :size=".75" :align="1" />
				<Item icon="twitter" :anchor="3" :size=".5" :align="-1" />
			</Item>
		</Item>
	</menu>
</template>

<style lang="scss">
menu {
	margin: 0;
	padding: 0;
	position: relative;

	li {
		opacity: 0;
		transition: 300ms opacity linear;
		transition-delay: calc(var(--index) * 50ms);
	}

	&.skill li.menu-item--skill {
		opacity: 1;
	}

	&.link li.menu-item--link {
		opacity: 1;
	}
}
</style>