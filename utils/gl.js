// @ts-nocheck my beloved `with` pls

/**
 * WebGL "minimal" boilerplate for my pixel shaders
 * @global
 * @type {GL}
 */
function gl(canvas, opts = {}) {
	/** @type {WebGL2} */
	const context = canvas.getContext('webgl2', {
		premultipliedAlpha: false, ...opts
	})

	let api

	const parse = input => input
		.split('///').map(source => ({
			source, type: source.match(/^\/\/ ([a-z]+) /)?.at(1)
		}))
		.filter(({ type }) => !!type)

	with (context) {
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
			commit() {
				linkProgram(P)
				useProgram(P)
			},
			shaders(input) {
				parse(input).map(this.shader)
			},
			shader({source, type}) {
				assert(STYPE[type], 'Unknown shader type ' + type)
				const S = createShader(STYPE[type])
				shaderSource(S, source)
				compileShader(S)
				getShaderParameter(S, COMPILE_STATUS)
					? attachShader(P, S)
					: error(getShaderInfoLog(S))
			},
			rawTexture(bytes, i, j) {
				const T = createTexture(), data = new Uint8Array(bytes)
				bindTexture(TEXTURE_2D, T)
				texImage2D(TEXTURE_2D, 0, RGBA, i, j, 0, RGBA, UNSIGNED_BYTE, data)
				texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, REPEAT)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, REPEAT)
				bindTexture(TEXTURE_2D, null)
			},
			uniforms(names) {
				return names.map(
					(t, n) => [t, getUniformLocation(P, n)],
					([t, l]) => (...v) => context['uniform' + t](l, ...v)
				)
			}
		}
	}

	return api
}