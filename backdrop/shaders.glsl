///// common
#define S 12.
precision mediump float;

uniform float T;
uniform int F;
uniform ivec2 R;
uniform ivec2 M;

highp float N21(vec2 i) {
	float r = dot(i.xy, vec2(12.9898,78.233));
	return fract(sin(mod(r,3.14))*43758.5453);
}
///// fragment grid
uniform sampler2D tex;
uniform float X;

void main() {
	vec2 p = gl_FragCoord.xy;
	vec4 c = vec4(X, 0., 0., 1.);
	gl_FragColor = c;
}
///// fragment main
uniform sampler2D texA;
uniform sampler2D texB;

void main() {
	vec2 p = gl_FragCoord.xy, o = vec2(0., 0.);
	float r;
	if(p.x < 150.) r = texture2D(texA, o).r;
	else r = texture2D(texB, o).r;
	vec4 c = vec4(r, 0., 0., 1.);
	gl_FragColor = c;
}
///// common
precision mediump float;
///// vertex
attribute vec3 pos;

void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
