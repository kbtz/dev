const {wgl}= util
, wall= await fetch('/comp/wall.glsl')

await done(base, wgl)

const canvas= body.find('canvas#wall')
, gl= new WGL(canvas, {alpha: false, preserve: true})
, {main, grid}= gl.compile(await wall.text())
, [ping, pong, icon]= [,,,].make(gl.texture)

let w, h, tile= 12
, hover= false, closed= true, paused= false

gl.textures.push(ping, pong, pong, icon)
grid.fbo= gl.framebuffer()

gl.quad(), gl.link()

gl.uniform= {S: tile}
main.uniform= {ping: '0', pong: '1'}
grid.uniform= {self: '2', icon: '3', Wc: 0, Wt: -10}

const pp= () => {
	l(grid.uniform.Wc++)
	grid.uniform.Wt= gl.uniform.T }
setTimeout(pp, 2000)
setInterval(pp, 5000)

resize(), redraw()

const {target:logo}= await fetch.image('/icon/logo.png')
icon.update(logo.size, logo)

window.on.resize= resize.debounce(2)
window.on.move= move
window.on.click= click
window.on.focus= ()=> paused= false
window.on.blur= ()=> paused= true










function redraw() {
	if(paused) redraw.after(1)
	else frame(draw) }

function draw() {
	if(gl.tick() % 2) {
		pong.bind(2)
		grid.fbo.texture(ping) }
	else {
		ping.bind(2)
		grid.fbo.texture(pong) }
	
	gl.draw(grid, main)
	redraw() }

function resize() {
	const R= [w,h]= size
	, G= [w/tile, h/tile*2].ceil
	
	canvas.width= w, canvas.height= h
	main.size= R, grid.size= G
	ping.update(G), pong.update(G)
	gl.uniform= {R, G, F: 0}
	gl.resized= true }

function move([x, y]) {
	gl.uniform.M= [x/w,(h-y)/h]
	const [key]= gl.read()
	hover= closed && key > 100
	body.tag({hover}) }

function click([x, y]) {
	gl.uniform.C= [x/w,(h-y)/h,gl.uniform.T]
	if(closed && hover)
		open() }

function open() {
	body.tag.hover.off
	grid.uniform.W= [1, gl.uniform.T]
	closed= false }

function close() {
	grid.uniform.W= [0, gl.uniform.T]
	closed= true }

free.back()
