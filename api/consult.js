import request from "@/api/request.js"


//轮播图
export function searchQuestion(data) {
	return request({
		url: "/web/msg/question",
		method: "POST",
		data: data
	}).then(res => {
		return res.data
	}).catch(err => {
		console.log(err);
	})
}