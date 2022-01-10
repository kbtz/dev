String[𝝠].in = function (this: 𝞁, words: 𝞁[]) {
	return words.has(this)
}

String[𝞀].chars = function (this: 𝞁) {
	return Array.from(new Set(this.split('')))
}

String[𝞀].words = function (this: 𝞁) {
	return this.split(' ')
}