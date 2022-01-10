<script lang="ts" setup>
import logo from '#logo.png'
import Type from '<Type.vue'
import { ref, watch } from 'vue';

const
	center = ref(true),
	intro = ref(true),
	left = ref(''),
	right = ref('')

watch(state.track.cover, (closing) => {
	if (!closing && intro) {
		left.value = 'kbtz'
		after(.2, () => right.value = 'dev')
		intro.value = false
	} else {
		left.value = right.value = ''
		intro.value = true
	}
})

</script>

<template>
	<header class="debug-alt" :class="{ center, intro }">
		<Type :text="left" />
		<img :src="logo" @click="state.cover = true" />
		<Type :text="right" @click="center = !center" />
	</header>
</template>

<style lang="scss">
$t: 0.8s;
$m: 48px;
$m0: 6px;

header {
	position: fixed;
	left: 50vw;

	display: flex;
	align-items: center;

	transform: translate(-50%, 0) scale(1);
	font-size: 80px;

	top: 0vh;
	&.center {
		top: 50vh;
		transform: translate(-50%, -50%);
	}

	img {
		vertical-align: middle;
		filter: blur(1px);
	}

	span {
		width: 250px;
		color: #c4c4c490;
		text-shadow: 0 0 3px white, 0 0 4px black;
		margin-top: -8px;
		will-change: transform;
		transition: $t transform ease-out $t * 0.5;
		&:nth-of-type(1) {
			text-align: right;
			transform: translateX($m0);
		}
		&:nth-of-type(2) {
			transform: translateX($m0 * -0.8);
		}
	}

	opacity: 1;
	will-change: transform, opacity;
	transition: $t transform ease-out, $t top ease-out, $t opacity linear;

	&.intro {
		opacity: 0.1;
		transform: translate(-50%, -50%) scale(0.7);
		span:nth-of-type(1) {
			transform: translateX($m);
		}
		span:nth-of-type(2) {
			transform: translateX($m * -1);
		}
	}
}
</style>