function GL(ES, O) {
	const E= sel(ES)
	, G= E.getContext('webgl2', O)
	, GU= { F: 0, T: 0 }, P= {} 
	
	let T0= now(), CC= '\n'
	
	with(G) {
	return { E
	, quad(){
		const B= createBuffer()
		, D= new Uint8Array([0, 0, 0, 1, 1, 0, 1, 1])
		bindBuffer(ARRAY_BUFFER, B)
		bufferData(ARRAY_BUFFER, D, STATIC_DRAW)
		enableVertexAttribArray(0)
		vertexAttribPointer(0, 2, UNSIGNED_BYTE, false, 0, 0)
		bindBuffer(ARRAY_BUFFER, null)}
	, compile(I){
		for(C of I.split('///')){
			const H = C.match(/^\/\/ ([a-z ]+)\b/)?.at(1)
			if(!H) continue
			const [T, PN] = H.split(' ')
			if(T == 'common'){
				CC= C
				continue}
			const S= createShader((
				{ vertex: VERTEX_SHADER
				, fragment: FRAGMENT_SHADER})[T])
			shaderSource(S, CC + C)
			compileShader(S)
			if(!getShaderParameter(S, COMPILE_STATUS)){
				warn(getShaderInfoLog(S), H)
				break}
			if(PN){
				if(!P[PN])
					P[PN]={ I: createProgram(), L: {}, U: {}, T: {} } 
				attachShader(P[PN].I, S)}
			else values(P).map(PV => attachShader(PV.I, S))}
		return P}
	, fbo(T){
		const F= createFramebuffer()
		bindFramebuffer(FRAMEBUFFER, F)
		framebufferTexture2D(FRAMEBUFFER, COLOR_ATTACHMENT0, TEXTURE_2D, T, 0)
		return F}
	, tex(W, H){
		const T= createTexture()
		bindTexture(TEXTURE_2D, T)
		texImage2D(TEXTURE_2D, 0, RGBA, W, H, 0, RGBA, UNSIGNED_BYTE, null)
		texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST)
		texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST)
		texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, CLAMP_TO_EDGE)
		texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, CLAMP_TO_EDGE)
		return T} // TODO retex
	, link(){
		for(PO of values(P)){
			linkProgram(PO.I)
			
			for(K of keys({ ... GU, ... PO.U, ... PO.T } ))
				PO.L[K]= getUniformLocation(PO.I, K)
			
			useProgram(PO.I)
			all(PO.T).map(([TN, TO], TI) => {
				activeTexture(TEXTURE0 + TI)
				bindTexture(TEXTURE_2D, TO)
				uniform1i(PO.L[TN], TI) })
		}}
	, tick(){
		GU.T = now() - T0
		return ++GU.F}
	, flush(UO, LO){
		for([K, V] of all(UO)){
			if(isArray(V))
				G['uniform'+V.length+'f'](LO[K], ... V)
			else
				uniform1f(LO[K], V)
		}}
	, draw(PO, F= null){
		useProgram(PO.I)
		bindFramebuffer(FRAMEBUFFER, F)
		
		this.flush(GU, PO.L)
		this.flush(PO.U, PO.L)
		
		const [W, H] = PO.U.R
		viewport(0, 0, W, H)
		drawArrays(TRIANGLE_STRIP, 0, 4)}}
	}}
