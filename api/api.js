import request from "@/api/request.js"


//轮播图
export function banner() {
	return request({
		url: '/banner/list1',
		method: "GET",
	}).then(res => {
		return res.data
	}).catch(err => {
		console.log(err);
	})
}

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
export function getArticleContent(data) {
	console.log("id", data);
	return request({
		url: '/article/index',
		method: "GET",
		data: data
	}).then(res => {
		return res.data
	}).catch(err => {
		console.log(err);
	})
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