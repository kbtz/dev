import { WGL, Texture, Program } from '+wgl'

let
	canvas: HTMLCanvasElement,
	gl: WGL, main: Program, grid: Program,
	ping: Texture, pong: Texture, icon: Texture,
	tile = 12, w: 𝝶, h: 𝝶,
	is = {
		ready: false,
		paused: false,
		done: false,
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
	grid.uniforms = { self: '2', icon: '3', Wc: 1, Wt: 0.1 }

	resize(), redraw()
	intro.after(1)
}

function intro() {
	is.ready = true
}

function redraw() {
	if (is.done) return
	if (is.paused) redraw.after(.1)
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
	canvas[𝞏] = window.size
	w = window.size.width
	h = window.size.height

	const
		R = [w, h] as Point,
		G = R.map(R2G) as Point

	main.size = R, grid.size = G
	ping.update(G), pong.update(G)
	gl.uniforms = { R, G, F: 0 }
	gl.resized = true
}

function mousemove({ pageX: x, pageY: y }: MouseEvent) {
	gl.uniforms.M = [x / w, (h - y) / h]
	const [key] = gl.read()
	state.pointer = state.cover && key > 10
	is.paused = false
}

function click() {
	if (is.ready && state.cover && state.pointer)
		state.cover = false
}

function open() {
	state.pointer = false
	grid.uniforms.Wc++
	grid.uniforms.Wt = grid.uniforms.T
}

function close() {
	grid.uniforms.Wc++
	grid.uniforms.Wt = grid.uniforms.T
}

function focus() {
	is.paused = false
}

function blur() {
	is.paused = true
}

export default {
	init, close, open, is,
	events: { resize, mousemove, click, focus, blur },
	set icon(url: 𝞁) {
		let img = new Image
		img.src = url
		img.onload = () =>
			icon.update([img.width, img.height], img)
	}
}