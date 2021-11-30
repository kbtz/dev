assert(!!GL, 'gl helper not found')

const C= await text('/backdrop/shaders.glsl')
, G= GL('canvas', { premultipliedAlpha: false } )
, S= 12, R= ()=> {
		const [w, h] = res(), i= ceil(w/S), j= 2 * ceil(h/S)
	return [w, h, i, j] }

G.quad()

const [w,h,i,j] = R()
, fb= G.fbo()
, tA= G.tex(i, j)
, tB= G.tex(i, j)
, tLogo= G.tex(1, 1)

G.T.push(tA, tB, tB, tLogo)

G.E.width= w
G.E.height= h

const {main, grid}= G.compile(C)
main.U= { R: [w, h, i, j], texA: '0', texB: '1' } 
grid.U= { R: [w, h, i, j], self: '2', logo: '3' } 

// TODO make it smaller for mobile
G.GU.S= S

G.link()

image('/backdrop/logo.png', function(){
	tLogo.R(this.width, this.height, this)})

let pause= false
const redraw= ()=> requestAnimationFrame(draw)
on(window, 'blur', ()=> pause = true)
on(window, 'focus', ()=> pause = false)
redraw()

function draw(){
	if(pause)
		return setTimeout(redraw, 100)
	if(G.tick()%2){
		tB.B(2)
		fb.T(tA)}
	else {
		tA.B(2)
		fb.T(tB)}
	
	G.draw(grid, fb)
	G.draw(main)
	redraw()}

on(window, 'resize', debounce(300, ()=> {
	const [w,h,i,j] = R()
	
	G.E.width= w
	G.E.height= h
	main.U.R= [w, h, i, j]
	grid.U.R= [w, h, i, j]
	// TODO resize each before drawing to it
	G.GU.F= 0
	tA.R(i, j)
	tB.R(i, j)}))

on(window, 'mousemove', ({pageX: x, pageY: y}) => {
	const [w, h]= main.U.R
	G.GU.M= [x/w, (h-y)/h]
})

