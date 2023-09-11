import request from "@/api/request"
const API = "https://auth.wust.edu.cn"

// 登录经过几层封装--获得最终的cookie

/*
* 登录接口1 POST /lyuapServer/v1/tickets
* 
* @prarm username 学号
* @prarm password rsa加密后的密码
* @prarm service 浏览器跳转的去向，在小程序中无意义
* @prarm loginType ''
* return 一段字符串
*/
export async function loginAPI(data : any) {
	try {
		const res = await request({
			url: `${API}/lyuapServer/v1/tickets`,
			method: "POST",
			header: {
				"Accept": "application/json, text/plain",
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
				"Origin": "https://auth.wust.edu.cn",
				"Host": "auth.wust.edu.cn"
			},
			noValidate: true,
			data
		})
		return res
	} catch (err) {
		console.log("err", err)
	}
}


/*
* 登录接口2 POST  /lyuapServer/v1/tickets
* @prarm 上一个接口的返回值，拼接在url后面
* 
* return 还是一段字符串
*/
export async function login1API(data : any) {
	try {
		const res = await request({
			url: `${API}/lyuapServer/v1/tickets/` + data,
			method: "POST",
			noValidate: true,
			header: {
				"Accept": "application/json, text/plain, */*",
				"Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
				"Cookie": "loginType=1;session=1",
				"X-Requested-With": "XMLHttpRequest",
				// "Referer": "https://auth.wust.edu.cn/lyuapServer/login?service=https://libsys.wust.edu.cn:443/meta-local/opac/cas/rosetta"
			},
			data: {
				service: "https://libsys.wust.edu.cn:443/meta-local/opac/cas/rosetta"
			}
		})
		return res
	} catch (err) {
		console.log("err", err)
	}
}