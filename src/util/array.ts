Array[𝝠].each = Array.prototype.forEach

Array[𝝠].has = function (this: 𝞌[], word: 𝞁) {
	return this.indexOf(word) >= 0
}

Array[𝝠].make = function <T>(this: 𝞌[], maker: (...a: 𝞌[]) => T): T[] {
	return [...this[𝝹]].map(maker)
}

Array[𝞀].pick = function <T>(this: T[]): T {
	const { ceil, random } = Math
	return this[ceil(random() * this.length) - 1]
}

Array[𝞃]['+'] = function (this: 𝝣<𝝶>, value: 𝝶 | 𝝣<𝝶>) {
	for (const k of Object.keys(this))
		this[+k] += Array.isArray(value) ? value[+k] : value
	return true
}