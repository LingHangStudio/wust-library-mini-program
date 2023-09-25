<script setup lang="ts">
	import { onLaunch } from "@dcloudio/uni-app"
	import routingIntercept from "@/router/permission.js"

	onLaunch(() => {
		routingIntercept()
		console.log('App Launch')
	})
</script>

<style>
	/*每个页面公共css */
</style>