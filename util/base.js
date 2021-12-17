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
	C[{add:on, remove:off, toggle:flip}] <<= classList |
	~o.each(~vk> [on,off][+!!v](k)) >> C.open(f>-f(K)).wire
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

window.join({cel , page, body, head})

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
		t.addEventListener(alias(e), wrap(h)) }
	, wrap: (h, p= []) => (e, ...r) => {
		switch(true) {
			case e instanceof MouseEvent:
				p.push([e.pageX, e.pageY])
			default: 
				h(...p, e, ...r) } }
	, alias: name => {
		if('move over out enter leave up down'.words.have(name))
			name = 'mouse' + name
		return name } }
} 

free.base()

if(plug.log) log.close()

/*

Element.base.prop()
let todo = { flag() {
	const E= this
	return new Proxy(flagger(E), 
	{ get(o, n) {
			const c= E.classList
			, b = new Boolean(c.contains(n))
			prop(b, 'on', { get: ()=> c.add(n) })
			return b
		}
	})
	}
}


const {prototype:base, assign:join} = Object
, {ownKeys:keys, defineProperty:prop} = Reflect

join(global, 
{ expose: values => join(global, values)
, marker: labels => labels.open(mark).pipe(expose)
, reader: (target, get) => new Proxy(t, {get})
})

join(base, 
{ plug(o) { this.prototype.prop(o) }
, prop(o) { prop(this, o.open(get => ({get, configurable: true}))) }
, each(f) { keys(this).vals((k, T= this) => f(T[k], k)) }
, open: f => T >>= T[K] = f(T[K], K)
, pipe(f, ...a) { return f(this, ...a) }
})

Array.plug( 
{ each: f => T >>= f(v, k)
, vals: f => T >>= f(e)
, open: f => { return this.fold((o, e, i) => o[e] = f(e, i)) }
, slot: f => { return this.fold((o, e) => o[f(e, i)]= e) }
, fold: f, o= {}) { this.each(f.with(o)); return o }
, size: ()=> T.length
})

Function.plug( 
{ with(...a) {
	const f= this
	return function(...b) {
		return f.call(this, ...a, ...b) } }
})
Array[𝚋𝚊𝚜𝚎]=
{ id: function(idf) {
	return this.build((o,e,i) => o[idf(e, i)] = e) }
, open: function(of) {
	return this.build((o,e,i) => o[e] = of(e, i)) }
, build: function(builder,o= {}) {
	this.each((e,i) => builder(o, e, i))
	return o }
, each: Array.prototype.forEach
} 

)
free.base()
reg( 
{ symbol: (...s) => s.each(l => main[l]= Symbol.for(l))
, getter: (t, n, get) => prop(t, n, { get, ...opt })
, setter: (t, n, set) => prop(t, n, { set, ...opt })
, proxer: (t, ...fns) => new Proxy(t, fns.id(gXs))
, tagger: e => tags => tags.each(t => e.tag)
, as: t => _ => t
, 𝚌: ([c]) => c.codePointAt()
, 𝚎: ([t]) => page.createElement(t)
, reg
} )

root[iter]= function*() {
	for(const k of keys(this)) yield [k, this[k]] }

sym('𝚙𝚛𝚘𝚙', '𝚑𝚘𝚘𝚔')
setter(root, 𝚙𝚛𝚘𝚙, function(o) {
	o.each((n,g,t=this) => getter(t.prototype, n, g)) }
setter(root, 𝚑𝚘𝚘𝚔, function(o) {
	o.each((n,s,t=this) => setter(t.prototype, n, s)) }
	
sym('𝚋𝚊𝚜𝚎', '𝚑𝚎𝚊𝚍', '𝚝𝚊𝚒𝚕')
Object[𝚑𝚘𝚘𝚔]=
{ [𝚋𝚊𝚜𝚎]: function(o) { this.prototype[𝚝𝚊𝚒𝚕] = o }
, [𝚑𝚎𝚊𝚍]: function(o) { join(this, o, this) } // TODO o.filter
, [𝚝𝚊𝚒𝚕]: function(o) { join(this, o) } }

Object[𝚋𝚊𝚜𝚎]=
{ each: function(f) {
	for(const [k,v] of this) f(v, k)}}


sym('𝚝𝚢𝚙𝚎', '𝚋𝚘𝚗𝚍', '𝚖𝚊𝚢')
Object[𝚙𝚛𝚘𝚙]=
{ [𝚝𝚢𝚙𝚎]: function() {
	let type= typeof this
	if(Array.isArray(this)) type= 'vec'
	else if(type == 'boolean') type= 'bit'
	else if(type == null) type= 'nil'
	else type= type.slice(0,3)
	return type }
, [𝚋𝚘𝚗𝚍]: function() {
	return proxer(this, (t,fn) => t[fn].bind(t)) } }
	
const {trunc} = Math
Number[𝚙𝚛𝚘𝚙]=
{ int: function() { return trunc(this) }
, dec: function() { return this - this.int }}

String[𝚋𝚊𝚜𝚎]=
{ shift: function(d= 𝚌`A`-𝚌`a`) {
		return this.map(c => String.fromCodePoint(𝚌([c]) + d)) }
, map: function(m) {
		return Array.from(this).map(m).join('') }
}

Element[𝚙𝚛𝚘𝚙]=
{ tag: function() {
	const el= this
	return proxer(this, (e, n) => (
		{ get on() { e.classList.add(n) }
		, get off() { e.classList.remove(n) }
		, get flip() { e.classList.toggle(n) }
		, valueOf: ()=> e.classList.contains(n) })) }}

HTMLHeadElement[𝚋𝚊𝚜𝚎]=
{ css: function(path,rel= 'stylesheet',href= `${path}.css`) {
	return this[𝚙𝚞𝚝] = 𝚎`link`.attr({ rel, href }) }}

sym('𝚘𝚗')
EventTarget[𝚙𝚛𝚘𝚙]=
{ [𝚘𝚗]: function() {
	return proxer(this, (t, e, h) =>
		t.addEventListener(Ev[e] || e, h)) } }

fetch[𝚝𝚊𝚒𝚕]=
{ text: async path =>(await fetch('/' + path)).text()
, json: async path =>(await fetch('/' + path)).json()
, image: async src => new Promise(loaded => {
	src= rel(src)
	const img= new Image()
	img[𝚊𝚍𝚍] = { src, onload: ()=> loaded(img) } })
}

// Symbol fetcher for console
main.S = proxer({}, (_,l) => Symbol.for(l.shift(𝚌`𝚊` - 𝚌`a`)))
*/

