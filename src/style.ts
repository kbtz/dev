import '#main.scss'
import { watch } from "vue"

const { style } = document.documentElement

function apply({ bright, saturate, hue }: typeof state.theme) {
	style.filter = ({
		invert: +bright,
		sepia: +(!!saturate),
		saturate, hue
	}).concat(([k, v]) =>
		k == 'hue'
			? `${k}-rotate(${v}deg) `
			: `${k}(${v}) `)
}

watch(state.theme, apply)
apply(state.theme)