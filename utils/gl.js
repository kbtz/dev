function GL(canvas, opts= {}) {
	const C= canvas.getContext('webgl2', opts)
	, U= {}, G= { T: '1f', F: '1ui', R: '2ui', M: '2ui' } 
	, P= factory(()=> C.createProgram())
	, ST={ vertex: C.VERTEX_SHADER, fragment: C.FRAGMENT_SHADER }
	, parse= input => input
			.split('///')
			.map(s => [s, s.match(/^\/\/ ([a-z ]+)\b/)?.at(1)])
			.filter(([,t]) => !!t)
			.map(([s, t]) => [s, ... t.split(' ')])
	
	with(C) {
		let common= '\n'
		return { context: C , uniform: U
		, quad(){
				const B= createBuffer()
				, D= new Uint8Array([0, 0, 0, 1, 1, 0, 1, 1])
				bindBuffer(ARRAY_BUFFER, B)
				bufferData(ARRAY_BUFFER, D, STATIC_DRAW)
				enableVertexAttribArray(0)
				vertexAttribPointer(0, 2, UNSIGNED_BYTE, false, 0, 0)
				bindBuffer(ARRAY_BUFFER, null)}
		, draw(){
				drawArrays(TRIANGLE_STRIP, 0, 4)}
		, shaders(source){
				for(const shader of parse(source))
					this.compile(shader)}
		, compile([source, type, program]){
				if(type == 'common')
					return common= source
				const S= createShader(ST[type])
				shaderSource(S, common + source)
				compileShader(S)
				getShaderParameter(S, COMPILE_STATUS)
				? this.attach(S, program)
				: error(getShaderInfoLog(S))}
		, attach(shader, program){
				if(program) attachShader(P[program], shader)
				else values(P).map(p => attachShader(p, shader))}
		, link(uniforms){
				for(const name in P) {
					linkProgram(P[name])
					U[name] = { ...(uniforms[name] || {}), ... G } 
					vmap(U[name], (t, u) => (... v) =>
						C['uniform' + t]
							(getUniformLocation(P[name], u), ... v))}
				freeze(U)}
		, frame(w, h){
				const T= this.texture(w, h)
				, F= createFramebuffer()
				bindFramebuffer(FRAMEBUFFER, F)
				viewport(0, 0, w, h)
				framebufferTexture2D(FRAMEBUFFER, COLOR_ATTACHMENT0, TEXTURE_2D, T, 0)
				// TODO F.resize
				return [F, T]}
		, texture(w, h, data= null){
				const T= createTexture()
				bindTexture(TEXTURE_2D, T)
				texImage2D(TEXTURE_2D, 0, RGBA, w, h, 0, RGBA, UNSIGNED_BYTE, data)
				texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, CLAMP_TO_EDGE)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, CLAMP_TO_EDGE)
				bindTexture(TEXTURE_2D, null)
				// TODO T.resize() bind + tex
				return T}
		, active(texture, i){
				activeTexture(TEXTURE0 + i)
				bindTexture(TEXTURE_2D, texture)}
		, size(w, h){
				viewport(0, 0, w, h)}
		, program(name, fb= null){
				useProgram(P[name])
				bindFramebuffer(FRAMEBUFFER, fb)}}}}
