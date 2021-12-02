const app= globalThis,
{ prototype: proto
, defineProperty: def
} = Object;
app.def = def;
[ '𝚔' // keys
, '𝚟' // values
, '𝚍𝚎𝚏' // def prop
, '𝚐𝚎𝚝' // def getter
, '𝚜𝚎𝚝' // def getter
].map(n => app[n]= Symbol(n))

// my.prop[𝚐𝚎𝚝].foo = ()=> random()

def(proto, 𝚍𝚎𝚏, {
	get: function() {
		const self= this
		return (n, d) => def(self, n, d) }})

def(proto, 𝚜𝚎𝚝, {
	get() {
		return new Proxy(this, {
			set(obj, prop, set) {
				def(obj, prop, { set } )
			}
		})
	}
})

def(proto, 𝚐𝚎𝚝, {
	get() {
		return new Proxy(this, {
			set(obj, prop, get) {
				def(obj, prop, { get } )
			}
		})
	}
})
