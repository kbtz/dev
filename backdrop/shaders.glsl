///// fragment
#define G 12.
precision mediump float;
uniform vec2 M;
uniform vec4 R;
uniform sampler2D T;

vec4 texel(vec2 p) {
	if (fract(p.x/(G*2.)) > .5) p.y += G/2.;
	vec2 t = p/G, g = fract(t);
	t.y *= 2.; g.x /= 2.;
	if (g.y <= .5 && g.y > g.x || g.y > 1. - g.x) t.y += 1.;
	return texture2D(T, (t)/R.zw);
}

void main() {
	vec2 p = gl_FragCoord.xy;
	float r = distance(M, p) / 80.;
	gl_FragColor = texel(p);
}

///// vertex
precision mediump float;
attribute vec3 pos;
void main() {
	gl_Position = vec4(pos * 2. - 1., 1);
}
