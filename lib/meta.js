symbols('𝚙𝚛𝚘𝚝𝚘', '𝚔𝚎𝚢𝚜', '𝚟𝚊𝚕𝚞𝚎𝚜', '𝚝', '𝚝𝚢𝚙𝚎', '𝚊𝚍𝚍')

Object.defineProperty(Object.prototype, 𝚙𝚛𝚘𝚝𝚘,
	{ set(props) {
		for(let k of Reflect.ownKeys(props))
			Object.defineProperty(this.prototype, k, { get: props[k] } )
		return true }
	, get() {
		return new Proxy(this.prototype, {
			set(o, k, v) {
				if(!v.set) v.configurable = true
				Object.defineProperty(o, k, v)
				return true }})
	}})

Object[𝚙𝚛𝚘𝚝𝚘][𝚊𝚍𝚍]= 
{ set(props) {
	Object.assign(this, props)
	return true }}

Object[𝚙𝚛𝚘𝚝𝚘] =
{ [Symbol.iterator]: function() {
	return function*() {
		for(let e of Object.entries(this))
			yield e }}
, [𝚔𝚎𝚢𝚜]: function() { return Object.keys(this) } 
, [𝚟𝚊𝚕𝚞𝚎𝚜]: function() { return Object.values(this) } 
, [𝚝]: function() {
	return this[𝚝𝚢𝚙𝚎][0] }
, [𝚝𝚢𝚙𝚎]: function() {
	let t= (
		{ object: 'obj'
		, string: 'str'
		, number: 'num'
		, function: 'fun'
		, boolean: 'bit' }
	)[typeof this]
	if(t == 'obj' && Array.isArray(this)) t = 'vec'
	return t }
}

