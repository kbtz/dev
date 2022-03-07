Function[𝝠].after = function (this: 𝝺, seconds: 𝝶, ...a: 𝞌[]) {
	return setTimeout(() => this(...a), seconds * 1000)
}

Function[𝝠].every = function (this: 𝝺, seconds: 𝝶, ...a: 𝞌[]) {
	return setInterval(() => this(...a), seconds * 1000)
}

Function[𝝠].debounce = function (this: 𝝺, seconds: 𝝶, ...a: 𝞌[]) {
	clearInterval(this.hold)
	return this.hold = this.after(seconds, ...a)
}