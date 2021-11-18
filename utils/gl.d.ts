/**
 * WebGL "minimal" boilerplate for my fragment shader 
 * @global
 */
function gl(canvas: HTMLCanvasElement, opts?: WebGLContextAttributes): GLAPI

interface GLAPI {
	/** Set a normalized quad on attribute #0, returns its draw call */
	quad(): Callback

	/** Attach shader from source */
	shader(source: string, type: ShaderType)

	/**
	 * Create 4 channel texture from the given array of bytes(0-255)
	 * @param bytes Will be converted to a Uint8Array, lenght must be i*j*4
	 * @param i number of rows (texture height)
	 * @param j number of columns (texture width)
	 */
	matrex(bytes: number[], i:number, j:number)

}

type Callback = () => void
type Setter = (...values: number[]) => void
type ShaderType = 'vertex' | 'fragment'
