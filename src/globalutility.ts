export function classNames(...args:(string | undefined)[]) {
	let ret_array:string[] = []
	for (let arg of args) {
		if (typeof arg == "string")
			ret_array.push(arg)
	}
	return ret_array.join(" ")
}