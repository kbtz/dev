interface Object {
	[𝞈]: 𝝷
	[𝞏]: 𝝷
	[𝞀]: Dict<OGet>
	[𝞃]: Dict<OSet>
	[𝝠]: Dict<𝝺>
	[k: 𝞁]: 𝞌 | undefined
	map<T>(this: T, f: 𝝺): T
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
	vec: Point
	px: 𝞁
	between: (min: 𝝶, max: 𝝶, inclusive?: 𝝱) => 𝝱
}

interface Function {
	after: (seconds: 𝝶, ...a: 𝞌[]) => 𝝶
	debounce: (seconds: 𝝶, ...a: 𝞌[]) => 𝝶
	hold: 𝝶
}

interface Array<T> {
	[𝝹]: 𝝶[]
	[𝝼]: T[]
	[𝝹𝝼]: KVP<𝝶, T>
	has: (word: 𝞁) => 𝝱
	each: Array<T>['forEach']
	make: (maker: (...a: 𝞌[]) => T) => T[]
	pick: T
}

interface String {
	in: (words: 𝞁[]) => 𝝱
	chars: 𝞁[]
	words: 𝞁[]
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