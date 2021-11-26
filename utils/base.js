const sel= document.querySelector.bind(document)
, el= document.createElement.bind(document)
, on= (t, e, f) => t.addEventListener(e, f)
, { PI, random, floor, ceil } = Math
, { assert, error, info, log } = console
, { assign: merge, keys, values } = Object
, assign= t => o => merge(t, o)
, factory= (fn, t= {}) => new Proxy(t,
		{ get: (o,k) => o[k] === undefined
			? (o[k] = fn(k, o))
			: o[k] })
, text= async (path) => (await fetch(path)).text()
, register= assign(globalThis)

register(
{ sel, el, on
, PI, random, floor, ceil
, merge, keys, values, assign, factory
, assert, error, info, log
, text
, register })

merge(Object.prototype,
	{ merge(o) {
			merge(this, o) }
	, count() {
			return keys(this).length }
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
