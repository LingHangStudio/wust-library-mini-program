import request from "@/api/request"
const API = "https://libsys.wust.edu.cn/meta-local"//汇文接口

const appId = "0Jum0nzpEREB4bwwCyhTUl82XAbEAdEY";
const noncestr = "4b76c6dbf9f041f79ec9d67dc6abc80b";
const timestamp = "1720507878";
const sign = "531dec488ff5ec1983357cb6df8cf884";

// 将对象转换为JSON字符串  
const authObject = { appId, noncestr, timestamp, sign };
const authString = JSON.stringify(authObject);
// 请求头
const headers = {
	'X-Hw-ApiAuth': authString
};
/*
* 借阅状态-总览 GET /meta-local/opac/users/stats
* 放在App.vue里，不验证401,noValidate为true
*/
export async function statsApi() {
	const res = await request({
		url: `${API}/opac/users/stats`,
		header: {
			Cookie: uni.getStorageSync("Cookie")
		},
		noValidate: true
	})
	return res
}


export interface infoParams {
	id : string,
	type : number,
	userIdentifierType ?: string,//这个参数别传，传了拿不到数据
}
export interface infoData {
	// 不全，太多了没有一键导入，有需要自己查看汇文接口文档
	userId : string,
	displayName : string,
}
export interface infoResponse {
	code : number,
	msg : string,
	data : infoData[],
}
//获取个人信息,
export async function getPersonInfo(data : infoParams) : Promise<infoResponse> {
	const res = await request({
		url: `${API}/api/v1/patron/info`,
		method: "GET",
		header: headers,
		data
	})
	return res.data
}


export interface overDueParams {
	id : string,
	type : number,
	beforeDays : number,
}
//定义不动了，自己翻一翻接口文档
export interface allResponse {
	code : number,
	msg : string,
	data : any,
}
//获取即将到期书籍
export async function getOverDueList(data : overDueParams) : Promise<allResponse> {
	const res = await request({
		url: `${API}/api/v1/patron/overdue_soon`,
		method: "GET",
		header: headers,
		data
	})
	return res.data
}


export interface readParams {
	id : string,
	type : number,
}
//获取在借书籍
export async function getReadList(data : readParams) : Promise<allResponse> {
	const res = await request({
		url: `${API}/api/v1/patron/loans`,
		method: "GET",
		header: headers,
		data
	})
	return res.data
}


export interface historyParams {
	id : string,
	type : number,
	currentPage : number,
	pageSize : number,
}

//获取借阅历史书籍
export async function getHistoryList(data : historyParams) : Promise<allResponse> {
	const res = await request({
		url: `${API}/api/v1/patron/loan_histories`,
		method: "GET",
		header: headers,
		data
	})
	return res.data
}


export interface reNewParams {
	barCode : string,
}

//续借书籍
export async function reNewBook(data : reNewParams) : Promise<allResponse> {
	const res = await request({
		url: `${API}/api/v1/patron/renew`,
		method: "GET",
		header: headers,
		data
	})
	return res.data
}