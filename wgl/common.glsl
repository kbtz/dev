#define U 12.
#define S .03
#define R iResolution.xy
#define M iMouse.xy
#define Mr 128.
#define P 3.1417

#define norm(a) g2p(p2g(a))
#define odd(a) if(mod(a,2.)!=0.)

precision highp float;
 
highp float N21(vec2 co) {
	float n = dot(co, vec2(12.9898,78.233));
	n = sin(mod(n, 3.1417));
	return fract(n * 43758.5453);
}

vec2 p2g(vec2 p) {
	p.x /= U;
	p.y /= U / 2.;
	vec2 g = floor(p);
	p = fract(p);

	odd(g.x) {
		odd(g.y) {
			if (p.x < p.y) g.y++;
		} else if (p.x > 1. - p.y) g.y++;
	} else {
		odd(g.y) {
			if (p.x > 1. - p.y) g.y++;
		} else if (p.x < p.y) g.y++;
	}
	return g;
}

vec2 g2p(vec2 g) {
	return vec2(
		g.x * U + U / 2.,
		g.y * (U / 2.)
	);
}