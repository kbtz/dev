const {glsl}= util

await done(base, glsl)

const optAliases=
{ alpha: 'premultipliedAlpha'
, preserve: 'preserveDrawingBuffer'
} 

class Context {
	constructor(context) {
		for(const f of this.base.keys.map(k => this[k])) {
			if(f && f[𝚃].F) this[f.name]=
				exec(context, 'function '+f.toString()) } }
}

class WGL extends Context {
	launched= Date.sec
	keyPixel= new Uint8Array(4)
	
	textures= []
	programs= {}
	canvas
	
	constructor(canvas, options) {
		options= options.slot(optAliases.may)
		const context= canvas.getContext('webgl2', options)
		
		super(context)
		this.canvas= canvas
		
		const uniform= writer((k, v, o) => {
			this.programs.each(p => p.uniform[k]= v)
			o[k]= v
			return true })
		
		this.prop('uniform', 
			()=> uniform,
			values => uniform.join(values)) }
	
	compile(input) {
		const source= glsl.compile(input)
		, programs= {}
		
		for(let {name, fragment, vertex} of source.vals) {
			let program= programs[name]= this.program(name)
			attachShader(program, this.shader(VERTEX_SHADER, vertex))
			attachShader(program, this.shader(FRAGMENT_SHADER, fragment))
		}
		
		return this.programs.join(programs) }
	
	program(name) {
		const program= createProgram()
		, uniform= writer((k, v, o) => {
				this.flush(program, k, v)
				o[k]= v
				return true })
		
		, location= reader((name, cache) =>
				cache[name] ||=
					getUniformLocation(program, name))
		
		program.prop('uniform'
		, ()=> uniform
		, values => uniform.join(values))
		
		program.location= location
		program.name= name
		
		return program }
	
	shader(type, source) {
		let shader= createShader(type)
		shaderSource(shader, source)
		compileShader(shader)
			
		if(!getShaderParameter(shader, COMPILE_STATUS))
			throw getShaderInfoLog(shader)
		return shader }

	quad() {
		const B= createBuffer()
		, D= new Uint8Array([0, 0, 0, 1, 1, 0, 1, 1])
		
		bindBuffer(ARRAY_BUFFER, B)
		bufferData(ARRAY_BUFFER, D, STATIC_DRAW)
		enableVertexAttribArray(0)
		vertexAttribPointer(0, 2, UNSIGNED_BYTE, false, 0, 0)
		bindBuffer(ARRAY_BUFFER, null) }
	
	framebuffer() {
		const fbo= createFramebuffer()
		fbo.texture = tex => {
			bindFramebuffer(FRAMEBUFFER, fbo)
			framebufferTexture2D( 
				FRAMEBUFFER, COLOR_ATTACHMENT0, TEXTURE_2D,
				tex, 0) }
		return fbo }
	
	texture() {
		const tex= createTexture()
		bindTexture(TEXTURE_2D, tex)
		texImage2D(TEXTURE_2D, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE, null)
		texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST)
		texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST)
		texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, CLAMP_TO_EDGE)
		texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, CLAMP_TO_EDGE)
		
		tex.bind= index => {
			tex.index= index
			activeTexture(TEXTURE0 + index)
			bindTexture(TEXTURE_2D, tex) }
		
		tex.update= (size, data= null) => {
			tex.join({size, data})
			tex.bind(tex.index)
			texImage2D(TEXTURE_2D, 0, RGBA, ...size, 0, RGBA, UNSIGNED_BYTE, data) }
		
		return tex }
	
	link() {
		this.programs.each(p => linkProgram(p))
		this.textures.each((t, i) => t.bind(i))
		this.uniform= {T: 0, F: 0, M: [.5,.5], C: [0,0,-10]} }
	tick() {
		this.uniform.T = Date.sec - this.launched
		return ++this.uniform.F }
	
	flush(program, name, value) {
		useProgram(program)
		
		let type= value[𝚃]
		, location= program.location[name]
		
		if(!location) {
			//l(name)
			return false }
		
		const vec= [,,
			(...a) => uniform2fv(...a),
			(...a) => uniform3fv(...a),
			(...a) => uniform4fv(...a)]
		
		switch(true) {
			case type.N:
				uniform1f(location, value)
				break
			case type.S:
				uniform1i(location, +value)
				break
			case type.A: 
				vec[value.size](location, value)
				break
			default:
				throw 'type assertion failed'
				return false }
		
		return true }
	
	read() {
		readPixels(0, 0, 1, 1, RGBA, UNSIGNED_BYTE, this.keyPixel)
		return this.keyPixel }
	
	draw(...programs) {
		for(const program of programs) {
			useProgram(program)
			bindFramebuffer(FRAMEBUFFER, program.fbo ?? null)
			viewport(0, 0, ...program.size)
			drawArrays(TRIANGLE_STRIP, 0, 4)
		} }
}

WGL.expose
free.wgl()
