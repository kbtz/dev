type ResizeDirective = Directive<𝝺>

export default <ResizeDirective>{
	mounted: (el, { value }) =>
		new ResizeObserver(([entry]) => value(entry.contentRect)).observe(el)
}