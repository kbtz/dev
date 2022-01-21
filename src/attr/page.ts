type PageDirective = Directive<Dict<𝝺, Ev>>

export default <PageDirective>{
	mounted: (_, { value }) => value[𝝹𝝼]!.each(e => window.on(e.k, e.v)),
	unmounted: (_, { value }) => value[𝝹𝝼]!.each(e => window.off(e.k, e.v)),
}