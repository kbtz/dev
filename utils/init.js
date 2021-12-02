import './meta.js'
const sel= document.querySelector.bind(document)
, cel= document.createElement.bind(document)
, on= (t, e, f) => t.addEventListener(e, f)
, { isArray } = Array
, { PI, random, floor, ceil } = Math
, { assert, debug, error, info, warn, log } = console
, { assign: merge, entries: all, keys, values } = Object
, assign= t => o => merge(t, o)
, text= async (path) => (await fetch(path)).text()
, now= ()=> (Date.now()/1000)%100000
, debounce= (t, f) => ()=> {
	clearInterval(f.wait)
	f.wait= setTimeout(f, t)}
, res= ()=> {
	const { innerWidth: w, innerHeight: h }= window
	return [w, h]}
, image= (p, f) => {
	const i = new Image()
	i.onload= f
	i.src= p }
, register= assign(globalThis)
register(
{ sel, cel, on, isArray
, PI, random, floor, ceil
, assert, debug, error, info, warn, log
, merge, keys, values, assign, all
, text, now, debounce, res, image
, register
	// TODO remove consts
, count: o => keys(o).length
, vmap: (o, f) => keys(o).map(k => o[k] = f(o[k], k))
, init: async module => {
	register({ current: module } )
	import(`/${module}/init.js`)
	await new Promise(ready => register({[module]: { ready }}) )
	debug(`[OK] ${module}`)}
, el: (tag, attrs= {}) => {
	const el= cel(tag)
	keys(attrs).map(k => el.setAttribute(k, attrs[k]))
	return el}
, style: (href) => {
	if(!href) href= `/${current}/style.css`
	const link= el('link')
	document.head.appendChild(el('link', {
		href, rel: 'stylesheet' }))}
})

// Array.at for Safari
if(!Array.prototype.at) Array.prototype.at = function (i) { return this[i] }
