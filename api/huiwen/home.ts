// 此页接口不用Cookie

import request from "@/api/request"
const API = "https://libsys.wust.edu.cn"


//搜索 - 主页
export async function searchApi(data : any) {
	const res = await request({
		url: `${API}/meta-local/opac/search/`,
		method: "POST",
		data
	})
	return res?.data
}
// 热门检索词
export async function topSearchApi(count : number) {
	try {
		const res = await request({
			url: `${API}/meta-local/opac/commend/top_search_trend`,
			data: {
				count
			}
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}

// 热门图书 - 主页
export async function hotApi(count : number) {
	try {
		const res = await request({
			url: `${API}/meta-local/opac/commend/hot1`,
			method: "GET",
			data: {
				count
			}
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}

// 书籍的详情信息：基本信息
export async function deatileApi(bidId) {
	try {
		const res = await request({
			url: `${API}/meta-local/opac/bibs/${bidId}/infos`,
			method: "GET",
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}
// 书籍的额外信息： 封面，目录，
export async function deatileExtApi(isbn) {
	try {
		const res = await request({
			url: `${API}/meta-local/opac/third_api/douban/${isbn}/info`,
			method: "GET",
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}

// 书籍详情的阅读趋势
export async function deatileTrendApi(bidId) {
	try {
		const res = await request({
			url: `${API}/meta-local/opac/bibs/${bidId}/trend`,
			method: "GET",
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}

// 书籍详情：馆藏分布
export async function deatileHoldingApi(bidId) {
	try {
		const res = await request({
			url: `${API}/meta-local/opac/bibs/${bidId}/holdings`,
			method: "GET",
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}