const
	{ ceil, random } = Math,
	sel = document.querySelector.bind(document),
	/** @type {HTMLCanvasElement} */
	canvas = sel('canvas#backdrop'),
	vs = sel('script#vs').innerText,
	fs = sel('script#fs').innerText

let
	{ innerWidth: w, innerHeight: h } = window,
	G = 12, c = ceil(w / G), r = ceil((h / G) * 2)

canvas.width = w
canvas.height = h

const gl = canvas.getContext('webgl2', {
	premultipliedAlpha: false
}), U = {}, BD = {}

with (gl) {
	const p = createProgram(), b = createBuffer(), t = createTexture(),
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

	// GRID texture
	bindTexture(TEXTURE_2D, t)
	texImage2D(TEXTURE_2D, 0, RGBA, c, r, 0, RGBA, UNSIGNED_BYTE, grid(c, r))
	texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST);
	texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST);
	texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, REPEAT);
	texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, REPEAT);

	S(VERTEX_SHADER, vs)
	S(FRAGMENT_SHADER, fs)

	linkProgram(p)
	useProgram(p)

	U.M = getUniformLocation(p, 'M')
	U.R = getUniformLocation(p, 'R')
	U.T = getUniformLocation(p, 'T')

	uniform1i(U.T, 0)
	uniform4f(U.R, w, h, c, r)
	uniform2f(U.M, w / 2, h / 2)

	BD.move = (x, y) => {
		uniform2f(U.M, x, h - y)
	}

	BD.resize = () => {
		viewport(0, 0, w, h)
		canvas.width = w
		canvas.height = h
		c = ceil(w / G)
		r = ceil((h / G) * 2)
		uniform4f(U.R, w, h, c, r)
	}

	BD.draw = () => {
		drawArrays(TRIANGLE_STRIP, 0, 4)
		// requestAnimationFrame(BD.draw)
	}
}

function bench(fn) {
	const t0 = performance.now()
	fn()
	const t1 = performance.now()
	console.debug(t1 - t0)
}

function grid(c, r) {
	return new Uint8Array([...cells(c * r * 4)])
}

function* cells(bytes) {
	for (let i = 0; i <= bytes; i += 4) {
		yield ceil(random() * 255) // brightness
		yield ceil(random() * 255) // speed
		yield ceil(random() * 255) // direction?
		yield 255 // alpha
	}
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
	BD.move(x, y)
})

BD.draw()