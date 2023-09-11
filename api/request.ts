//
//
//服务器
// 向外暴露一个方法 request
export default function request(options) {
	//加载loading
	uni.showLoading({
		title: '数据加载中'
	})
	return new Promise((resolve, reject) => {
		console.log("请求参数", options)
		uni.request({
			// 开发者服务器接口地址（请求服务器地址 + 具体接口名）
			url: options.url,
			// 请求方式（若不传，则默认为 GET ）
			method: options.method || 'GET',
			// 请求参数（若不传，则默认为 {} ）
			data: options.data || {},
			header: options.header,
			getResponse:true,
			withCredentials:true,
			// 请求成功
			success: (res) => {
				console.log("总res", res);
				console.log("cookie",res.header['Set-Cookie'])
				// 此判断可根据自己需要更改
				if (!options.noValidate && (res.data.status !== 200 && res.data.code !== 0)) {
					uni.showToast({
						title: '获取数据失败！',
						icon: "error"
					})
					reject(res.data.message)
				}
				// 响应成功执行
				resolve(res)
			},
			// 请求失败
			fail: (err) => {
				console.log("总err", err);
				uni.showToast({
					title: '请求接口失败！',
					icon: "error"
				})
				// 响应失败执行
				reject(err)
			},
			//请求结束之后，执行的回调函数（成功或失败都会执行）
			complete() {
				//隐藏loading
				uni.hideLoading()
			}
		})
	})
}