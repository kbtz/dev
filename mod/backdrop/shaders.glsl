///// common
precision 𝚖𝚏;

𝚍P gl_FragCoord.xy
𝚍A 𝚙(1.,.5)
𝚍G R.zw
𝚍O mod(F, 2.) == 1.
𝚍N(x) max(0.,min(1.,x))

𝚞𝚏S; 𝚞𝚟R; 𝚞𝚏T; 𝚞𝚏F; 𝚞𝚙M; 𝚞𝚌C;

𝚑𝚏N21(𝚙i) {
	𝚏r = dot(i.xy, 𝚙(12.9898,78.233));
	return fract(sin(mod(r,3.14))*43758.5453);
}
///// fragment grid
𝚞𝚜self;
𝚞𝚜logo;

𝚟setup(𝚙p) {
	𝚏alpha = T < 2. ? 0. : 1.;
	return 𝚟(0., N21(p * F), N21(p * T), alpha);
}

𝚙fit(𝚙p) {
	𝚏
		x=R.z, y=R.w/2.,
		b=max(x,y), s=min(x,y), a=s/b,
		i0=(1.-a)/2., i1=i0+a;
	
	if(x > y) p.x = N((p.x-i0)/a);
	else p.y = N((p.y-i0)/a);
	return p;
}

𝚋inside(𝚙p) {
	𝚟l = texture2D(logo, fit(p));
	return l.r > .2;
}

𝚍SF 50.
𝚍ST 8.
𝚍Y ((P.y/G.y)*2.)-1.
𝚍SM(a,b,c) smoothstep(a,b,c)

𝚏ripple() {
	𝚏t = (T - C.z)/.4;
	if(t > 1.) return 1.;
	𝚏m = length((P - C.xy*G)*A)/min(G.x, G.y);
	return (abs(t-m) < .05 && N21(P*T) > .8) ? 1.-m : 1.;
}

𝚟update(𝚙p) {
	𝚟
		t = texture2D(self, p),
		l = texture2D(logo, fit(p));
	
	𝚏bstep = t.g * 2. - 1.,
		mouse = length((P - M*G)*A),
		around = max(0., 1. - mouse/10.);
	
	// grid tile darken/lighten
	t.b += bstep/200.;
	t.b += sign(bstep) * around/100.;
	t.b += sign(bstep) * (l.r/400.);
	
	// initial fade in
	if(T < 4.) {
		if(pow(t.g, 2.) < T/3.) t.a += .02;
	} else {
		t.a *= ripple();
	}
	
	// logo fade in/out
	𝚋hover = inside(M);
	if(T > 2. && l.r > .2) {
		if(t.r < .8 || hover)
			t.r += 0.01 * (.2 + p.y * t.g);
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
𝚞𝚜texA;
𝚞𝚜texB;

𝚟texel(𝚙p) {
	if (fract(p.x/(S*2.)) > .5)
		p.y += S/2.;
	𝚙t = p/S, g = fract(t);
	t.y *= 2.; g.x /= 2.;
	if (g.y <= .5 && g.y > g.x || g.y > 1. - g.x)
		t.y += 1.;
	t /= G;
	return O
		? texture2D(texA, t)
		: texture2D(texB, t);
}

𝚏noise(𝚏c) {
	𝚏t = .8;
	if(c > t) c += c - t;
	else c -= t - c;
	
	c += sin((P.x-P.y)*30.)/2.;
	c += N21(P)/2.;
	c /= 2.5;
	return c;
}

𝚋inside() {
	𝚏key = texture2D(texA, 𝚙(0., 0.)).r;
	return key > .5;
}

𝚏logo(𝚏c, 𝚏l) {
	if(P.x < S*2.) return c;
	c -= l * .5;
	return c;
}

void main() {
	𝚋hover = inside();
	𝚟t = texel(P);
	𝚏c = logo(t.b, t.r);
	𝚌g = 𝚌(noise(c));
	
	gl_FragColor = 𝚟(g, t.a);
	
	if(P.x < 1. && P.y < 1.)
		gl_FragColor.r = hover ? 1. : 0.;
}
///// common
precision 𝚖𝚏;
///// vertex
attribute 𝚌 pos;

void main() {
	gl_Position = 𝚟(pos * 2. - 1., 1);
}
