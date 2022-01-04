type PageDirective = Directive<Dict<𝝺, Ev>>

export default <PageDirective>{
	mounted: (el, { value }) => value[𝝹𝝼]!.each(e => window.on(e.k, e.v)),
	unmounted: (el, { value }) => value[𝝹𝝼]!.each(e => window.off(e.k, e.v)),
}