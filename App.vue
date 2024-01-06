<script setup lang="ts">
	import { onLaunch, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
	import routingIntercept from "@/router/permission.js"

	onLaunch(() => {
		routingIntercept()
	})
	// const themeColor = uni.getStorageSync("themeColor") || "#142d88"
</script>

<style lang="scss">
	// 主题色 rgb(20,45,136)
	// #142d88
	// $theme-color: v-bind(themeColor);

	/*每个页面公共css */
	page {
		padding: 0;
		margin: 0;
		background-color: #F5F7F9;
	}
</style>