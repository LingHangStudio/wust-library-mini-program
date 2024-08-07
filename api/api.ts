import request from "@/api/request"
// 以前的api


//文章列表
export function getArticleList(data) {
	return request({
		url: '/article/list',
		method: "GET",
		data: data
	}).then(res => {
		return res.data
	}).catch(err => {
		console.log(err);
	})
}

//文章检索:通过标题进行的检索
export function searchArticle(data) {
	return request({ 
		url: '/article/search',
		method: "GET",
		data: data
	}).then(res => {
		return res.data
	}).catch(err => {
		console.log(err);
	})
}


//获取文章详情
export async function getArticleContent(data) {
	try {
		const res = await request({
			url: '/article/index',
			method: "GET",
			data: data
		});
		return res.data;
	} catch (err) {
		console.log(err);
	}
}

// -------------- 文章推荐

//学科分类
export function getDisciplineCate() {
	return request({
		url: '/recommend/discipline',
		method: "GET",
	}).then(res => {
		return res.data
	}).catch(err => {
		console.log(err);
	})
}

//登录
export function login(data) {
	return request({
		url: '/users/login',
		method: "POST",
		data: data,
		// header: {
		// 	"content-type": "application/x-www-form-urlencoded"
		// }
	}).then(res => {
		return res.data
	}).catch(err => {
		console.log(err);
	})
}

// 咨询服务
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