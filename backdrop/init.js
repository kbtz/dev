assert(!!GL, 'gl helper not found')

const source= await text('/backdrop/shaders.glsl')
, gl= GL(sel('canvas'), { premultipliedAlpha: false } )
, U= 12, R= ()=> {
	const [w, h] = res(), i= ceil(w/U), j= ceil(h/U)
	return [w, h, i, j] }

gl.quad()
gl.shaders(source)
gl.link(
	{ main: { texA: '1i', texB: '1i' } 
	, grid: { tex: '1i', X: '1f' } })

const [w,h,i,j] = R()
, [fA, tA] = gl.frame(i, j)
, [fB, tB] = gl.frame(i, j)

gl.program('grid', fA)
gl.uniform.grid.tex([0])
gl.active(tB, 0)
gl.program('grid', fB)
gl.active(tA, 0)

gl.program('main')
gl.uniform.main.texA([0])
gl.uniform.main.texB([1])
gl.size(w, h)
gl.active(tA, 0)
gl.active(tB, 1)

let odd= true
setInterval(()=> {
	gl.program('grid', odd ? fA : fB)
	gl.uniform.grid.X([odd ? random() : random()])
	gl.draw()
	odd= !odd
	
	gl.program('main')
	gl.draw()}
, 100)

// TODO debounce
//on(window, 'resize', resize)

function resize() {
	const { innerWidth: w, innerHeight: h }= window
	canvas.width= w
	canvas.height= h
	gl.size(w, h) }

function draw() {
	requestAnimationFrame(draw)
}
