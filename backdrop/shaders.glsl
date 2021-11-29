///// common
#define S 12.
#define O mod(F, 2.) == 1.
precision mediump float;

uniform float T;
uniform float F;
uniform vec2  R;

highp float N21(vec2 i) {
	float r = dot(i.xy, vec2(12.9898,78.233));
	return fract(sin(mod(r,3.14))*43758.5453);
}

highp vec3 N23(vec2 i) {
	float r = N21(i);
	vec3 ns = vec3(r*7.456, r*8.589, r*9.154);
	return fract(ns);
}
///// fragment grid
uniform sampler2D tex;

void main() {
	vec2 p = gl_FragCoord.xy/R;
	vec3 c = N23(p * F);
	if(O) c.r = 1.;
	else c.g = 1.;
	
	gl_FragColor = vec4(c, 1.);
}
///// fragment main
uniform sampler2D texA;
uniform sampler2D texB;

void main() {
	vec2 p = gl_FragCoord.xy/R;
	vec4 c;
	c = texture2D(texA, p);
	
	if(p.x < .5 && p.y < .5)
		c = texture2D(texB, p);
	gl_FragColor = c;
}
///// common
precision mediump float;
///// vertex
attribute vec3 pos;

void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
