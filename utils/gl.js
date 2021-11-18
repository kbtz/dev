/**
 * WebGL "minimal" boilerplate for my fragment shader 
 * @global
 * @type {GL}
 */
function gl(canvas, opts = {}) {
	const context = canvas.getContext('webgl2', {
		premultipliedAlpha: false, ...opts
	})

	let api

	with(context) {
		const P = createProgram(),
		STYPE = { vertex: VERTEX_SHADER, fragment: FRAGMENT_SHADER }

		api = {
			quad() {
				const B = createBuffer()
				bindBuffer(ARRAY_BUFFER, B)
				bufferData(ARRAY_BUFFER, new Uint8Array([0, 0, 0, 1, 1, 0, 1, 1]), STATIC_DRAW)
				enableVertexAttribArray(0)
				vertexAttribPointer(0, 2, UNSIGNED_BYTE, false, 0, 0)
				bindBuffer(ARRAY_BUFFER, null)
				return () => drawArrays(TRIANGLE_STRIP, 0, 4)
			},
			shader(source, type) {
				const S = createShader(STYPE[type])
				shaderSource(S, source)
				compileShader(S)
				getShaderParameter(S, COMPILE_STATUS)
					? attachShader(P, S)
					: console.error(getShaderInfoLog(S))
			},
			matrext(bytes, i, j) {
				const T = createTexture(), data = new Uint8Array(bytes)
				bindTexture(TEXTURE_2D, t)
				texImage2D(TEXTURE_2D, 0, RGBA, i, j, 0, RGBA, UNSIGNED_BYTE, data)
				texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, REPEAT)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, REPEAT)
			},
		}
	}

	return api
}
