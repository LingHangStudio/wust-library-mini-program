<script setup lang="ts">
	import { ref } from "vue"
	import { onLaunch, onShareAppMessage, onShareTimeline, onThemeChange } from "@dcloudio/uni-app"
	import routingIntercept from "@/router/permission.js"
	var plugin = requirePlugin("chatbot");
	plugin.init({
		appid: "", //微信对话开放平台小程序插件appid
		openid: "", // 小程序用户的openid，必填项
		userHeader: "", // 用户头像,不传会弹出登录框
		userName: "", // 用户昵称,不传会弹出登录框
		anonymous: false, // 是否允许匿名用户登录，版本1.2.9后生效, 默认为false，设为true时，未传递userName、userHeader两个字段时将弹出登录框
		success: () => { },//非必填
		fail: (error) => { },//非必填
	});
	onLaunch(() => {
		routingIntercept()
	})

	const color = ref("#000000")
	const background = ref("#F5F7F9")
	// 深色模式未完善
	onThemeChange((e) => {
		if (e?.theme === "dark") {
			color.value = "#ffffff"
			background.value = "#000000"
		} else {
			color.value = "#000000"
			background.value = "#F5F7F9"
		}
		// 重启，保证颜色变化
		uni.reLaunch({
			url: '/pages/home/index'
		});
	})

	// const themeColor = uni.getStorageSync("themeColor") || "#142d88"
</script>

<style lang="scss">
	// 主题色 rgb(20,45,136)
	// #142d88
	// $theme-color: v-bind(themeColor);

	/*每个页面公共css */
	page {
		color: #000;
		// background-color: v-bind(background);
		padding: 0;
		margin: 0;
		background-color: #F5F7F9;
	}

	@media (prefers-color-scheme: dark) {
		page {
			color: #fff;
			background-color: #000;
			padding: 0;
			margin: 0;
		}
	}
</style>