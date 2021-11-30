///// common
#define P gl_FragCoord.xy
#define A vec2(1.,.5)
#define G R.zw
#define O mod(F, 2.) == 1.
#define N(x) max(0.,min(1.,x))
precision mediump float;

uniform float S;
uniform float T;
uniform float F;
uniform vec2  M;
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
uniform sampler2D self;
uniform sampler2D logo;

vec4 setup(vec2 p) {
	return vec4(N23(p * F), 1.);
}

vec2 fit(vec2 p) {
	float
		x=R.z, y=R.w/2.,
		b=max(x,y), s=min(x,y), a=s/b,
		i0=(1.-a)/2., i1=i0+a;
	
	if(x > y) p.x = N((p.x-i0)/a);
	else p.y = N((p.y-i0)/a);
	return p;
}

vec4 update(vec2 p) {
	vec4
		t = texture2D(self, p),
		l = texture2D(logo, fit(p));
	
	float bstep = t.g * 2. - 1.,
		around = max(0., 1. - length((P - M*G)*A)/10.);
	t.b += bstep/300.;
	t.b += sign(bstep) * around/80.;
	t.b += sign(bstep) * (l.r/150.);
	t.r = l.r;
	
	if(t.b < 0. || t.b > 1.)
		t.g = .5+((t.g-.5)*-1.);
	return t;
}

void main() {
	vec2 p = gl_FragCoord.xy;
	gl_FragColor = F == 1.
		? setup(p)
		: update(p/R.zw);
}
///// fragment main
uniform sampler2D texA;
uniform sampler2D texB;

vec4 texel(vec2 p) {
	if (fract(p.x/(S*2.)) > .5)
		p.y += S/2.;
	vec2 t = p/S, g = fract(t);
	t.y *= 2.; g.x /= 2.;
	if (g.y <= .5 && g.y > g.x || g.y > 1. - g.x)
		t.y += 1.;
	t /= R.zw;
	return O
		? texture2D(texA, t)
		: texture2D(texB, t);
}

vec3 noise(float c, vec2 p) {
	c += sin((p.x-p.y)*30.)/2.;
	c += N21(p)/2.;
	c /= 2.;
	return vec3(c);
}

void main() {
	vec2 p = gl_FragCoord.xy;
	vec4 t = texel(p);
	vec3 c = vec3(noise(t.b, p));
	c -= t.r * .2;
	c *= .8;
	gl_FragColor = vec4(c, t.a);
}
///// common
precision mediump float;
///// vertex
attribute vec3 pos;

void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
