assert(!!GL, 'gl helper not found')

const canvas= sel('canvas')
, gl= GL(canvas)

let pixel= gl.quad()

resize()
load()

function resize() {
	const { innerWidth: w, innerHeight: h }= window
	canvas.width = w
	canvas.height = h
	gl.view(w, h) }

async function load() {
	const source= await text('/backdrop/shaders.glsl')
	
	gl.shaders(source)
	gl.commit()
	// unis
	draw() }

function draw() {
	pixel()
	//requestAnimationFrame(draw)
}
