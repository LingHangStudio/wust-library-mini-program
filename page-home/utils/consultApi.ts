import request from "@/api/request"
import type { resConsultType, requestQuestion } from "@/page-home/utils/types.d"
const API = "https://424neko.top:8182/api"

// 咨询：获取词条
export async function getWordApi(data : requestQuestion) : Promise<resConsultType[]> {
	try {
		const res = await request({
			url: `${API}/web/msg/question`,
			method: "POST",
			data
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}

// 咨询：匹配输入的词条
export const consultApi = async (data) : Promise<any> => {
	try {
		const res = await request({
			url: `${API}/web/msg/question`,
			method: "POST",
			data
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}