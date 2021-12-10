const {prototype:base, assign:join} = Object
, {defineProperty:prop, ownKeys:keys} = Reflect
, {iterator:iter, for:mark} = Symbol

join(global ,
{ expose: values => join(global, values)
, marker: labels => labels.open(mark).pipe(expose)
})

join(base ,
{ plug(o) { join(this.prototype, o) }
, pipe(f, ...a) { return f(this, ...a) }
, each(f, T) { keys(T=this).each(k => f(T[k], k, T)) }
})

Function.plug( 
{ with(...a) {
	const f= this
	return function(...b) {
		return f.call(this, ...a, ...b) } }
})

Array.plug( 
{ each: Array.prototype.forEach
, fold(f, o= {}) {
	this.each(f.with(o)); return o }
, open(f) {
	return this.fold((o, e) => o[e] = f(e)) }
, slot(f) {
	return this.fold((o, e) => o[f(e)]= e) }
})

Element.prop( 
{ flag() {
	// TODO
	return 1 }
})
/*

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
const Ev= { move: 'mousemove' } // TODO touchmove
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
