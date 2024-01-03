import request from "@/api/request"
const API = "https://smarttool.wust.edu.cn:3001/api"

// 自己的后台
/**
 * 获取验证码 GET /api/get-verification-code
 * @return {string} 图片base64
 */
export async function getCodeApi() {
	const res = await request({
		url: `${API}/get-verification-code`,
		hideLoading: true,
	})
	return res.data
}

/**
 * 登录的第三个接口 从后端获取cookie GET /get-cookie
 * @param {string} data 数据
 * @return {string} Cookie
 */
export async function loginFinalApi(data : string) {
	const res = await request({
		url: `${API}/get-cookie`,
		data: {
			data: data,
		},
	})
	console.log("登录的最后一个接口，获取cookie")
	return res.data
}

//文章列表
// @params category=1&type=1&currentPage=1&pageSize=5
export async function articleListApi(data) {
	try {
		const res = await request({
			url: `${API}/getArticleList`,
			data: {
				currentPage: data.page,
				...data,
			},
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}

/**
 * 文章详情
 * @param {string} data 文章id
 * @return {any} data
 */
export async function articleDetailApi(data: string): any {
	try {
		const res = await request({
			url: `${API}/getDetailContent`,
			data: {
				url: data,
			},
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}