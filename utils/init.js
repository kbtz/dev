import './base.js'

for(let lib of ['meta', 'misc', 'func', 'math', 'dom', 'net'])
	await source(lib)

// Array.at for Safari
if(!Array.prototype.at) Array.prototype.at = function (i) { return this[i] }
