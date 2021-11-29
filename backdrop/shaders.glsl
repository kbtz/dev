///// common
#define O mod(F, 2.) == 1.
precision mediump float;

uniform float S;
uniform float T;
uniform float F;
uniform vec4  R;

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

vec4 setup(vec2 p) {
	return vec4(N23(p * T), 1.);
}

vec4 update(vec2 p) {
	vec4 last = texture2D(tex, p/R.zw);
	last.r += sin(T) * .01;
	last.b += .001;
	return last;
}

void main() {
	vec2 p = gl_FragCoord.xy;
	gl_FragColor = F == 1.
		? setup(p)
		: update(p);
}
///// fragment main
uniform sampler2D texA;
uniform sampler2D texB;

vec2 texel(vec2 p) {
	if (fract(p.x/(S*2.)) > .5) p.y += S/2.;
	vec2 t = p/S, g = fract(t);
	t.y *= 2.; g.x /= 2.;
	if (g.y <= .5 && g.y > g.x || g.y > 1. - g.x) t.y += 1.;
	return t/R.zw;
}

void main() {
	vec2 	
		p = gl_FragCoord.xy,
		t = texel(p);
	
	vec4 c;
	c = O ? texture2D(texA, t) : texture2D(texB, t);
	
	gl_FragColor = c;
}
///// common
precision mediump float;
///// vertex
attribute vec3 pos;

void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
