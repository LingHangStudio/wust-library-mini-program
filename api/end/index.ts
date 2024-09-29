import request from "@/api/request"
const API = "https://smarttool.wust.edu.cn:3001/api"

// 自己的后台
/**
 * 获取验证码 GET /api/get-verification-code
 * @return {string} 图片base64
 */
export interface allResponse {
	code : number,
	msg : string,
	data : any,
}
export async function getCodeApi() {
	const res = await request({
		url: `${API}/wx/login/getVerificationCode`,
		hideLoading: true,
	})
	return res.data
}

//获取获取最新的公告 pages/home/search
export async function getNotice() : Promise<allResponse> {
	const res = await request({
		url: `${API}/wx/notice/new`,
	})
	return res.data
}



export interface swiperList {
	id : number,
	pictureLink : string,
	articleLink : string,
	show : number
}
interface homeArticleResponse {
	code : number,
	msg : string,
	data : swiperList[],
}
//获取首页轮播图数据
export async function getHomeArticle() : Promise<homeArticleResponse> {
	const res = await request({
		url: `${API}/wx/home/getHomeArticle`,
	})
	return res.data
}


//文章列表  /pages/activity/index
export async function articleListApi() {
	const res = await request({
		url: `${API}/wx/article/getArticleList`,
	})
	return res.data
}

//文章浏览量计数  /pages/activity/index
export async function addArticleView(id : number) {
	const res = await request({
		url: `${API}/wx/article/addTotalView`,
		data: id
	})
	return res.data
}
//电子资源数据
export async function resourcesList(data) {
	const res = await request({
		url: `${API}/wx/resource/getResourcesList`,
		data: data
	})
	return res.data
}




/**
 * 文章详情
 * @param {string} data 文章id
 * @return {any} data
 */
export async function articleDetailApi(data : string) : any {
	try {
		const res = await request({
			url: `${API}/getDetailContent`,
			data: {
				url: data,
			},
		})
		return res.data
	} catch (err) {
		console.log("err", err)
	}
}