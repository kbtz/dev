symbols('𝚋𝚒𝚗𝚍')

register(
{ debounce: (t, f) => ()=> {
	clearInterval(f.wait)
	f.wait= setTimeout(f, t)}
})

Object[𝚙𝚛𝚘𝚝𝚘][𝚋𝚒𝚗𝚍] = {
	get() {
		return new Proxy(this, {
			get(o, k) {
				if(typeof o[k] == 'function')
					return o[k].bind(o)
			}})
	}}
