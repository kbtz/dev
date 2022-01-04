Function[𝝠].after = function (this: 𝝺, seconds: 𝝶, ...a: 𝞌[]) {
	setTimeout(() => this(...a), seconds * 1000)
}

Function[𝝠].debounce = function (this: 𝝺, seconds: 𝝶, ...a: 𝞌[]) {
	clearInterval(this.hold)
	this.hold = setInterval(() => this(...a), seconds * 1000)
}