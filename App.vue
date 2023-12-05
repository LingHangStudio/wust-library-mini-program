<script setup lang="ts">
	import { onLaunch, onShareAppMessage } from "@dcloudio/uni-app"
	import routingIntercept from "@/router/permission.js"


	// #ifdef MP-WEIXIN
	onShareAppMessage((res) => {
		let pages = getCurrentPages(); //获取当前页面栈的信息
		let currentPage = pages[pages.length - 1]; //获取到当前页面栈中最后一个页面的索引
		// if (res.from === 'button') {// 来自页面内分享按钮
		// 	console.log(res.target)
		// }
		return {
			title: '科大图书精灵',
			path: currentPage.route //后面是路径上要传递的参数
		}
	})

	uni.showShareMenu({
		withShareTicket: true,
		//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
		menus: ["shareAppMessage", "shareTimeline"]
	})
	// #endif



	onLaunch(() => {
		routingIntercept()
		console.log('App Launch')
	})
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		padding: 0;
		margin: 0;
		background-color: #F5F7F9;
	}
</style>