interface Object {
	[𝞄]: 𝝷
	[𝞀]: Dict<OGet>
	[𝞃]: Dict<OSet>
	[𝝠]: Dict<𝝺>
	[k: 𝞁]: 𝞌 | undefined
}

type Dict<T, K extends 𝞁 = 𝞁> =
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

interface Function {
	after: (seconds: 𝝶, ...a: 𝞌[]) => void
	debounce: (seconds: 𝝶, ...a: 𝞌[]) => void
	hold: 𝝶
}

interface Array<T> {
	[𝝹]: 𝝶[]
	[𝝼]: T[]
	[𝝹𝝼]: KVP<𝝶, T>
	has: (word: 𝞁) => 𝝱
	each: Array<T>['forEach']
	make: <T>(maker: (...a: 𝞌[]) => T) => T[]
}

interface String {
	in: (words: 𝞁[]) => 𝝱
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
