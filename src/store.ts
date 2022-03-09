const
	{ theme } = state,
	{ parse, stringify } = JSON,
	{ getItem, setItem } = localStorage.bond


const store = {
	get: (key: 𝞁) => parse(getItem(key) || 'null'),
	set: (key: 𝞁, value: 𝞌) => setItem(key, stringify(value))
}

theme[𝞏] = store.get('theme') || {}
window.onbeforeunload = () => {
	store.set('theme', theme)
}

export default store