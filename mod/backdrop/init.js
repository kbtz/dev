GL || log.error('gl helper not found')

const C= await fetch.text('shaders.glsl')
, E= body.sel('canvas')
, G= GL(E,
	{ preserveDrawingBuffer: true
	, premultipliedAlpha: false })
, S= 12, R= ()=> {
	const [w, h] = 𝚛𝚎𝚜, i= (w/S)[𝚌𝚎𝚒𝚕], j= 2 * (h/S)[𝚌𝚎𝚒𝚕]
	return [w, h, i, j] }

G.quad()

const [w,h,i,j] = R()
, fb= G.fbo()
, tA= G.tex(i, j)
, tB= G.tex(i, j)
, tLogo= G.tex(1, 1)

G.T.push(tA, tB, tB, tLogo)

E.width= w
E.height= h

const { main, grid }= G.compile(C)
main.U= { texA: '0', texB: '1' } 
grid.U= { self: '2', logo: '3' } 

// TODO make it smaller for mobile?
G.GU.S= S
G.GU.R= [w, h, i, j]
G.GU.C= [0,0,-10]

G.link()

let pause= false
window[𝚘𝚗].blur= ()=> pause = true
window[𝚘𝚗].focus= ()=> pause = false

let info= body.sel('#info')
const redraw= ()=> requestAnimationFrame(draw)
redraw()

const logo = await fetch.image('logo.png')
tLogo.R(logo.width, logo.height, logo)
module.ready()

function draw(){
	if(pause)
		return setTimeout(redraw, 100)
	if(G.tick()%2){
		tB.B(2)
		fb.T(tA)}
	else {
		tA.B(2)
		fb.T(tB)}
	
	const [w,h,i,j] = R()
	G.draw(grid, [i,j], fb)
	G.draw(main, [w,h])
	info.innerText= G.GU.T.toFixed(2)
	redraw() }

let hover= false
window[𝚘𝚗].move = ({pageX: x, pageY: y}) => {
	const [w, h]= G.GU.R
	G.GU.M= [x/w, (h-y)/h]
	
	hover= !!G.read()[0]
	body[𝚝𝚊𝚐]['logo-hover']= hover
}

window[𝚘𝚗].click = ({pageX: x, pageY: y}) => {
	if(hover) {
		// TODO
		return }
	
	const [w, h]= G.GU.R
	G.GU.C= [x/w, (h-y)/h, G.GU.T] }

window[𝚘𝚗].resize = debounce(300, ()=> {
	const [w,h,i,j] = R()
	
	E.width= w
	E.height= h
	
	G.GU.F= 0
	G.GU.R= [w, h, i, j]
	tA.R(i, j)
	tB.R(i, j) })
