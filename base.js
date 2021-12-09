const {prototype:root, assign:join, entries} = Object
, {defineProperty:prop, ownKeys:keys} = Reflect
, {iterator:iter} = Symbol
, reg= o => join(main, o)

reg(
{ sym: (... s) => s.map(l => main[n]= Symbol(n))
, getter: (t, n, get) => prop(t, n, { get, configurable: true })
, setter: (t, n, set) => prop(t, n, { set, configurable: true })
, reg })

root[iter]= function*() {
	for(const entry of entries(this)) yield entry }

sym('𝚙𝚛𝚘𝚙', '𝚑𝚘𝚘𝚔', '𝚐𝚊𝚝𝚎')
setter(root, 𝚙𝚛𝚘𝚙, function(o) {
	for(const [n,g] of o) getter(this.prototype, n, g) })
setter(root, 𝚑𝚘𝚘𝚔, function(o) {
	for(const [n,s] of o) setter(this.prototype, n, s) })
setter(root, 𝚐𝚊𝚝𝚎, function(f) {
	let type= f.lenght > 2 ? 'set' : 'get'
	return new Proxy(this, { [type]: f }) }
	
sym('𝚙𝚞𝚝')
Object[𝚑𝚘𝚘𝚔]= {
	[𝚙𝚞𝚝]: function(o) { join(this, o) } }

sym('𝚝𝚢𝚙𝚎', '𝚋𝚘𝚗𝚍')
Object[𝚙𝚛𝚘𝚙]=
{ [𝚝𝚢𝚙𝚎]: function() {
	let type= typeof this
	if(Array.isArray(this)) type= 'vec'
	else if(type == 'boolean') type= 'bit'
	else if(type == null) type= 'nil'
	else type= type.slice(0,3)
	return type }
, [𝚋𝚘𝚗𝚍]: function() {
	return this[𝚐𝚊𝚝𝚎]= (t, fn) => t[fn].bind(t) }
}

Array[𝚙𝚛𝚘𝚙]=
{ each: Array.forEach }

const {trunc} = Math
Number[𝚙𝚛𝚘𝚙]=
{ int: function() { return trunc(this) }
, dec: function() { return this - this.int } }

sym('𝚊𝚝𝚝𝚛', '𝚝𝚊𝚐')
Element[𝚑𝚘𝚘𝚔]=
{ [𝚊𝚝𝚝𝚛]: function(attrs) {
	for(const [a, v] of attrs)
		this.setAttribute(a, v) } }
Element[𝚙𝚛𝚘𝚙]=
{ [𝚊𝚝𝚝𝚛]: function() {
	return this[𝚐𝚊𝚝𝚎] = (e, a) => e.getAttribute(a) }
, [𝚝𝚊𝚐]: function() {
	return this[𝚐𝚊𝚝𝚎]= (e, n) => (
		{ get on() { e.classList.add(n) }
		, get off() { e.classList.remove(n) }
		, get flip() { e.classList.toggle(n) }
		, valueOf: ()=> e.classList.has(n) }) } }

sym('𝚘𝚗')

EventTarget[𝚙𝚛𝚘𝚙]=
{ [𝚘𝚗]: function() {
	// TODO cant ret from set
	gatter((e, h, t= this) => t.addEventListener(e, h))
	this[𝚐𝚊𝚝𝚎]= (t, e, h) => t.addEventListener(e, h) }
