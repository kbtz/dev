import { computed, reactive } from 'vue';

const state = reactive({
	page: '/',
	closed: true
})

const value = new Proxy(state, {
	get: (s, k: keyof State) => computed(() => s[k])
})

export type State = typeof state
window[𝞏] = { state, value }