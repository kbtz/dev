await base

glsl.compile = input => {
	const sections= input
		.split('///')
		.filter(s => s)
	
	let common= '', programs= {}
	for(let source of sections) {
		const [type, name]=
			source.match(/^\/\/ ([a-z ]+)\b/)[1].split(' ')
		
		if(type == 'common') {
			common= source
			continue }
		
		source= common + source
		
		if(name) {
			programs[name] ||= {name}
			programs[name][type]= source }
		else programs.each(p => p[type]= source)
	}
	
	return programs }

free.glsl()
