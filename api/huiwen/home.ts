import request from "@/api/request"
const API = "https://libsys.wust.edu.cn"


/*
* 登录的第三个接口 从汇文获取cookie
* 参数拼接到url后面 
* /meta-local/opac/cas/rosetta?ticket=
*/
export async function loginFinalApi(data) {
	const res = await request({
		// url: 'http://localhost/library/meta-local/opac/cas/rosetta?ticket=' + data,
		url: `${API}/meta-local/opac/cas/rosetta?ticket=` + data,
		method: "GET",
		header:{
			// "Referer":"https://auth.wust.edu.cn/",
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
		},
		// noValidate:true
	})
	
	
	console.log("登录的最后一个接口，获取cookie")
	console.log(res)
	// uni.setStorageSync("cookie",res.headers.)
	return res
}

//搜索 - 主页
export async function searchApi(data) {
	const res = await request({
		url: `${API}/meta-local/opac/search/`,
		method: "POST",
		data
	})
	return res?.data
}
// 热门检索词
export async function topSearchApi(count) {
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
export async function hotApi(count) {
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