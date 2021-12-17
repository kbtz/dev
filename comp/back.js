const {wgl}= util
, glsl= await fetch('/comp/wall.glsl')

await done(base, wgl)

const canvas= body.find('canvas#wall')
, ctx= new WGL(canvas, {alpha: true, preserve: true})
, tile= 12, source= await glsl.text()

const {main, grid}= ctx.compile(source)
, [ping, pong, icon]= [,,,].make(ctx.texture)

ctx.textures.push(ping, pong, pong, icon)
grid.fbo= ctx.framebuffer()

ctx.quad()
ctx.link()

ctx.uniform= {S: tile}
main.uniform= {ping: '0', pong: '1'}
grid.uniform= {self: '2', icon: '3'}

const {target:logo}= await fetch.image('/icon/logo.png')
icon.update(logo.size, logo)

let paused= false
resize()
redraw()

function redraw() {
	requestAnimationFrame(draw) }

function draw() {
	if(ctx.tick() % 2) {
		pong.bind(2)
		grid.fbo.texture(ping) }
	else {
		ping.bind(2)
		grid.fbo.texture(pong) }
	
	ctx.draw(grid, main)
	redraw() }

function resize() {
	const R= size, G= R.map(i => (i/tile).ceil)
	G[1]*= 2
	
	canvas.width= R[0]
	canvas.height= R[1]
	main.size= R
	grid.size= G
	ping.update(G)
	pong.update(G)
	
	ctx.uniform= {R, G}
}

free.back()
