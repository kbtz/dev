Array[𝝠].each = Array.prototype.forEach

Array[𝝠].has = function (this: 𝞌[], word: 𝞁) {
	return this.indexOf(word) >= 0
}

Array[𝝠].make = function <T>(this: 𝞌[], maker: (...a: 𝞌[]) => T): T[] {
	return [...this[𝝹]].map(maker)
}