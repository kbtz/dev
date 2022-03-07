export class Context {
	constructor(context: 𝝷) {
		let base = (<𝞌>this).__proto__ as Dict<𝝺>
		for (const [name, value] of base[𝝹𝝼]!) {
			if (typeof value != 'function') continue
			if (name == 'constructor') continue

			let source = value.toString()
			if (!source.startsWith('function'))
				source = 'function ' + source
			base[name] = window.exec(context, source)
		}
	}
}
