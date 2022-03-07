const {
	PI, cos, sin,
	random, round, ceil,
	abs, min, max,
} = Math

Number[𝞀].vec = function (this: 𝝶) {
	const
		rad = this / 180 * PI,
		x = cos(rad), y = sin(rad)

	return [x, y]
}

Number[𝞀].abs = function (this: 𝝶) {
	return abs(this)
}

Number[𝞀].int = function (this: 𝝶) {
	return round(this)
}

Number[𝞀].up = function (this: 𝝶) {
	return ceil(this)
}

Number[𝞀].px = function (this: 𝝶) {
	return `${this}px`
}

Number[𝞀].dice = function (this: 𝝶) {
	return round(random() * this)
}

Number[𝞀].random = function (this: 𝝶) {
	return random() * this
}

Number[𝝠].clamp = function (this: 𝝶, from: 𝝶, to: 𝝶) {
	return max(from, min(to, this))
}

Number[𝝠].between = function (this: 𝝶, min: 𝝶, max: 𝝶, inclusive = true) {
	return inclusive
		? this >= min && this <= max
		: this > min && this < max
}