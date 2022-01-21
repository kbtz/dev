type PlaceDirective = Directive<{ center: Point, size: 𝝶 }>

function getOrigin(el: HTMLElement) {
	const { width, height } = el.getBoundingClientRect()
	return [width / 2, height / 2]
}

export default <PlaceDirective>{
	mounted: (
		{ style: css, parentElement: parent },
		{ value: { center: { x, y }, size } }) => {
		css.height = css.width = size.px
		// TODO weak cache & resize obs
		const [ox, oy] = getOrigin(parent!)
		css.left = (ox + x - size / 2).px
		css.top = (oy + y - size / 2).px
	}
}