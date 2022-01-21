Number[𝞀].vec = function (this: 𝝶) {
	const
		{ PI, cos, sin } = Math,
		rad = this / 180 * PI,
		x = cos(rad), y = sin(rad)
	return { x, y }
}

Number[𝞀].px = function (this: 𝝶) {
	return `${this}px`
}

Number[𝝠].between = function (this: 𝝶, min: 𝝶, max: 𝝶, inclusive = true) {
	return inclusive
		? this >= min && this <= max
		: this > min && this < max
}