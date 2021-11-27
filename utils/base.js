const sel= document.querySelector.bind(document)
, el= document.createElement.bind(document)
, on= (t, e, f) => t.addEventListener(e, f)
, { PI, random, floor, ceil } = Math
, { assert, error, info, log } = console
, { assign: merge, keys, values, freeze } = Object
, assign= t => o => merge(t, o)
, factory= (fn, t= {}) => new Proxy(t,
		{ get: (o,k) => o[k] === undefined
			? (o[k] = fn(k, o))
			: o[k] })
, text= async (path) => (await fetch(path)).text()
, now= ()=> (Date.now()/1000)%100000 // 32bit float
, res= ()=> {
		const { innerWidth: w, innerHeight: h }= window
		return [w, h]}
, register= assign(globalThis)

register(
{ sel, el, on
, PI, random, floor, ceil
, assert, error, info, log
, merge, keys, values, assign, freeze, factory
, text, now, res
, register
	// TODO remove consts
, count: o => keys(o).length
, vmap: (o, f) => keys(o).map(k => o[k] = f(o[k], k))
})

// Array.at for Safari
if(!Array.prototype.at) Array.prototype.at = function (i) { return this[i] }
