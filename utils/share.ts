// 分享按钮的全局，每个页面都使用
export default {
	onShareAppMessage() { //发送给朋友
		let pages = getCurrentPages();
		let currentPage = pages[pages.length - 1];
		return {
			title: '科大图书精灵',
			path: currentPage.route
		}
	},
	onShareTimeline() {//分享到朋友圈
		let pages = getCurrentPages();
		let currentPage = pages[pages.length - 1];
		return {
			title: '科大图书精灵',
			path: currentPage.route //后面是路径上要传递的参数
		}
	},
}