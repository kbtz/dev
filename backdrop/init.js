assert(!!GL, 'gl helper not found')

const canvas= sel('canvas')
, gl= GL(canvas, { premultipliedAlpha: false } )
, pixel= gl.quad()

resize()
load()

// TODO debounce
//on(window, 'resize', resize)

function resize() {
	const { innerWidth: w, innerHeight: h }= window
	canvas.width= w
	canvas.height= h
	gl.size(w, h) }

async function load() {
	const source= await text('/backdrop/shaders.glsl')
	, uniforms=
		{ main:
			{ grid: '1i' }
		, grid:
			{ dice: '1f' }}
	
	gl.shaders(source, uniforms)
	
	gl.update({ dice: [random()] }, 'grid')
	const [gf, gt]= gl.frame(200, 200)
	draw()

	gl.update({ grid: [0] }, 'main')
	resize()
	gl.sample(gt, 0)
	draw() }

function draw() {
	pixel()
	//requestAnimationFrame(draw)
}
