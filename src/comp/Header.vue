<script lang="ts" setup>
import { ref, watch } from 'vue';
import Type from '<Type.vue'

const
	{ backdrop } = state,
	left = ref(''),
	right = ref('')

watch(backdrop, ({ cover }) => {
	if (!cover) {
		backdrop.intro = true
		left.value = 'kbtz'
		after(.3, () => right.value = 'dev')
		after(2, intro)
	} else {
		left.value = right.value = ''
		backdrop.intro = false
	}
})

function intro() {
	const long = 2, short = 1
	right.value = 'web'
	after(short, () => right.value = 'dev')
	after(short + long, () => left.value = 'for')
	after(short + long + short, () => left.value = 'hire')
	after(short + long + short + long, () => left.value = 'kbtz')
}
</script>

<template>
	<header>
		<Type :text="left" />
		<img src="/logo.svg" @click="backdrop.cover = true" />
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