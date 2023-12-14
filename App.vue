<script setup lang="ts">
	import { onLaunch, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
	import routingIntercept from "@/router/permission.js"

	onLaunch(() => {
		routingIntercept()
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