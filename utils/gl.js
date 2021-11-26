function GL(canvas, opts= {}) {
	const context = canvas.getContext
		( 'webgl2'
		, { premultipliedAlpha: false // allow transparency
			, ... opts })
	, parse = input => input
		.split('///')
		.map(s => [s, s.match(/^\/\/ ([a-z]+)\b/)?.at(1)])
		.filter(([,t]) => !!t)
	
	let api, common= '\n'
	
	with(context) {
		const P = createProgram()
		
		api =
		{ quad(){
				const B = createBuffer()
				, Q = new Uint8Array([0, 0, 0, 1, 1, 0, 1, 1])
				bindBuffer(ARRAY_BUFFER, B)
				bufferData(ARRAY_BUFFER, Q, STATIC_DRAW)
				enableVertexAttribArray(0)
				vertexAttribPointer(0, 2, UNSIGNED_BYTE, false, 0, 0)
				bindBuffer(ARRAY_BUFFER, null)
				return ()=> drawArrays(TRIANGLE_STRIP, 0, 4) }
		, shaders(input){
				parse(input).map(this.shader) }
		, shader([source, type]){
				if(type == 'common') {
					common = source + '\n'
					return }
				assert(GL.ST[type], 'Unknown shader type ' + type)
				const S = createShader(GL.ST[type])
				shaderSource(S, common + source)
				compileShader(S)
				getShaderParameter(S, COMPILE_STATUS)
				? attachShader(P, S)
				: error(getShaderInfoLog(S)) }
		, texture(w, h, bytes){
				const T = createTexture()
				, data = bytes ? new Uint8Array(bytes): null
				bindTexture(TEXTURE_2D, T)
				texImage2D(TEXTURE_2D, 0, RGBA, w, h, 0, RGBA, UNSIGNED_BYTE, data)
				texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, REPEAT)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, REPEAT)
				bindTexture(TEXTURE_2D, null)
				return T }
		, textureResize(w, h, t){
				const T = createTexture()
				, data = new Uint8Array(bytes)
				bindTexture(TEXTURE_2D, T)
				texImage2D(TEXTURE_2D, 0, RGBA, w, h, 0, RGBA, UNSIGNED_BYTE, data)
				texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, REPEAT)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, REPEAT)
				bindTexture(TEXTURE_2D, null)
				return T }
		, commit() {
				linkProgram(P)
				useProgram(P) }
		, view(w, h) {
				viewport(0, 0, w, h) }
		, uniforms(names) {
				// names.merge({ R: '2f', T: '1f' } )
				return names.map
				( (t, n) => [t, getUniformLocation(P, n)]
				, ([t, l]) => (... v) => context['uniform' + t](l, ... v)) }}
		
		GL.ST={ vertex: VERTEX_SHADER, fragment: FRAGMENT_SHADER }
	}
	return api }
