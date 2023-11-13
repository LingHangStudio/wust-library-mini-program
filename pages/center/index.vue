<template>
	<!-- <view class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg');">
		<view class="header-image" hover-class="back">
			<image class="header-image" src="@/static/face1.png" alt="avatar"></image>
		</view>
		<view class="info">
			{{store.userInfo.displayName}}
		</view>
	</view> -->
	<Avatar></Avatar>
	<Menu></Menu>
	<view class="copyright">
		<!-- #ifdef MP-WEIXIN-->
		<official-account></official-account>
		<!-- #endif -->
		<p>v{{systemInfo.appVersion}}</p>
		<p>公众号：武汉科技大学图书馆</p>
	</view>
</template>

<script setup lang="ts">
	import Menu from "@/pages/center/components/menu.vue"
	import Avatar from "@/pages/center/components/avatar.vue"
	import { ref, Ref } from "vue"
	import { onShow } from "@dcloudio/uni-app"
	import type { systemInfoType } from "@/utils/types/center"
	import { useStore } from "@/store"
	const store = useStore()
	// const user = uni.getStorageSync("userInfo")
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

	onShow(() => {
		store.userInfo = uni.getStorageSync("userInfo") || { displayName: "微信用户" }
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