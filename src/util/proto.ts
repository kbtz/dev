const
	options = { enumerable: false, configurable: true },
	{ prototype: proto } = Object,
	{ defineProperty: prop } = Reflect

prop(proto, 𝝠, {
	get(this: ObjectConstructor) {
		console.assert(!!this.prototype, '[𝝠] must be used on constructors')
		return Proxy.trap(this.prototype, (t, k, v: 𝝺) => !!(t[k] = v))
	},
	...options
})

prop(proto, 𝞀, {
	get(this: 𝞌) {
		return Proxy.trap(this.prototype ?? this, (o, k, get: OGet) => prop(o, k, { get, ...options }))
	},
	...options
})

prop(proto, 𝞃, {
	get(this: 𝞌) {
		return Proxy.trap(this.prototype ?? this, (o, k, set: OSet) => prop(o, k, { set, ...options }))
	},
	...options
})
