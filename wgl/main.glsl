#include "common.glsl"
#iChannel0 "back.glsl"
#iChannel1 "k.alpha.png"
#iChannel1::WrapMode "Clamp"

float noise(float c, vec2 p) {
	c += sin((p.x-p.y)*20.)/4.;
	c += N21(p)/2.;
	c /= 3.;
	return c;
}

void mainImage(out vec4 fragColor, in vec2 p) {
	vec4 b = texture(iChannel0, p / R);
	vec2 q = norm(p);
	float k = texture(iChannel1, q / R.y).r;
	b.r -= k * .6;
	vec3 c = vec3(noise(b.r, p));
	fragColor = vec4(c, b.a);
}