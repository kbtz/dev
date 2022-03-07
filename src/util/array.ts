Array[𝝠].each = Array.prototype.forEach

Array[𝝠].has = function (this: 𝞌[], word: 𝞁) {
	return this.indexOf(word) >= 0
}

Array[𝝠].make = function <T>(this: [𝝶], maker: (...a: 𝞌[]) => T): T[] {
	return [...Array(this[0]).keys()].map(maker || (() => null))
}

Array[𝞀].pick = function <T>(this: T[]): T {
	const { ceil, random } = Math
	return this[ceil(random() * this.length) - 1]
}

function operator(kind: 𝞁) {
	return function (this: 𝝣<𝝶>, value: 𝝶 | 𝝣<𝝶>) {
		for (const k of Object.keys(this)) {
			const K = +k, V = Array.isArray(value) ? value[K] : value
			switch (kind) {
				case '+':
					this[K] += V
					break
				case '-':
					this[K] -= V
					break
				case '*':
					this[K] *= V
					break
				case '/':
					this[K] /= V
					break
			}
		}

		return this
	}
}

Array[𝝠].add = operator('+')
Array[𝝠].sub = operator('-')
Array[𝝠].amp = operator('*')
Array[𝝠].div = operator('/')
