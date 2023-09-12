<script setup lang="ts">
	import {
		onShow,
		onHide,
		onLaunch
	} from "@dcloudio/uni-app"
	import { getAuthorization } from "@/router/auth"
	import routingIntercept from "@/router/permission.js"
	import { useStore } from "@/store"
	const store = useStore()
	onLaunch(() => {
		routingIntercept()
		// 登录逻辑
		if (getAuthorization()) {
			store.setloginState(true)
		}
		console.log('App Launch')
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