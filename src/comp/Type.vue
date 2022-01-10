<script lang="ts" setup>
import { ref, watch } from 'vue';

const
	mask = ref(''),
	props = defineProps({
		text: { type: String, required: true },
	})

watch(props, (next, _, invalidate) => animate(next.text, invalidate))

let prev: 𝞁
function animate(next: 𝞁, invalidate: 𝝺) {
	const rev = !next.length, text = rev ? prev : next
	let size = rev ? prev.length : 0
	const
		t = .2, d = t * text.length, chars = text.chars,
		char = () => chars.pick,
		bump = every(t / 3, () => mask.value =
			Array.from(new Array(size), char).join('')),
		grow = every(t, () => size += rev ? -1 : 1),
		done = after(d, () => mask.value = next),
		cancel = () => [bump, grow, done].each(clearInterval)

	invalidate(cancel)
	cancel.after(d)
	prev = next
}
</script>

<template>
	<span>{{ mask }}</span>
</template>