declare interface Object {
	// TODO

	merge: Function
	keys: Function
	values: Function
	map: Function
}

declare interface Array<T> {
	at: (index: any) => T
}