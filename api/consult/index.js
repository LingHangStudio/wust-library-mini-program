import request from "@/api/consult/request.js"

// 咨询
export function consultApi(data) {
	return request({
		url: '/api/web/msg/question',
		method: "POST",
		data
	}).then(res => {
		return res.data
	}).catch(err=>{
		console.log("err",err)
	})
}