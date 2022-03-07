import '#main.scss'
import { watch } from "vue"

const { style } = document.documentElement
watch(state.theme, ({ bright, saturate, hue }) => {
	style.filter = ({
		invert: +bright,
		sepia: +(!!saturate),
		saturate, hue
	}).concat(([k, v]) =>
		k == 'hue'
			? `${k}-rotate(${v}deg) `
			: `${k}(${v}) `)
})
