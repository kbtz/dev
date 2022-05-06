import { reactive } from 'vue';

const state = reactive({
	router: {
		page: '/',
	},
	theme: {
		bright: false,
		saturate: 0,
		hue: 0
	},
	backdrop: {
		cover: true,
		intro: false,
	},
	pointer: {
		cta: false,
	}
})

window[𝞏] = { state }

export type State = typeof state