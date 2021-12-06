symbols('𝚊𝚝𝚝𝚛', '𝚘𝚗')

register(
{ cel: document[𝚋𝚒𝚗𝚍].createElement
, page: document
, head: document.head
, body: document.body
})
Element[𝚙𝚛𝚘𝚝𝚘]= {
	sel: function() { return this.querySelector.bind(this) } 
}

// TODO support data-
Element[𝚙𝚛𝚘𝚝𝚘][𝚊𝚝𝚝𝚛]=
{ set(attrs) {
		for(let [k, v] of attrs)
			this.setAttribute(k, v) }
, get() {
		return new Proxy(this,
		{ get(o, k) {
			return o.getAttribute(k) }
		, set(o, k, v) {
			o.setAttribute(k,v) }})
}}

const mobile= false // TODO
, EvAliases=
	{ move: mobile ? 'touchmove' : 'mousemove'
	}
EventTarget[𝚙𝚛𝚘𝚝𝚘][𝚘𝚗]=
{ get() {
	return new Proxy(this, {
		set(o, k, v) {
			if(EvAliases[k]) k= EvAliases[k]
			o.addEventListener(k, v)
			return true}})
}}
