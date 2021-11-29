const sel= document.querySelector.bind(document)
, el= document.createElement.bind(document)
, on= (t, e, f) => t.addEventListener(e, f)
, { isArray } = Array
, { PI, random, floor, ceil } = Math
, { assert, error, info, warn, log } = console
, { assign: merge, entries: all, keys, values } = Object
, assign= t => o => merge(t, o)
, text= async (path) => (await fetch(path)).text()
, now= ()=> (Date.now()/1000)%100000
, debounce= (f, t) => ()=> {
		clearInterval(f.wait)
		f.wait= setTimeout(f, t)}
, res= ()=> {
		const { innerWidth: w, innerHeight: h }= window
		return [w, h]}
, register= assign(globalThis)

register(
{ sel, el, on, isArray
, PI, random, floor, ceil
, assert, error, info, warn, log
, merge, keys, values, assign, all
, text, now, debounce, res
, register
	// TODO remove consts
, count: o => keys(o).length
, vmap: (o, f) => keys(o).map(k => o[k] = f(o[k], k))
})

// Array.at for Safari
if(!Array.prototype.at) Array.prototype.at = function (i) { return this[i] }
