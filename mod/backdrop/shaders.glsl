///// common
#define P gl_FragCoord.xy
#define A vec2(1.,.5)
#define G R.zw
#define GH max(R.z, R.w)
#define GL min(R.z, R.w)
#define O mod(F, 2.) == 1.
#define N(x) max(0.,min(1.,x))
precision mediump float;

uniform float S;
uniform vec4  R;
uniform float T;
uniform float F;
uniform vec2  M;

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

bool inside() {
	vec4 l = texture2D(logo, fit(M));
	return l.r > .2;
}

vec4 update(vec2 p) {
	vec4
		t = texture2D(self, p),
		l = texture2D(logo, fit(p));
	
	float bstep = t.g * 2. - 1.,
		mouse = length((P - M*G)*A),
		around = max(0., 1. - mouse/10.);
	
	// grid tile darken/lighten
	t.b += bstep/200.;
	t.b += sign(bstep) * around/50.;
	t.b += sign(bstep) * (l.r/200.);
	
	// logo fade in/out
	t.r += l.r > .2 ? .003 : -.01;
	
	// logo hover
	if(inside() && l.r > .2) {
		t.a -= .05 * N21(P * T) * (1. - mouse/GL);
		t.a = max(t.a, .66 + t.b/3.);
	} else if(T > 10.)
		t.a += .002 + mouse/GL/50.;
	else
		t.a += .04;
	
	// grid tile step flip
	if(t.b < 0. || t.b > 1.)
		t.g = .5+((t.g-.5)*-1.);
	
	if(P.x < 1. && P.y < 1.)
		t.r = inside() ? 1. : 0.;
	
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

float noise(float c, vec2 p) {
	c += sin((p.x-p.y)*30.)/2.;
	c += N21(p)/2.;
	c /= 2.;
	return c;
}

void main() {
	vec4 t = texel(P);
	float c = noise(t.b, P);
	
	// darken logo area
	if(P.x > S*2.)
		c -= t.r * .3;
	c /= 2.;
	
	vec3 g = vec3(c);
	g.g*=1.2;
	g.rb/=1.6;
	gl_FragColor = vec4(g, t.a);
	
	if(P.x < 1. && P.y < 1.)
		gl_FragColor = texture2D(texA, vec2(0., 0.));
}
///// common
precision mediump float;
///// vertex
attribute vec3 pos;

void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
