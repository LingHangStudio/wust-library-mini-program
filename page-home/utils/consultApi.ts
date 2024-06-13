import request from "@/api/request"
import type { resConsultType, requestQuestion, feedBackList, openIdList } from "@/page-home/utils/types.d"
const API = "https://smarttool.wust.edu.cn:8182/api"


/**
 * 咨询：获取词条,咨询的结果
 * @param {requestQuestion} data 
 * @return {resConsultType[]}
 */
export async function consultApi(data : requestQuestion) : Promise<resConsultType[]> {
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

/** 
 * 咨询：匹配输入的词条（模糊查询）
 * @param {string} data
 * @return {string[]}
*/
export const getWordApi = async (data : string) : Promise<string[]> => {
	try {
		const res = await request({
			url: `${API}/web/qa/fuzzyQuery`,
			data: {
				msg: data
			},
			hideLoading: true
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}

/**
 * 咨询：获取词条,咨询的结果
 * @param {feedBackList} data 
 * @return {string[]}
 */
export async function submitFeedback(data : feedBackList) : Promise<string[]> {
	try {
		const res = await request({
			url: "https://smarttool.wust.edu.cn:8381/api/web/qa/review",
			method: "POST",
			data
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}


/**
 * 获取openid：
 * @param {openIdList} data 
 * @return {string[]}
 */
export async function getOpenId(data : openIdList) : Promise<string[]> {
	try {
		const res = await request({
			url: "https://api.weixin.qq.com/sns/jscode2session",
			method: "GET",
			data: data,
		})
		uni.setStorageSync("openId", res.data.openid);
		return res.data
	} catch (err) {
		console.log(err)
	}
}


/**
 * 问答系统：
 * @param {openIdList} data 
 * @return {string[]}
 */
export async function getAnswer(data : botQuestion) : Promise<string[]> {
	try {
		const res = await request({
			url: " https://openaiapi.weixin.qq.com/v2/bot/query",
			method: "POST",
			data: data,
		})
		console.log("测试", res)
		return res.data
	} catch (err) {
		console.log(err)
	}
}