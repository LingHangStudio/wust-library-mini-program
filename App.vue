<script setup lang="ts">
	import {
		onShow,
		onHide,
		onLaunch
	} from "@dcloudio/uni-app"
	import routingIntercept from "@/router/permission.js"
	onLaunch(() => {
		routingIntercept()
		// console.log("加载字体");
		// uni.loadFontFace({
		// 	family: 'luxun',
		// 	source: 'url("./static/luxun.otf")',
		// 	success() {
		// 		console.log("success");
		// 	}, fail() {
		// 		console.log("err");
		// 	},
		// 	complete() {
		// 		console.log("over");
		// 	}
		// })
		// 登录逻辑
		console.log('App Launch')
		// if (uni.getStorageSync("WechatToken")) {
		// 	console.log("微信已授权");
		// } else {
		// 	uni.navigateTo({
		// 		url: "/page-home/hello"
		// 	})
		// }

	})
	onShow(() => {
		console.log('App Show')
	})
	onHide(() => {
		console.log('App Hide')
	})
</script>

<style>
	/*每个页面公共css */
</style>