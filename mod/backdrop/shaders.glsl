///// common
#define P gl_FragCoord.xy
#define A vec2(1.,.5)
#define G R.zw
#define O mod(F, 2.) == 1.
#define N(x) max(0.,min(1.,x))
precision mediump float;

uniform float S;
uniform vec4  R;
uniform float T;
uniform float F;
uniform vec2  M;
uniform vec3  C;

highp float N21(vec2 i) {
	float r = dot(i.xy, vec2(12.9898,78.233));
	return fract(sin(mod(r,3.14))*43758.5453);
}
///// fragment grid
uniform sampler2D self;
uniform sampler2D logo;

vec4 setup(vec2 p) {
	float alpha = T < 2. ? 0. : 1.;
	return vec4(0., N21(p * F), N21(p * T), alpha);
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

bool inside(vec2 p) {
	vec4 l = texture2D(logo, fit(p));
	return l.r > .2;
}

float ripple() {
	if(inside(C.xy)) return 0.;
	float t = (T - C.z)/.4;
	if(t > 1.) return 0.;
	float m = length((P - C.xy*G)*A)/10.;
	return (abs(t-m) < .1 && N21(P) > .8) ? 1.-m : 0.;
}

vec4 update(vec2 p) {
	vec4
		t = texture2D(self, p),
		l = texture2D(logo, fit(p));
	
	float bstep = t.g * 2. - 1.,
		mouse = length((P - M*G)*A),
		around = max(0., 1. - mouse/10.);
	
	// grid tile darken/lighten
	t.b += bstep/150.;
	t.b += sign(bstep) * around/100.;
	t.b += sign(bstep) * (l.r/400.);
	
	// initial fade in
	if(T < 1.) t.a += .02;
	else t.a = 1. - ripple();
	
	// logo fade in/out
	bool hover = inside(M);
	if(T > .3 && l.r > .2) {
		if(t.r < .8 || hover)
			t.r += 0.015;
		if(t.r > .8 && !hover)
			t.r -= 0.015;
	}
	
	// grid tile step flip
	if(t.b < 0. || t.b > 1.)
		t.g = .5+((t.g-.5)*-1.);
	
	if(P.x < 1. && P.y < 1.)
		t.r = hover ? 1. : 0.;
	
	return t;
}

void main() {
	gl_FragColor = F == 1.
		? setup(P)
		: update(P/G);
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
	t /= G;
	return O
		? texture2D(texA, t)
		: texture2D(texB, t);
}

float noise(float c) {
	float t = .8;
	if(c > t) c += c - t;
	else c -= t - c;
	
	c += sin((P.x-P.y)*30.)/2.;
	c += N21(P)/2.;
	c /= 2.5;
	return c;
}

bool inside() {
	float key = texture2D(texA, vec2(0., 0.)).r;
	return key > .5;
}

float logo(float c, float l) {
	if(P.x < S*2.) return c;
	c -= l * .5;
	return c;
}

void main() {
	bool hover = inside();
	vec4 t = texel(P);
	float c = logo(t.b, t.r);
	vec3 g = vec3(noise(c));
	
	gl_FragColor = vec4(g, t.a);
	
	if(P.x < 1. && P.y < 1.)
		gl_FragColor.r = hover ? 1. : 0.;
}
///// common
precision mediump float;
///// vertex
attribute vec3 pos;

void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
