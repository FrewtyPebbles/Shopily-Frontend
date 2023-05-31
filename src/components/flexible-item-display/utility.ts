import { FlexibleItemProps } from "../flexible-item/flexible-item";
import seedrandom from 'seedrandom'

export function shuffle<Type>(array:Type[]):Type[] {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
	let s = new Date().getMilliseconds()
	let rng = seedrandom(`${s}`)
	let random_val = rng()
	//console.log(random_val);
    randomIndex = Math.floor(random_val * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function rand_range_int(min:number, max:number) {
	let s = new Date().getMilliseconds()
	let rng = seedrandom(`${s}`)
	let random_val = rng()
    return Math.round(random_val * (max - min) + min);
}

export function chunk_array(arr:FlexibleItemProps[], size:number):FlexibleItemProps[][] {
    return arr.length > size
    ? [arr.slice(0, size), ...(chunk_array(arr.slice(size), size) as any[])]
    : [arr]
}

const load_image = (src:string):Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  })  
;

export async function sizedchunk_array(arr:FlexibleItemProps[], size:number, display_width:number) {
	// TODO: Fix bug where sometimes images appear large in the middle of a row.
	arr = shuffle(arr)
	let s = new Date().getMilliseconds()
	var rng = seedrandom(`${s}`)
	var ret_array:FlexibleItemProps[][] = []
	while(arr.length != 0) {
		let remaining_width = display_width
		let chunk:FlexibleItemProps[] = []
		var true_height = rand_range_int(200, 250)
		for (let i = 0; i < size; i++) {
			let biggest_item:[FlexibleItemProps|null, number, number, number] = [null, 0, 0, 0]
			let ind = 0
			for (var item of arr) {
				let img = await load_image(item.img_url)
				let width = img.width
				let height = img.height
				let wratio = width/height
				let hratio = height/width
				let true_width = true_height*wratio
				if (true_width < remaining_width && (
						biggest_item[1] < true_width || biggest_item[0] == null
					) && rng() < 0.5)
				{
					biggest_item = [item, true_width, ind, hratio];
					if (rng() < 0.2 && chunk.length == 1 && ret_array.length > 1) {
						break
					}
				}
				if (biggest_item[0] != null)
					(biggest_item[0] as FlexibleItemProps).height = true_height
				ind++
			}
			if (biggest_item[0] != null) {
				if (Math.round(biggest_item[1]) >= Math.round(remaining_width)) {
					true_height = remaining_width*biggest_item[3]
				}
				biggest_item[0].height = true_height
				chunk.push(biggest_item[0])
				arr.splice(biggest_item[2], 1)
				remaining_width -= biggest_item[1]
			}
		}
		if (chunk.length === 1){
			chunk[0].img_url
			let img = await load_image(chunk[0].img_url)
			let width = img.width
			let height = img.height
			let hratio = height/width
			chunk[0].height = Math.min(display_width*hratio, 800)
			ret_array.push([...chunk])
		}
		else// if (chunk.length > 1)
			ret_array.push([...chunk])
	}
	
	return ret_array
}