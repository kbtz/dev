#include "common.glsl"
#iChannel0 "self"

// r   g   b   a
// cur dir spd alp

vec4 setup(vec2 p) {
	float cur = N21(p2g(p));
	float dir = .4 + cur * .2;
	return vec4(cur, dir, 0., 1.);
}

vec4 update(vec2 p) {
	p = norm(p);
	vec4 c0 = texture(iChannel0, p / R);

	float c = c0.r, d = (c0.g - .5) * 2., s = c0.b * .3;
	c += S * d + s * S * sign(d);
	if (c > 1. || c < 0.) c0.g = 1. - c0.g;
	c0.b = clamp(c0.b + S * (1. - (distance(M, p) / Mr)), 0., 1.);
	return vec4(c, c0.g, c0.b, c0.a);
}

void mainImage(out vec4 fragColor, in vec2 p) {
	vec4 c = iFrame == 1
		? setup(p)
		: update(p);

	fragColor = c;
}