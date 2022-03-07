import { computed, reactive } from 'vue';

const
	state = reactive({
		router: {

			page: '/',
		},
		backdrop: {
			cover: true,
			intro: true,
		},
		pointer: {
			cta: false,
		},
		theme: {
			bright: false,
			saturate: 0,
			hue: 0
		}
	}),
	track = Proxy.reader((name, cache) =>
		cache[name] ||= computed(() => state[name as keyof State]))

state[𝞀].track = () => track

window[𝞏] = { state }

export type State = typeof state