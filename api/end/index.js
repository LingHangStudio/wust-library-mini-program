import request from "@/api/huiwen/request.js"


//文章列表
// @params category=1&type=1&currentPage=1&pageSize=5
export function  articleListApi(data) {
	return request({
		url: '/api/getArticleList',
		method: "POST",
		data
	}).then(res => {
		return res.data
	})
}
// 文章详情
// @params url 
// https://mp.weixin.qq.com/s/jIBt3ZtsHLN-XK9nLfyOKA
export function articleDetailApi(data) {
	return request({
		url: '/api/getDetailContent',
		data,
	}).then(res => {
		console.log("res",res)
		return res.data
	}).catch(err=>{
		console.log("err",err)
	})
}
