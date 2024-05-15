<template>
	<Avatar></Avatar>
	<Menu></Menu>
	<view class="copyright">
		<!-- #ifdef MP-WEIXIN-->
		<official-account></official-account>
		<!-- #endif -->
		<!-- 能获取小程序的版本，就用小程序版本；
		不能，就用manifest的版本 -->
		<p v-if="systemInfo.version">v{{systemInfo.version}}</p>
		<p v-else>v{{systemInfo.appVersion}}</p>
		<p>公众号：武汉科技大学图书馆</p>
	</view>
</template>

<script setup lang="ts">
	import Menu from "@/pages/center/components/menu.vue"
	import Avatar from "@/pages/center/components/avatar.vue"
	import { ref, Ref } from "vue"
	import { onShow } from "@dcloudio/uni-app"
	import type { systemInfoType } from "@/utils/types/center"
	// #ifndef APP-PLUS
	import { useStore } from "@/store"
	const store = useStore()
	// #endif
	const systemInfo : Ref<systemInfoType> = ref({})

	uni.getSystemInfo({
		success: function (res) {
			systemInfo.value = {
				"appName": res.appName,
				"appVersion": res.appVersion,
				"osName": res.osName,
				"uniPlatform": res.uniPlatform,
				"width": res.screenWidth,
				"height": res.screenHeight
			}
		},
	})

	// #ifdef MP-WEIXIN
	const accountInfo = uni.getAccountInfoSync();
	systemInfo.value = { ...systemInfo.value, ...accountInfo.miniProgram }
	console.log("ver", systemInfo.value)
	// #endif

	onShow(() => {
		// #ifndef APP-PLUS
		store.userInfo = uni.getStorageSync("userInfo") || { displayName: "微信用户" }
		// #endif
		let fineSum = uni.getStorageSync("fineSum")
		if (fineSum && fineSum !== '0') {
			uni.setTabBarBadge({
				index: 3,
				text: fineSum,
				fail: (result : any) => {
					console.log(result)
				}
			})
		} else {
			uni.removeTabBarBadge({
				index: 3,
				fail: (result : any) => {
					console.log(result)
				}
			})
		}
	})
</script>

<style lang="scss">
	.copyright {
		position: absolute;
		width: 750rpx;
		text-align: center;
		color: #666777;
		bottom: 20px;
	}
</style>