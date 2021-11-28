assert(!!GL, 'gl helper not found')

const S= await text('/backdrop/shaders.glsl')
, G= GL('canvas', { premultipliedAlpha: false } )
, U= 12, R= ()=> {
	const [w, h] = res(), i= ceil(w/U), j= ceil(h/U)
	return [w, h, i, j] }

G.quad()

const [w,h,i,j] = R()
, tA= G.tex(i, j)
, tB= G.tex(i, j)
, fA= G.fbo(tA)
, fB= G.fbo(tB)

const {main, grid}= G.compile(S)

main.T= {tA, tB} 

main.U.R= [w, h]
grid.U.R= [i, j]
G.E.width = w
G.E.height = h

G.link()

setInterval(()=> {
	G.draw(grid, G.tick()%2 ? fA : fB)
	G.draw(main) }
, 1000)

// on resize
// canvas resize
// set program sizes
// resize textures
