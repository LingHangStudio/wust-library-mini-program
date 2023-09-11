import {
	getAuthorization
} from '@/router/auth.ts'

// 白名单
const whiteList = [
	'/',
	"/pages/home/index",
	'/page-center/login',
	"/page-home/hello"
]

export default async function() {
	const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
	// 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
	list.forEach(item => {
		uni.addInterceptor(item, {
			invoke(e) {
				// 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
				const url = e.url.split('?')[0]
				console.log('url', url)
				// 判断当前窗口是白名单，如果是则不重定向路由
				let pass
				if (whiteList) {
					pass = whiteList.some((item) => {
						if (typeof(item) === 'object' && item.pattern) {
							return item.pattern.test(url)
						}
						return url === item
					})
				}

				// 不是白名单 或者 没有token
				if (!pass && !getAuthorization()) {
					uni.showToast({
						title: '请先登录',
						icon: 'error'
					})
					uni.navigateTo({
						url: "/page-center/login"
					})
					return false
				}
				return e
			},
			fail(err) {
				console.log(err)
			}
		})
	})
}