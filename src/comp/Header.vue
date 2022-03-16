<script lang="ts" setup>
import { ref, watch } from 'vue';
import Type from '<Type.vue'

const
	left = ref('K'),
	right = ref('D')

watch(state.backdrop, ({ cover }) => {
	if (!cover) {
		left.value = 'kbtz'
		after(.2, () => right.value = 'dev')
	} else {
		left.value = 'K'
		right.value = 'D'
	}
})
</script>

<template>
	<header>
		<Type :text="left" />
		<img src="/logo.svg" @click="state.backdrop.cover = true" />
		<Type :text="right" />
	</header>
</template>

<style lang="scss">
header {
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		max-height: 128px;
	}

	span {
		font-size: 80px;
		font-weight: 600;
		flex-basis: 30%;
		flex-grow: 1;

		&:nth-of-type(1) {
			text-align: right;
		}

		&:nth-of-type(2) {
			text-align: left;
		}
	}
}
</style>