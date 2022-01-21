Object[𝞀][𝝹] = function (this: 𝝷) {
	return Reflect.ownKeys(this)
} as 𝞌

Object[𝞀][𝝼] = function (this: 𝝷) {
	return Object.values(this)
} as 𝞌

Object[𝞀][𝝹𝝼] = function (this: 𝝷) {
	return Reflect.ownKeys(this)
		.map(k => [k, this[k]])
		.map(e => ({ k: e[0], v: e[1] })[𝞈] = e)
} as 𝞌

Object[𝞃][𝞈] = function (target: 𝝷) {
	Object.assign(target, this)
	return true
}

Object[𝞃][𝞏] = function (target: 𝝷) {
	Object.assign(this, target)
	return true
}

Object[𝝠].map = function <T extends Dict>(this: T, f: 𝝺) {
	let res = {} as Dict

	for (const [k, v] of this[𝝹𝝼]!)
		res[k] = f(v, k)

	return res as T
}