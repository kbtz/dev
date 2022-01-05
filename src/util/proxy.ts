Proxy.trap = function <T extends 𝝷>(target: T, set: PSet<T>) {
	return new Proxy(target, { set })
}

Proxy.reader = r => new Proxy({}, { get: (o, k) => r(k, o) })
Proxy.writer = w => new Proxy({}, { set: (o, k, v) => w(k, v, o) })