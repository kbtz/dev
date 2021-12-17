///// common
precision mediump float;

#define P gl_FragCoord.xy
#define A vec2 (1.,.5)
#define O mod(F, 2.) == 1.
#define N(x) max(0.,min(1.,x))

uniform float S;
uniform float T;
uniform float F;
uniform vec2 R;
uniform vec2 G;
uniform vec2 M;
uniform vec3 C;

highp float N21(vec2 i) {
	float r = dot(i.xy, vec2 (12.9898,78.233));
	return fract(sin(mod(r,3.14))*43758.5453);
}
///// fragment grid
uniform sampler2D self;
uniform sampler2D icon;

vec4 setup(vec2 p) {
	float alpha = T < 2. ? 0. : 1.;
	return vec4 (0., N21(p * F), N21(p * T), alpha);
}

vec2 fit(vec2 p) {
	float
		x=G.x, y=G.y/2.,
		b=max(x,y), s=min(x,y), a=s/b,
		i0=(1.-a)/2., i1=i0+a;
	
	if(x > y) p.x = N((p.x-i0)/a);
	else p.y = N((p.y-i0)/a);
	return p;
}

bool inside(vec2 p) {
	vec4 l = texture2D(icon, fit(p));
	return l.r > .2;
}

float ripple() {
	float t = (T - C.z)/.4;
	if(t > 1.) return 1.;
	float m = length((P - C.xy*G)*A)/min(G.x, G.y);
	return (abs(t-m) < .05 && N21(P*T) > .8) ? 1.-m : 1.;
}

const float ct=5., co=18.;
float curtain(vec2 p, float a) {
	if(T < co) return a;
	float y = p.y * 2. - 1.
	, tm=mod(T-co, ct * 4.)/ct, t=mod(tm, 2.)
	, cd=G.x*.05, cs=G.x*.9, cdf=tm>2. ? -1. : 1.;
	if(t>1.) t=2.-t;
	t=1. - pow(1. - t,4.);
	float cst=cs*t, pl=(G.x-cst)/2. + cd * t * cdf * y, pr=pl+cst;
	if(P.x>pl && P.x<pr) a-=.1;
	else a+=.01;
	return a;
}

vec4 update(vec2 p) {
	vec4 
		t = texture2D(self, p),
		l = texture2D(icon, fit(p));
	
	float bstep = t.g * 2. - 1.,
		mouse = length((P - M*G)*A),
		around = max(0., 1. - mouse/10.);
	
	// grid tile darken/lighten
	t.b += bstep/200.;
	t.b += sign(bstep) * around/100.;
	t.b += sign(bstep) * (l.r/400.);
	
	// initial fade in
	if(T < 4.) {
		if(t.g < T/3.) t.a += .02;
	} else {
		t.a = curtain(p, t.a);
		t.a *= ripple();
	}
	
	// icon fade in/out
	bool hover = inside(M);
	if(T > 2. && l.r > .2) {
		if(t.r < .8 || hover)
			t.r += 0.01 * (.2 + p.y);
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
uniform sampler2D ping;
uniform sampler2D pong;

vec4 texel(vec2 p) {
	if (fract(p.x/(S*2.)) > .5)
		p.y += S/2.;
	vec2 t = p/S, g = fract(t);
	t.y *= 2.; g.x /= 2.;
	if (g.y <= .5 && g.y > g.x || g.y > 1. - g.x)
		t.y += 1.;
	t /= G;
	
	return O
		? texture2D(ping, t)
		: texture2D(pong, t);
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
	float key = texture2D(ping, vec2 (0., 0.)).r;
	return key > .5;
}

float icon(float c, float l) {
	if(P.x < S*2.) return c;
	c -= l * .5;
	return c;
}

void main() {
	bool hover = inside();
	vec4 t = texel(P);
	float c = icon(t.b, t.r);
	vec3 g = vec3 (noise(c));
	
	gl_FragColor = vec4 (g, t.a);
	
	if(P.x < 1. && P.y < 1.)
		gl_FragColor.r = hover ? 1. : 0.;
}
///// common
precision mediump float;
///// vertex
attribute vec3  pos;

void main() {
	gl_Position = vec4 (pos * 2. - 1., 1);
}
