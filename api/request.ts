// #ifndef APP-PLUS
import { useStore } from "@/store"
const store = useStore()
// #endif
interface headerType {
	Cookie ?: string;
	Accept ?: string;
	Origin ?: string;
	[k : string] : unknown;// 任意键值对
}

interface requestType {
	header ?: headerType;
	url : string;
	method ?: 'GET' | 'POST' | 'PUT';
	data ?: any;
	hideLoading ?: boolean;
	noValidate ?: boolean;
}

interface responceType {
	msg ?: string;
	data : any;
	code ?: any;
	status ?: any;
	statusCode ?: any;
}

interface errType {
	errMsg : string;
}

//服务器
// 向外暴露一个方法 request
export default function request(options : requestType) {
	//加载loading
	if (!options.hideLoading) {
		uni.showLoading({
			title: '数据加载中'
		})
	}

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
			withCredentials: true,
			// 请求成功
			success: (res : responceType) => {
				console.log("总res", res);
				// debugger
				// 此判断可根据自己需要更改 汇文的code为0
				if (!options?.noValidate && (res.data?.status !== 200 && res.data?.code !== 200 && res.data?.code !== 0)) {
					if (res.statusCode === 401) {
						// 未登录，或者登录过期
						uni.removeStorageSync("Cookie")
						// #ifndef  APP-PLUS
						store.setloginState(false)
						// #endif
						uni.removeStorageSync("loginInfo")
						uni.showToast({
							title: "未登录或者登录过期",
							icon: "error"
						})
						reject()
					}
					uni.showToast({
						title: '获取数据失败！',
						icon: "error"
					})
					uni.hideLoading()
					reject(res.data.message)
				}
				// 响应成功执行
				resolve(res)
			},
			// 请求失败
			fail: (err : errType) => {
				console.log("总err", err);
				console.log("总err msg", err.errMsg.indexOf('timeout'));
				if (err.errMsg.indexOf('timeout') !== -1) {
					uni.showToast({
						title: '请求超时！',
						icon: "error"
					})
				} else {
					uni.showToast({
						title: '请求失败！',
						icon: "error"
					})
				}
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