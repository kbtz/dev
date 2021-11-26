const sel= document.querySelector.bind(document)
, el= document.createElement.bind(document)
, on= (e, f, t) => t.addEventListener(e, f)
, { assert, error, info, log } = console
, { assign: merge, keys, values } = Object
, assign= t => o => merge(t, o)
, text= async (path) => (await fetch(path)).text()
, register= assign(globalThis)

register(
{ sel, el, on
, merge, keys, values, assign
, assert, error, info, log
, text
, register })

merge(Object.prototype,
	{ merge(o) {
			merge(this, o) }
	, keys() {
			return keys(this) }
	, values() {
			return values(this) }
	, map(... fns) {
			let k, f, o = merge({}, this)
			for(k of this.keys())
				for(f of fns)
					o[k] = f(o[k], k)
			return o }})

// Array.at for Safari
if(!Array.prototype.at)
	Array.prototype.at = function (i) { return this[i] }
