assert(!!GL, 'gl helper not found')

const S= await text('/backdrop/shaders.glsl')
, G= GL('canvas', { premultipliedAlpha: false } )
, U= 12, R= ()=> {
	const [w, h] = res(), i= ceil(w/U), j= ceil(h/U)
	return [w, h, i, j] }

G.quad()

const [w,h,i,j] = R()
, fb= G.fbo()
, tA= G.tex(i, j)
, tB= G.tex(i, j)

G.T.push(tA, tB)

G.E.width= w
G.E.height= h

const {main, grid}= G.compile(S)
main.U= { R: [w, h], texA: '0', texB: '1' } 
grid.U= { R: [i, j], tex: '2' } 

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
, 3000)

// TODO debounce
on(window, 'resize', ()=>{
	const [w,h,i,j] = R()
	
	G.E.width= w
	G.E.height= h
	main.U.R= [w, h]
	grid.U.R= [i, j]
	tA.R(i, j)
	tB.R(i, j)
})
