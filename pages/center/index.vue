<template>
	<!-- <uni-card margin="0px 0px 5px 0px" :border="false" padding="0px" spacing="0px"> -->
	<view class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg');">
		<!-- <view class="user"> -->
		<!-- <start></start> -->
		<view class="header-image" hover-class="back">
			<!-- <img class="header-image" :src="WechatInfo.avatarUrl" alt="avatar"> -->
			<image class="header-image" src="@/static/face1.png" alt="avatar"></image>
		</view>
		<view class="info">
			{{store.userInfo.displayName}}
		</view>
		<!-- <view v-else class="info">
			微信用户
		</view> -->
	</view>
	<!-- <view class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg')">
		<view class="header-image" hover-class="back">
			<image class="header-image" src="@/static/face1.png" alt="avatar"></image>
		</view>
		<view class="info">
			微信用户
		</view>
		<view  class="info">
				{{WechatInfo.nickName}}
			</view>
	</view> -->
	<!-- </uni-card> -->

	<Menu></Menu>
	<!-- <button @tap="goTo({url:'/page-service/test'})">测试</button> -->

	<view class="copyright">
		<official-account></official-account>
		<!-- <p>Copyright © 2023</p> -->
		<p>v{{systemInfo.appVersion}}</p>
		<p>公众号：武汉科技大学图书馆</p>
	</view>
</template>

<script setup lang="ts">
	import start from "@/pages/center/components/start.vue"
	import Menu from "@/pages/center/components/menu.vue"
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
	.user {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.header-image {
			border-radius: 50%;
			display: block;
			width: 4rem;
			height: 4rem;
			margin: 5px auto;

			position: relative;
			transform-style: preserve-3d;
			transition: 1s;
		}

		.info {
			color: white;
			font-size: 1.5rem;
			margin: 0 auto;
			padding: 10px 0;
		}
	}

	.back {
		transform: rotateY(180deg);
	}

	.copyright {
		// text-align: center
		position: absolute;
		width: 750rpx;
		text-align: center;
		color: #666777;
		bottom: 20px;
	}
</style>