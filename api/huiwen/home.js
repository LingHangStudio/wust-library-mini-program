import request from "@/api/huiwen/request.js"


//搜索 - 主页
export function searchApi(data) {
	return request({
		url: '/meta-local/opac/search/',
		method: "POST",
		data
	}).then(res => {
		return res.data
	})
}
// 热门检索词
export function topSearchApi(count) {
	return request({
		url: '/meta-local/opac/commend/top_search_trend',
		data:{
			count
		}
	}).then(res => {
		console.log("res",res)
		return res.data
	}).catch(err=>{
		console.log("err",err)
	})
}


// 热门图书 - 主页
export function hotApi(count) {
	return request({
		url: '/meta-local/opac/commend/hot1',
		method: "GET",
		data:{
			count
		}
	}).then(res => {
		console.log("res",res)
		return res.data
	}).catch(err=>{
		console.log("err",err)
	})
}

// 书籍的详情信息：基本信息
export function deatileApi(bidId) {
	return request({
		url: '/meta-local/opac/bibs/'+bidId+'/infos',
		method: "GET",
	}).then(res => {
		console.log("res",res)
		return res.data
	}).catch(err=>{
		console.log("err",err)
	})
}
// 书籍的额外信息： 封面，目录，
export function deatileExtApi(isbn) {
	return request({
		url:"/meta-local/opac/third_api/douban/"+isbn+"/info",
		method: "GET",
	}).then(res => {
		console.log("res",res)
		return res.data
	}).catch(err=>{
		console.log("err",err)
	})
}

// 书籍详情的阅读趋势
export function deatileTrend(bidId) {
	return request({
		url:"/meta-local/opac/bibs/"+bidId+"/trend",
		method: "GET",
	}).then(res => {
		console.log("res",res)
		return res.data
	}).catch(err=>{
		console.log("err",err)
	})
}