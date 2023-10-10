
const goBack = () => {
	uni.navigateBack()
}

const goTo = (e : string) => {
	uni.navigateTo({
		url: e,
	})
}

export {
	goBack, goTo
}