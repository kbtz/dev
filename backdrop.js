const
	sel = document.querySelector.bind(document),
	/** @type {HTMLCanvasElement} */
	canvas = sel('canvas#backdrop'),
	vs = sel('script#vs').innerText,
	fs = sel('script#fs').innerText

let { innerWidth: w, innerHeight: h } = window

canvas.width = w
canvas.height = h

const gl = canvas.getContext('webgl2', {
	premultipliedAlpha: false
}), U = {}, BD = {}

with (gl) {
	const p = createProgram(), b = createBuffer(),
		S = (type, source) => {
			const s = createShader(type)
			shaderSource(s, source)
			compileShader(s)
			attachShader(p, s)
		}

	viewport(0, 0, w, h)
	// QUAD buffer
	bindBuffer(ARRAY_BUFFER, b)
	bufferData(ARRAY_BUFFER, new Uint8Array([0, 0, 0, 1, 1, 0, 1, 1]), STATIC_DRAW)
	enableVertexAttribArray(0)
	vertexAttribPointer(0, 2, UNSIGNED_BYTE, false, 0, 0)
	bindBuffer(ARRAY_BUFFER, null)

	S(VERTEX_SHADER, vs)
	S(FRAGMENT_SHADER, fs)

	linkProgram(p)
	useProgram(p)

	U.R = getUniformLocation(p, 'R')
	uniform2f(U.R, w, h)

	BD.resize = () => {
		uniform2f(U.R, w, h)
		viewport(0, 0, w, h)
		canvas.width = w
		canvas.height = h
		BD.draw()
	}

	BD.draw = () => {
		drawArrays(TRIANGLE_STRIP, 0, 4)
	}
}

BD.draw()
function bench(fn) {
	const t0 = performance.now()
	fn()
	const t1 = performance.now()
	console.debug(t1 - t0)
}

function grid() {
	const
		{ ceil, random } = Math, { innerWidth: w, innerHeight: h } = window,
		G = 12, W = ceil(w / G), H = ceil(h / G) * 2, C = W * H * 4,
		short = _ => ceil(random() * 255),
		fill = (n, fn) => [...Array(n)].map(fn),
		sign = _ => random() > .5 ? 1 : -1,
		attr = [short, random, sign],
		grid = [...Array(C)].map((_, i) => [short(), random()])
}

let resizing = null
window.addEventListener('resize', () => {
	clearTimeout(resizing)

	resizing = setTimeout(() => {
		resizing = null
		w = window.innerWidth
		h = window.innerHeight
		BD.resize()
	}, 300)
})