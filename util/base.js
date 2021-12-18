await plug

Window.plug(
{ mark: () => T >> (T[K]= Symbol.for(K))
, done: (...p) => Promise.all(p)
, size: ()=> [T.innerWidth, T.innerHeight]
})

Object.plug( 
{ keys: ()=> ~keys(T)
, vals: ()=> T.keys.map(k => T[k])
, pair: ()=> ~pair(T)
, base: ()=> T.prototype || T.__proto__
, bond: ()=> T >> T[K].bind(T)
, wire: ()=> T.only(~v.isGetter) >>= O.prop(K, V) | O
, prop: (n, get, set) => ~prop(T, n, {get, set})
, trap: (n, set) => ~prop(T, n, {set})
, join: o => ~join(T, o)
, each: f => T >>= f(V, K)
, open: f => T >>= O[K]= f(V, K) | O
, slot: f => T >>= O[f(K, V)]= V | O
, only: f => T >>= f(V, K) && (O[K]= V) | O
, may: ()=> s => T[s] || s
, [mark.𝚃]: ()=> O >> 𝙷.getType(T) == K
})

Function.plug(
{ expose: ()=> window[T.name]= T
, after: (d, ...a) => ~after(()=> T(...a), d𝞃)
, debounce: (d, ...a) =>
		()=> T.Δ= ~cancel(T.Δ) || ~after(()=> T(...a), d𝞃)
})

Array.plug( 
{ size: ()=> T.length
, last: ()=> T[T.size - 1]
, each: f => T >>= f(V, +K)
, fold: f => T >>= f(O, V) | O
, open: f => T.fold((o, v) => o[v]= f(v))
, slot: f => T.fold((o, v) => o[f(v)]= v)
, have: x => T.indexOf(x) >= 0
, make: f => [...T.keys()].map(f)
, ceil: ()=> T.map(Math.ceil)
})

String.plug( 
{ size: ()=> T.length
, till: c => T.slice(0, c[𝚃].N ? c : T.search(c))
, head: p => T.search(p) === 0
, tail: p => T.split(p).last == ''
, words: () => Array.from(new Set(T.split(' ')))
})

Number.plug(
{ ceil: () => Math.ceil(T)
})

Date.prop('sec', ()=> Date.now()/1000)

Element.plug( 
{ tag: ()=>
	C[{add:on, remove:off, toggle:flip, contains:val}] <<= classList |
	~o.each(~vk> [off,on][+!!v](k)) >> C.open(f>-f(K)).wire
, find: s => T.querySelector(s)
})

EventTarget.plug( 
{ on: ()=> 𝙷.event.handle(T) << P(K, V)
})

Image.plug( 
{ size: ()=> [T.width, T.height]
})

fetch.join(
{ text: async path => (await fetch(path)).text()
, image: async src =>
		new Promise(onload =>
			(new Image).join({src, onload}))
})

const page= document
, cel= page.bond.createElement
, {body, head}= page
, frame= requestAnimationFrame

window.join({page, body, head, cel, frame})

// RAW HELPERS
window.𝙷 =
{ getType: x => {
	x= x?.valueOf() ?? x
	let t= (typeof x), s= x.toString()
	t= t=='symbol' ? 'y' : t[0]
	
	if(t=='f' && s.search(/^(fun |\w+\()/) == -1)
		t= s.startsWith('class') ? 'c' : 'l'
	if(Array.isArray(x)) t= 'a'
	
	return t.toUpperCase() }
, event:
	{ handle: t => (e, h) => {
		const {wrap, alias}= 𝙷.event
		t.addEventListener(alias(e), wrap(h))
		return true }
	, wrap: h => (e, ...r) => {
		if(e instanceof MouseEvent)
			h([e.pageX, e.pageY], e, ...r)
		else h(e, ...r) }
	, alias: name => {
		if('move over out enter leave up down'.words.have(name))
			name = 'mouse' + name
		return name } }
} 

free.base()
