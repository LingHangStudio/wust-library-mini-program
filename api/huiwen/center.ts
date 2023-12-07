import request from "@/api/request"
const API = "https://libsys.wust.edu.cn/meta-local/opac/users"

/*
* 借阅状态-总览 GET /meta-local/opac/users/stats
* 放在App.vue里，不验证401,noValidate为true
*/
export async function statsApi() {
	const res = await request({
		url: `${API}/stats`,
		header: {
			Cookie: uni.getStorageSync("Cookie")
		},
		noValidate: true
	})
	return res
}