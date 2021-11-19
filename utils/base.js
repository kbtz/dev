/** @global */
const
	{ querySelector: sel, createElement: el } = document,
	{ assign: merge, keys, values } = Object,
	{ assert, error, info, log } = console,
	assign = t => o => merge(t, o),
	bind = to => fn => fn.bind(to),
	fallback = (t, k, v) => !!t[k] || (t[k] = v),
	register = assign(globalThis);

[sel, el].map(bind(document))

register({
	sel, el,
	merge, keys, values,
	assert, error, info, log,
	assign, bind, register,
})

merge(Object.prototype, {
	merge(o) {
		merge(this, o)
	},
	keys() {
		return keys(this)
	},
	values() {
		return values(this)
	},
	map(...fns) {
		let k, f, o = merge({}, this)
		for (k of this.keys())
			for (f of fns)
				o[k] = f(o[k], k)
		return o
	},
})

// [].at for Safari
fallback(Array.prototype, 'at', function (i) { return this[i] })
