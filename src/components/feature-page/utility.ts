export function mouse_over_featured(event:MouseEvent, num_of_elements:number, element_width:number) {
	if (!window.matchMedia("(pointer:coarse)").matches) {
		let container_width = (event.currentTarget as HTMLDivElement).getBoundingClientRect().width
		let mouse_x = event.clientX
		let guts_width = num_of_elements * (element_width + 5) + (element_width * 2)

		for (let child of (event.currentTarget as HTMLDivElement).children) {
			child.setAttribute("style", `${child.getAttribute("style")}transform: translateX(${-((mouse_x/container_width) * (guts_width - container_width)) + element_width}px);`)
		}
	}
}

function clamp(val:number, min:number, max:number){
	return Math.max(
		min,
		Math.min(
			val,
			max
		)
	)
}

export function touch_move_featured(event:TouchEvent, last_pos:[number, number], num_of_elements:number, element_width:number) {
	let curr_x = event.touches[0].clientX
	let old_x = last_pos[0]
	let diff = clamp(curr_x - old_x, -30, 30)
	let container_width = (event.currentTarget as HTMLDivElement).getBoundingClientRect().width
	let guts_width = (num_of_elements + 1) * (element_width + 10)
	let len_diff = container_width - guts_width
	
	
	let index = 0
	for (let child of (event.currentTarget as HTMLDivElement).children) {
		child.setAttribute("style", `${child.getAttribute("style")}transform: translateX(${
			clamp(
				child.getBoundingClientRect().x-((element_width + 10)*index)-5 + diff,
				len_diff + element_width ,
				10
			)
			}px);`)
		index++
	}
}