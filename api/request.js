  // const BASE_URL = "http://localhost:8081"

  //图书馆新服务器
  const BASE_URL = "http://59.68.177.141/api/server"
  //图书馆服务器
  // baseURL: "http://122.205.143.141:9999"
  // 向外暴露一个方法 request
  export default function request(options) {
  	//加载loading
  	uni.showLoading({
  		title: '数据加载中'
  	})
  	return new Promise((resolve, reject) => {
  		uni.request({
  			// 开发者服务器接口地址（请求服务器地址 + 具体接口名）
  			url: BASE_URL + options.url,
  			// 请求方式（若不传，则默认为 GET ）
  			method: options.method || 'GET',
  			// 请求参数（若不传，则默认为 {} ）
  			data: options.data || {},
  			header: options.header,
  			// 请求成功
  			success: (res) => {
  				console.log("总res", res);
  				// 此判断可根据自己需要更改
  				if (res.data.code !== 200) {
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