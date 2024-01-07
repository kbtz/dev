GL || log.error('gl helper not found')

const C= await fetch.text('shaders.glsl')
, E= body.sel('canvas')
, G= GL(E,
	{ preserveDrawingBuffer: true
	, premultipliedAlpha: false })
, S= 12, R= ()=> {
	const [w, h] = 𝚛𝚎𝚜, i= (w/S)[𝚌𝚎𝚒𝚕], j= 2 * (h/S)[𝚌𝚎𝚒𝚕]
	return [w, h, i, j] }

window.x= G
G.quad()

const [w,h,i,j] = R()
, fb= G.fbo()
, tA= G.tex(i, j)
, tB= G.tex(i, j)
, tLogo= G.tex(1, 1)

G.T.push(tA, tB, tB, tLogo)

E.width= w
E.height= h

const {main, grid}= G.compile(C)
main.U= { R: [w, h, i, j], texA: '0', texB: '1' } 
grid.U= { R: [w, h, i, j], self: '2', logo: '3' } 

// TODO make it smaller for mobile
G.GU.S= S

G.link()

let pause= false, hover = false
window[𝚘𝚗].blur= ()=> {
  pause = true
  hover = false
}

window[𝚘𝚗].focus= ()=> pause = false

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
	
	G.draw(grid, fb)
	G.draw(main)
	redraw()}

window[𝚘𝚗].move = ({pageX: x, pageY: y}) => {
	const [w, h]= main.U.R
	G.GU.M= [x/w, (h-y)/h]
  hover = G.read()[0] > 100
	if(hover)
		body.classList.add('logo-hover')
	else
		body.classList.remove('logo-hover')
}

window[𝚘𝚗].resize = ()=> {
	const [w,h,i,j] = R()
	
	E.width= w
	E.height= h
	main.U.R= [w, h, i, j]
	grid.U.R= [w, h, i, j]
	// TODO resize each before drawing to it
	G.GU.F= 0
	tA.R(i, j)
	tB.R(i, j) }

const socials = [
  'https://stackoverflow.com/users/741981/cvsguimaraes',
  'https://github.com/kbtz',
  'https://wakatime.com/@kbtz'
]

window[𝚘𝚗].click = () => {
  if (hover) {
    let url = socials[Math.floor(Math.random() * 2.99)]
    window.open(url,'_blank');
  }
}
