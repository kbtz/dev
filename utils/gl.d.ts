/**
 * WebGL "minimal" boilerplate for my fragment shader 
 * @global
 */
type GL = (canvas: HTMLCanvasElement, opts?: WebGLContextAttributes) => GLAPI

interface GLAPI {
	/** Set a normalized quad on attribute #0, returns its draw call */
	quad(): Callback

	/**
	 * Attach shaders from single source where each
	 * section should have a header in the format
	 * `///// <vertex OR fragment>`
	*/
	shaders(input: string)

	/** Attach shader from source */
	shader(source: string, type: ShaderType)

	/**
	 * Create 4 channel texture from the given array of bytes(0-255)
	 * @param bytes Will be converted to a Uint8Array, lenght must be i*j*4
	 * @param i number of rows (texture height)
	 * @param j number of columns (texture width)
	 */
	rawTexture(bytes: number[], i: number, j: number)

	uniforms<T extends Dict<UMethod>, K extends keyof T>(map: T):
		{ [P in K]: DropFirst<WebGL2[`uniform${T[P]}`]> }
}

type WebGL2 = WebGL2RenderingContext
type Callback = () => void
type Setter = (...values: number[]) => void
type Dict<T> = Record<string, T>
type DropFirst<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never


type ShaderType = 'vertex' | 'fragment'

//uniform[1234](u?i|f)v?
type UMethod = `${'1' | '2' | '3' | '4'}${'f' | 'i' | 'ui'}${'v' | ''}`
