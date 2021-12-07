register(
{ rel: path => `/mod/${module.current}/${path}`
, module: {} 
, init: async module => {
	source(`/mod/${module}/init`)
	await new Promise(ready =>
		window.module[𝚊𝚍𝚍] = { current: module, ready } )
	log.debug(`[OK] ${module}`)}
})

fetch[𝚊𝚍𝚍]=
{ text: async path =>(await fetch(rel(path))).text()
, json: async path =>(await fetch(rel(path))).json()
, style: (path= 'style') => {
	const link= cel('link')
	head.appendChild(link)
	link[𝚊𝚝𝚝𝚛]=
	{ href: rel(path) + '.css'
	, rel: 'stylesheet' }}
, image: async src => new Promise(loaded => {
	src= rel(src)
	const img= new Image()
	img[𝚊𝚍𝚍] = { src, onload: ()=> loaded(img) } })
}

