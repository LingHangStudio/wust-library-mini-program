import request from "@/api/request"
const API = "https://libsys.wust.edu.cn/meta-local/opac/users"

/*
* 获取用户信息 GET /meta-local/opac/users/info
* @prarm isPlaintext false
* @header
* 
*/
export async function userInfoApi() {
	const res = await request({
		url: `${API}/info`,
		header: {
			Cookie: uni.getStorageSync('Cookie')
		},
		data: {
			isPlaintext: false
		}
	})
	return res?.data
}

/*
* 借阅状态-总览 GET /meta-local/opac/users/stats
*/
export async function statsApi() {
	const res = await request({
		url: `${API}/stats`,
		header: {
			Cookie: uni.getStorageSync("Cookie")
		},
	})
	return res?.data
}

/*
* 当前借阅列表 GET /meta-local/opac/users/loans?page=1&pageSize=100
* @param page 当前页数
* @param pageSize 每页大小
* @return [] 列表
*/
export async function readListApi(page : number, pageSize : number) {
	const res = await request({
		url: `${API}/loans`,
		header: {
			Cookie: uni.getStorageSync("Cookie")
		},
		data: {
			page,
			pageSize
		}
	})
	return res?.data
}

/*
* 借阅分布 GET /meta-local/opac/users/loan_dcp_dist
* @return [] 用于画饼图
*/
export async function typeListApi() {
	const res = await request({
		url: `${API}/loan_dcp_dist`,
		header: {
			Cookie: uni.getStorageSync("Cookie")
		},
	})
	return res?.data
}

/*
* 借阅时间分布 GET /meta-local/opac/users/loan_range_dist
* @return {} 用于画柱状图
*/
export async function trendListApi() {
	const res = await request({
		url: `${API}/loan_range_dist`,
		header: {
			Cookie: uni.getStorageSync("Cookie")
		},
	})
	return res?.data
}

/*
* 借阅的所有的书籍
* 借阅历史 GET /meta-local/opac/users/loan_hists
* @prarm page
* @prarm pagesize
*/
export async function histsListApi(page : number, pageSize : number) {
	const res = await request({
		url: `${API}/loan_hists`,
		header: {
			Cookie: uni.getStorageSync("Cookie")
		},
		data: {
			page,
			pageSize
		}
	})
	return res?.data
}

/*
* 即将到期
* 借阅历史 GET /meta-local/opac/users/overdue_soon
*/
export async function overDueListApi() {
	const res = await request({
		url: `${API}/overdue_soon`,
		header: {
			Cookie: uni.getStorageSync("Cookie")
		}
	})
	return res?.data
}

/*
* 续借
* 续借操作 GET /meta-local/opac/users/overdue_soon
* @param {string} loanId 书籍id
* @return {} status是否续借成功
*/
export async function renewApi(loanId : string) {
	const res = await request({
		url: `${API}/renew`,
		method: "POST",
		header: {
			Cookie: uni.getStorageSync("Cookie")
		},
		data: {
			loanId,
			source: 0
		},
		noValidate: true
	})
	return res?.data
}



/*
* 超期记录
* 借阅历史 GET /meta-local/opac/users/fines
* @prarm page
* @prarm pagesize
*/
export async function fineListApi(page : number, pageSize : number) {
	const res = await request({
		url: `${API}/fines`,
		header: {
			Cookie: uni.getStorageSync("Cookie")
		},
		data: {
			page,
			pageSize
		}
	})
	return res?.data
}