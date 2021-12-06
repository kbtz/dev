window.main= window
main.register= (o, t= main) => Object.assign(t, o)

register(
{ symbols: (... s) => s.map(n => main[n] = Symbol(n))
, source: async path => {
	if(/^[a-z]/.test(path))
		path= `./${path}`
	// TODO stats
	return await import(path + '.js')}
})
