const {wgl}= util
, wall= await fetch('/comp/wall.glsl')

await done(base, wgl)

const canvas= body.find('canvas#wall')
, gl= new WGL(canvas, {alpha: true, preserve: true})
, {main, grid}= gl.compile(await wall.text())
, [ping, pong, icon]= [,,,].make(gl.texture)

let w, h, tile= 12, pause= false

gl.textures.push(ping, pong, pong, icon)
grid.fbo= gl.framebuffer()

gl.quad(), gl.link()

gl.uniform= {S: tile}
main.uniform= {ping: '0', pong: '1'}
grid.uniform= {self: '2', icon: '3'}

resize(), redraw()

const {target:logo}= await fetch.image('/icon/logo.png')
icon.update(logo.size, logo)

window.on.resize= resize
window.on.move= move
window.on.click= click
window.on.focus= ()=> pause= false
window.on.blur= ()=> pause= true

function redraw() {
	if(pause) redraw.after(1)
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
	, G= [w/tile, h/tile*2].map(Math.ceil)
	
	canvas.width= w, canvas.height= h
	main.size= R, grid.size= G
	ping.update(G), pong.update(G)
	gl.uniform= {R, G} }

function move([x, y]) {
	gl.uniform.M= [x/w,(h-y)/h] }

function click(x, y) {
	gl.uniform.C= [x/w,(h-y)/h,gl.uniform.T] }

free.back()
