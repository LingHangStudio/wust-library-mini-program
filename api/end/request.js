//服务器
const BASE_URL = "https://424neko.top:3001"
// 向外暴露一个方法 request
export default function request(options) {
	//加载loading
	uni.showLoading({
		title: '数据加载中'
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: options.header,
			success: (res) => {
				console.log("总res", res);
				if (res.data.status !== 200) {
					uni.showToast({
						title: '获取数据失败！',
						icon: "error"
					})
					reject(res.data.message)
				}
				resolve(res)
			},
			fail: (err) => {
				console.log("总err", err);
				uni.showToast({
					title: '请求接口失败！',
					icon: "error"
				})
				reject(err)
			},
			complete() {
				//隐藏loading
				uni.hideLoading()
			}
		})
	})
}