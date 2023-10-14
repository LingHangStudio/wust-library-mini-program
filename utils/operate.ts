
const goBack = () => {
	uni.navigateBack()
}

const goTo = (e : string) => {
	uni.navigateTo({
		url: e,
	})
}

// 防抖函数
function debounce(fn, delay = 500) {
	let timer = null;
	return function (...args : any) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args)
			timer = null
		}, delay)
	}
}



export {
	goBack, goTo, debounce
}