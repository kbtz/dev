///// common
#define G 12.
precision mediump float;
///// fragment grid
void main() {
	gl_FragColor = vec4(0.,1.,0.,.5);
}
///// fragment main
void main() {
	gl_FragColor = vec4(0.,0.,1.,.5);
}
///// common
precision mediump float;
///// vertex
attribute vec3 pos;
void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
