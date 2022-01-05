// NOTE: symbols declared as globals at /env 

const
	merge = Object.assign,
	symbols = ['𝝹', '𝝼', '𝝹𝝼', '𝞀', '𝞃', '𝝠', '𝞈', '𝞏'],
	toSymbol = (o: Object, s: string) => merge(o, { [s]: Symbol.for(s) })

merge(window, symbols.reduce(toSymbol, {}))
