type PlaceDirectiveValue = { center: 𝝣<𝝶>, size: 𝝶 }
type PlaceDirective = Directive<PlaceDirectiveValue>

function apply({ style: css }: HTMLElement, { center, size }: PlaceDirectiveValue) {
	const [x, y] = center
	css.height = css.width = size.px
	css.left = (x - size / 2).px
	css.top = (y - size / 2).px
}

export default <PlaceDirective>{
	mounted: (el, { value }) => apply(el, value),
	updated: (el, { value }) => apply(el, value)
}