import {
	getAuthorization
} from '@/router/auth.ts'

// 白名单
const whiteList = [
	'/',
	'/pages/activity/index',
	'/pages/resources/index',
	'/pages/center/index',
	"/pages/home/index",
	'/page-home/consult',
	'/page-home/search',
	'/page-home/search-list',
	'/page-home/detail',
	// '/page-home/tsgview',
	'/page-service/tsgview',
	'/page-service/inner',
	'/page-center/login',
	'/page-center/aboutMe',
	"/page-home/hello",
	'/page-service/test'
]

export default async function() {
	const list = ['navigateTo', 'redirectTo', 'switchTab']
	// 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
	list.forEach(item => {
		uni.addInterceptor(item, {
			invoke(e) {
				// 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
				const url = e.url.split('?')[0]
				if (getAuthorization() || (!getAuthorization() && whiteList.includes(url))) {
					return e
				} else {
					uni.showToast({
						title: '请先登录',
						icon: 'error'
					})
					uni.navigateTo({
						url: "/page-center/login"
					})
					return false
				}
			},
			fail(err) {
				console.log(err)
			}
		})
	})
}