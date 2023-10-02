<script setup lang="ts">
	import { onLaunch } from "@dcloudio/uni-app"
	import routingIntercept from "@/router/permission.js"

	onLaunch(() => {
		routingIntercept()
		console.log('App Launch')
	})
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		background-color: #F5F7F9;
	}
</style>