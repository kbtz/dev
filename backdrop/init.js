assert(!!GL, 'gl helper not found')

const canvas= sel('canvas')
, gl= GL(canvas, { premultipliedAlpha: false } )
, pixel= gl.quad()

resize()
load()

// TODO debounce
on(window, 'resize', resize)

function resize() {
	const { innerWidth: w, innerHeight: h }= window
	canvas.width = w
	canvas.height = h
	gl.view(w, h) }

async function load() {
	const source= await text('/backdrop/shaders.glsl')
	
	gl.shaders(source)
	gl.commit('grid')
	draw() }

function draw() {
	pixel()
	//requestAnimationFrame(draw)
}
