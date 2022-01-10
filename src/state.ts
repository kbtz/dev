import { computed, reactive } from 'vue';

const
	state = reactive({
		page: '/',
		cover: true,
		intro: true,
		pointer: false,
	}),
	track = Proxy.reader((name, cache) =>
		cache[name] ||= computed(() => state[name as keyof State]))

state[𝞀].track = () => track

for (let name in state)
	window[𝞀][name] = () => state[name as keyof State]

window[𝞏] = { state }

export type State = typeof state