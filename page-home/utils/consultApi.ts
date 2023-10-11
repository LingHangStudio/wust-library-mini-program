import request from "@/api/request"
const API = "https://424neko.top:8182/api"

// 咨询：获取词条
export function getWordApi(data) {
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

// 咨询：匹配输入的词条
export const consultApi=(data)=> {
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