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

// 热门 - 主页
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
