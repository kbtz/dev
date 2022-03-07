interface Object {
	[𝞈]: 𝝷
	[𝞏]: 𝝷
	[𝞀]: Dict<OGet>
	[𝞃]: Dict<OSet>
	[𝝠]: Dict<𝝺>
	[k: 𝞁]: 𝞌 | undefined
	str: 𝞁
	map<T>(this: T, f: 𝝺): T & 𝝷
	reduce<T, R>(this: T, f: (...a: 𝞌[]) => R, acc?: R): R
	concat<T>(this: T, f: 𝝺): 𝞁
}

type Dict<T = 𝞌, K extends 𝞁 = 𝞁> =
	{
		[𝝹]?: K[]
		[𝝼]?: T[]
		[𝝹𝝼]?: KVP<K, T>
	} & {
		[P in K]?: T
	}

interface ProxyConstructor {
	trap: <T extends 𝝷, V>(target: T, set: PSet<T, V>) => T
	reader: <T>(read: (key: 𝞁 | 𝝻, target: 𝝷) => T) => 𝝷<T>
	writer: <T>(write: (key: 𝞁 | 𝝻, value: T, target: 𝝷) => 𝝱) => 𝝷<T>
}

interface Number {
	up: 𝝶
	px: 𝞁
	int: 𝝶
	abs: 𝝶
	vec: 𝝣<𝝶>
	dice: 𝝶
	random: 𝝶
	between: (min: 𝝶, max: 𝝶, inclusive?: 𝝱) => 𝝱
	clamp: (from: 𝝶, to: 𝝶) => 𝝶
}

interface Function {
	after: (seconds: 𝝶, ...a: 𝞌[]) => 𝝶
	every: (seconds: 𝝶, ...a: 𝞌[]) => 𝝶
	debounce: (seconds: 𝝶, ...a: 𝞌[]) => 𝝶
	hold: 𝝶
}

interface Array<T> {
	[𝝹]: 𝝶[]
	[𝝼]: T[]
	[𝝹𝝼]: KVP<𝝶, T>
	add: (v: 𝝣<𝝶> | 𝝶) => T[]
	sub: (v: 𝝣<𝝶> | 𝝶) => T[]
	amp: (v: 𝝣<𝝶> | 𝝶) => T[]
	div: (v: 𝝣<𝝶> | 𝝶) => T[]
	has: (word: 𝞁) => 𝝱
	pick: T
	each: Array<T>['forEach']
	make(): null[]
	make<R>(maker: (index: 𝝶) => R): R[]
}

interface String {
	in: (words: 𝞁[]) => 𝝱
	chars: 𝞁[]
	words: 𝞁[]
}

interface Element {
	on: typeof HTMLElement.prototype.addEventListener
	off: typeof HTMLElement.prototype.removeEventListener
	xy: 𝝶[]
	center: 𝝶[]
}

interface Window {
	exec: (context: 𝝷, source: 𝞁) => 𝞌
	on: typeof Window.prototype.addEventListener
	off: typeof Window.prototype.removeEventListener
	size: {
		width: number
		height: number
	}
}