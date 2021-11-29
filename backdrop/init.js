assert(!!GL, 'gl helper not found')

const C= await text('/backdrop/shaders.glsl')
, G= GL('canvas', { premultipliedAlpha: false } )
, S= 36, R= ()=> {
		const [w, h] = res(), i= ceil(w/S), j= 2 * ceil(h/S)
	return [w, h, i, j] }

G.quad()

const [w,h,i,j] = R()
, fb= G.fbo()
, tA= G.tex(i, j)
, tB= G.tex(i, j)

G.T.push(tA, tB)

G.E.width= w
G.E.height= h

const {main, grid}= G.compile(C)
main.U= { R: [w, h, i, j], texA: '0', texB: '1' } 
grid.U= { R: [w, h, i, j], tex: '2' } 
G.GU.S = S
G.link()

setInterval(()=> {
	if(G.tick()%2){
		tB.B(2)
		fb.T(tA)}
	else {
		tA.B(2)
		fb.T(tB)}
	
	G.draw(grid, fb)
	G.draw(main) }
, 30)

// TODO debounce
on(window, 'resize', debounce(resize, 300))
function resize(){
	const [w,h,i,j] = R()
	
	G.E.width= w
	G.E.height= h
	main.U.R= [w, h, i, j]
	grid.U.R= [w, h, i, j]
	// TODO resize each before drawing to it
	G.GU.F= 0
	tA.R(i, j)
	tB.R(i, j)
}
