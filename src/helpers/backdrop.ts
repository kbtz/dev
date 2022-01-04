import { WGL, Texture, Program } from './wgl'

let
	canvas: HTMLCanvasElement,
	gl: WGL, main: Program, grid: Program,
	ping: Texture, pong: Texture, icon: Texture,
	tile = 12, w: number, h: number,
	paused = false, ready = false,
	closed = true, hover = false,
	is = {
		done: false
	}

const
	S = tile, frame = requestAnimationFrame,
	R2G = (v: 𝝶, i: 𝝶) => Math.ceil(v / S * (i + 1))

function init(target: HTMLCanvasElement, shaders: string) {
	gl = new WGL(target)
	canvas = target

	const programs = gl.compile(shaders)
	main = programs.main
	grid = programs.grid
	grid.fbo = gl.framebuffer()

	ping = gl.texture()
	pong = gl.texture()
	icon = gl.texture()

	gl.textures.push(ping, pong, pong, icon)
	grid.fbo = gl.framebuffer()

	gl.quad(), gl.link()

	gl.uniforms = { S }
	main.uniforms = { ping: '0', pong: '1' }
	grid.uniforms = { self: '2', icon: '3', Wc: 0, Wt: -10 }

	resize(), redraw()
}

function intro() {
	//const { target: logo } = await fetch.image('/icon/logo.png')
	//await sleep(4) // intro duration
	/*
	icon.update(logo.size, logo)
	tag.closed.on
	
	wall.join({ open, close })
	free.wall()
	*/
}

function redraw() {
	if (is.done) return
	if (paused) redraw.after(.1)
	else draw()
}

function draw() {
	if (gl.tick() % 2) {
		pong.bind(2)
		grid.fbo!.texture(ping)
	} else {
		ping.bind(2)
		grid.fbo!.texture(pong)
	}

	gl.draw(grid, main)
	frame(redraw)
}

function resize() {
	window.size[𝞄] = canvas
	w = window.size.width
	h = window.size.height

	const
		R = [w, h] as [𝝶, 𝝶],
		G = R.map(R2G) as [𝝶, 𝝶]

	main.size = R, grid.size = G
	ping.update(G), pong.update(G)
	gl.uniforms = { R, G, F: 0 }
	gl.resized = true
}

function mousemove({ pageX: x, pageY: y }: MouseEvent) {
	gl.uniforms.M = [x / w, (h - y) / h]
	const [key] = gl.read()
	hover = closed && key > 10
	document.title = hover ? 'yay' : 'nay'
}

function click() {
	if (ready && closed && hover)
		open()
}

function open() {
	hover = closed = false
	grid.uniforms.Wc++
	grid.uniforms.Wt = grid.uniforms.T
}

function close() {
	closed = true
	grid.uniforms.Wc++
	grid.uniforms.Wt = grid.uniforms.T
}

function focus() {
	paused = false
}

function blur() {
	paused = true
}

export default {
	init, is,
	events: { resize, mousemove, click, focus, blur },
	set icon(url: 𝞁) {
		let img = new Image
		img.src = url
		img.onload = () =>
			icon.update([img.width, img.height], img)
	}
}