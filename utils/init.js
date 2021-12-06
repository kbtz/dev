import './base.js'

for(let lib of ['meta', 'misc', 'func', 'math', 'dom', 'net'])
	await source(lib)

