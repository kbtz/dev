<script lang="ts" setup>
import Item from '<MenuItem.vue'
import { provide } from 'vue';

provide('gap', .2)
</script>

<template>
	<menu>
		<Item :origin="[0, 0]">
			<Item :size=".5" :anchor="5">
				<Item :anchor="0" />
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