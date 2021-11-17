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
			getShaderParameter(s, COMPILE_STATUS)
				? attachShader(p, s)
				: console.error(getShaderInfoLog(s))
		}

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

	U.M = getUniformLocation(p, 'M')

	BD.move = (x, y) => {
		uniform2f(U.M, x, y)
	}

	BD.resize = () => {
		viewport(0, 0, w, h)
		canvas.width = w
		canvas.height = h
	}

	BD.draw = () => {
		drawArrays(TRIANGLE_STRIP, 0, 4)
		requestAnimationFrame(BD.draw)
	}
}

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
		grid = [...Array(C)].map(random)
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

window.addEventListener('mousemove', ({ pageX: x, pageY: y }) => {
	BD.move(x, window.innerHeight - y)
})

BD.draw()