function GL(canvas, opts= {}) {
	const CTX= canvas.getContext('webgl2', opts)
	, U= {}, P= factory(CTX.createProgram.bind(CTX))
	, parse= input => input
		.split('///')
		.map(s => [s, s.match(/^\/\/ ([a-z ]+)\b/)?.at(1)])
		.filter(([,t]) => !!t)
		.map(([s, t]) => [s, ... t.split(' ')])
	
	let api, common= '\n'
	
	with(CTX) {
		api =
		{ quad(){
				const B= createBuffer()
				, Q= new Uint8Array([0, 0, 0, 1, 1, 0, 1, 1])
				bindBuffer(ARRAY_BUFFER, B)
				bufferData(ARRAY_BUFFER, Q, STATIC_DRAW)
				enableVertexAttribArray(0)
				vertexAttribPointer(0, 2, UNSIGNED_BYTE, false, 0, 0)
				bindBuffer(ARRAY_BUFFER, null)
				return ()=> drawArrays(TRIANGLE_STRIP, 0, 4) }
		, attach(shader, program){
				if(program) attachShader(P[program], shader)
				else if(P.count()) P.map(p => attachShader(p, shader))
				else this.attach(shader, 'main') }
		, shaders(input, uniforms= {}){
				parse(input).map(this.shader.bind(this))
				P.map((p, pn) => {
					linkProgram(p)
					if(!uniforms[pn]) return
					U[pn]= uniforms[pn].map
						( (t, n) => [t, getUniformLocation(p, n)]
						, ([t, l]) => (... v) => CTX['uniform' + t](l, ... v)) })
			}
		, shader([source, type, program]){
				if(type == 'common')
					return common= source
				const S= createShader(GL.ST[type])
				shaderSource(S, common + source)
				compileShader(S)
				getShaderParameter(S, COMPILE_STATUS)
				? this.attach(S, program)
				: error(getShaderInfoLog(S)) }
		, frame(w, h){
				const T= this.texture(w, h)
				, F= createFramebuffer()
				bindFramebuffer(FRAMEBUFFER, F)
				this.size(w, h) // TODO necessary?
				framebufferTexture2D(FRAMEBUFFER, COLOR_ATTACHMENT0, TEXTURE_2D, T, 0)
				return [F, T] }
		, texture(w, h, data= null){
				const T= createTexture()
				bindTexture(TEXTURE_2D, T)
				texImage2D(TEXTURE_2D, 0, RGBA, w, h, 0, RGBA, UNSIGNED_BYTE, data)
				texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, REPEAT)
				texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, REPEAT)
				bindTexture(TEXTURE_2D, null)
				return T}
		, sample(texture, i){
				activeTexture(TEXTURE0 + i)
				bindTexture(TEXTURE_2D, texture)}
		, size(w, h){
				viewport(0, 0, w, h)}
		, update(uniforms= {}, program= 'main'){
				useProgram(P[program])
				if(program == 'main')
					bindFramebuffer(FRAMEBUFFER, null)
				uniforms.map((v, u) => U[program][u](... v))}}
		
		GL.ST={ vertex: VERTEX_SHADER, fragment: FRAGMENT_SHADER }}
	
	return api }
