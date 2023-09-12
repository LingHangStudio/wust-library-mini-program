import {
	getAuthorization
} from '@/router/auth.ts'

// 白名单
const whiteList = [
	'/',
	"/pages/home/index",
	'/page-center/login',
	"/page-home/hello",
]

export default async function() {
	const list = ['navigateTo', 'redirectTo', 'switchTab']
	// 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
	list.forEach(item => {
		uni.addInterceptor(item, {
			invoke(e) {
				// 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
				const url = e.url.split('?')[0]
				console.log('url', url)
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
				// let pass = whiteList.some((item) => url === item)

				// 不是白名单 或者 没有token
				// if (!pass && !getAuthorization()) {
				// 	uni.showToast({
				// 		title: '请先登录',
				// 		icon: 'error'
				// 	})
				// 	uni.navigateTo({
				// 		url: "/page-center/login"
				// 	})
				// 	return false
				// }

			},
			fail(err) {
				console.log(err)
			}
		})
	})
}