import { computed, reactive } from 'vue';

const state = reactive({
	page: '/',
	cover: true,
	pointer: false,
})

const value = new Proxy(state, {
	get: (s, k: keyof State) => computed(() => s[k])
})

export type State = typeof state

for (let name in state)
	window[𝞀][name] = () => state[name as keyof State]

window[𝞏] = { state, value }