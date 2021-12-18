const {assign:join, defineProperties:props}= Object
, {defineProperty:prop, ownKeys:keys}= Reflect

Object.prototype.plug= function(props) {
	let base= this.prototype || this, value
	
	for(const name of keys(props)) {
		switch(typeof (value= props[name])) {
			case 'object':
				prop(base, name, value)
				break
			case 'function':
				value= value.compile()
				
				if(value.isGetter)
					prop(base, name, {get: value})
				else base[name]= value
				break } } }

const aliases=
	{ prop: 'Reflect.defineProperty'
	, join: 'Object.assign'
	, array: 'Array.isArray'
	, keys: 'Reflect.ownKeys'
	, pair: 'Object.entries'
	, cancel: 'clearInterval'
	, after: 'setTimeout'
	, vk: '(v, k) =' }
, transforms=
	[ [/~\w+/g, alias],
	, ['>-', ['', ' => ()=> ']]
	, ['>>=', ['for(const [K, V] of Object.entries(', '))']]
	, ['<<=', ['const ', '= T.', '.bond']]
	, [/\[{[^\]]+}]/, capture]
	, ['𝞃', ['', '*1000']]
	, ['>>', ['new Proxy(', ', { get: (P, K) => ', '})']]
	, ['<<', ['new Proxy(', ', { set: (P, K, V) => ', '})']] ]

Function.prototype.compile= function() {
	if(!this.isLambda) return this
	
	const [head, tail]= slit(this.toString(), '=>')
	, args= clean(head, '(', ')').split(', ').filter(a => a)
	, body= clean(tail, '{', '}')
			.replace(/(?<!\|)\|(?!\|)/g, '\n')
			.split('\n')
			.map(l => l.trim())
	
	body.forEach((line, i) =>
		body[i]= transforms.reduce((l, t) =>
			patch(l, ...t), line))
	
	const lastLine= body.slice(-1)[0]
	if(canReturn(lastLine))
		body.splice(-1, 1, 'return ' + lastLine)
	
	let code = body.join('\n')
	
	code = [
		'const T= this, O= {}, A= []',
		"let S= ''", code].join('\n')
	
	return new Function(...args, code) }

props(Function.prototype, 
{ isLambda: { get: function() { return !this.prototype } }
, isGetter: { get: function() { return !this.length } }
})

function slit(s, p) {
	const idx= s.indexOf(p)
	if(idx < 0) return [s]
	return [s.slice(0,idx), s.slice(idx + p.length)] }

function patch(s, p, t, ...a) {
	if(s.search(p) < 0) return s
	
	if(Array.isArray(t)) {
		let [l, m= '', r= ''] = t
		const [sl, sr]= slit(s, p).map(x => x.trim())
		s= l+sl+m+sr+r }
	else if(typeof t == 'function')
		s= t(s, ...a)
	
	return patch(s, p, t, ...a) }

function clean(s, lc, rc= lc) {
	s= s.trim()
	let l= 0, r= s.length
	while(s[l]==lc && l<r) l++;
	while(s[r-1]==rc && r>l) r--;
	return s.substring(l, r) }

function mirror(s, p) {
	const [l, r]= slit(s, p)
	return r+p+l }

function capture(s) {
	const m = s.match(/(\w+)\[({[^}]+})]/)
	, [w, n, d] = m
	s = s.slice(0, m.index) + d + s.slice(m.index + w.length)
	s += '\nconst ' + n + '= ' + d.replace(/\w+:/g, '')
	return s }

function alias(s) {
	return s.replace(/~\w+/g, n =>
		aliases[n=n.slice(1)] || n+' => '+n )}

function canReturn(s) {
	return !['return', 'for', 'const']
		.some(p => s.startsWith(p)) }

free.plug()
