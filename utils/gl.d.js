/**
 * @callback GL
 * @param {HTMLCanvasElement} canvas 
 * @param {WebGLContextAttributes} [opts]
 * @returns {GLAPI}
 * 
 * @typedef {object} GLAPI
 * @property {() => Callback} quad - Set a normalized quad on attribute #0, returns its draw call
 * @property {(source: string, type: ShaderType) => void} shader - Attach shader from source
 * @property {Matrext} matrext - Create 4 channel texture from the given array of bytes(0-255)
 * 
 * @callback Matrext 
 * @param {number[]} bytes - Will be converted to a Uint8Array, lenght must be i*j*4 
 * @param {number} i - number of rows (texture height)
 * @param {number} j - number of columns (texture width)
 * 
 * @typedef {() => void} Callback
 * @typedef {'vertex' | 'fragment'} ShaderType
 */