///// common
#define U 12.
#define S 200.
precision mediump float;
///// fragment grid
uniform float dice;
void main() {
	vec2 p = gl_FragCoord.xy - S/2.;
	vec4 c = vec4(dice, 1. - dice, 0., .5);
	float d = length(p)/S/2.;
	gl_FragColor = c * d;
}
///// fragment main
uniform sampler2D grid;
void main() {
	vec2 p = gl_FragCoord.xy;
	vec4 gc, c = vec4(0., 0., 1., .5);
	if(p.x < S && p.y < S) {
		gc = texture2D(grid, p/S);
		c = gc;
	}
	
	gl_FragColor = c;
}
///// common
precision mediump float;
///// vertex
attribute vec3 pos;
void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
