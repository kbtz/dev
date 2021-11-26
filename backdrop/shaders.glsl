///// common
#define G 12.
precision mediump float;
///// fragment
void main() {
	gl_FragColor = vec4(0.,0.,1.,.2);
}

///// vertex
attribute vec3 pos;
void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
