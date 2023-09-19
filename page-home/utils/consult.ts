import request from "@/api/request"
const API = "https://424neko.top:8182/api"
// 咨询
export function consultApi(data) {
	return request({
		url: `${API}/web/msg/question`,
		method: "POST",
		data
	}).then(res => {
		return res.data
	}).catch(err => {
		console.log("err", err)
	})
}