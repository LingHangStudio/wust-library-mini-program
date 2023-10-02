<template>
	<uni-card margin="0px 0px 5px 0px" border="0" padding="0px" spacing="0px">
		<view v-if="user" class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg');">
			<view class="">
				<img class="header-image" :src="WechatInfo.avatarUrl" alt="avatar">
			</view>
			<view v-if="user.username" class="info">
				{{user.username}}
			</view>
			<view v-else class="info">
				{{WechatInfo.nickName}}
			</view>
		</view>
		<view v-else class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg')">
			<view class="header-image" hover-class="back">
				<image class="header-image" src="@/static/face1.png" alt="avatar"></image>
			</view>
			<view class="info">
				微信用户
			</view>
			<!-- <view  class="info">
				{{WechatInfo.nickName}}
			</view> -->
		</view>
	</uni-card>

	<uni-card title="">
		<template v-for="item in menu" :key="item.id">
			<button v-if="judgeAuth(item.meta)" @tap="goTo(item)" class="item">
				<view class="font">
					<uni-icons :type="item.icon" size="30"></uni-icons>
					<view class="">
						{{item.name}}
					</view>
				</view>
				<view class="">
					<uni-tag type="error" size="small" circle :text="item.meta.fineNum"></uni-tag>
					<uni-icons type="forward"></uni-icons>
				</view>
			</button>
		</template>
		<!-- #ifdef MP-WEIXIN-->
		<button class="item" open-type="share">
			<view class="font">
				<uni-icons type="compose" size="30"></uni-icons>
				<view class="">
					分享小程序
				</view>
			</view>
			<view class="">
				<uni-icons type="forward"></uni-icons>
			</view>
		</button>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN-->
		<button class="item" open-type="feedback">
			<view class="font">
				<uni-icons type="chatboxes" size="30"></uni-icons>
				<view class="">
					反馈意见
				</view>
			</view>
			<view class="">
				<uni-icons type="forward"></uni-icons>
			</view>
		</button>
		<!-- #endif -->
	</uni-card>

	<view class="copyright">
		<p>Copyright © 2023</p>
		<p>Version v{{systemInfo.appVersion}}</p>
	</view>
</template>

<script setup lang="ts">
	import { ref, Ref } from "vue"
	import { onShow } from "@dcloudio/uni-app"
	import type { systemInfoType } from "@/utils/types/center"
	import { useStore } from "@/store"
	const store = useStore()
	const user = uni.getStorageSync("user")
	const systemInfo : Ref<systemInfoType> = ref({})
	const WechatInfo = uni.getStorageSync("WechatInfo")
	const menu = [
		{
			id: "login",
			name: "绑定用户",
			url: "/page-center/login",
			icon: "locked",
			meta: {
				auth: "visitor",// 必须是未登录状态
			}
		}, {
			id: "me",
			name: "我的",
			url: "/page-center/userInfo",
			icon: "locked",
			meta: {
				auth: "user",
				fineNum: uni.getStorageSync("fineSum")
			}
		},
		{
			id: "subscribe",
			name: "我的借阅",
			url: "/page-center/mySubscribe",
			icon: "eye",
			meta: {
				auth: "user"
			}
		},
		// {
		// 	id: "",
		// 	name: "我的预约",
		// 	url: "",
		// 	inner: false,
		// 	icon: "tune", complete: ""
		// }, 
		// {
		// 	id: "",
		// 	name: "我的收藏",
		// 	url: "",
		// 	inner: false,
		// 	icon: "folder-add", complete: ""
		// }, 
		{
			id: "",
			name: "关于我们",
			url: "/page-center/aboutMe",
			icon: "info",
			meta: {
				auth: "no"
			}
		},
	]

	const judgeAuth = (meta) => {
		return meta.auth === 'no'
			|| (meta.auth === 'user' && uni.getStorageSync('loginState'))
			|| (meta.auth === 'visitor' && !uni.getStorageSync('loginState'))
	}

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

	const goTo = (item) => {
		uni.navigateTo({
			url: item.url
		})
	}
	onShow(() => {
		let fineSum = uni.getStorageSync("fineSum")
		if (fineSum !== 0) {
			uni.setTabBarBadge({
				index: 3,
				text: fineSum,
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

	.item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		background: white;
		border: none;
		text-align: left;
		padding: 0px;
		margin: 2px 0px;
		border-radius: 0;
		outline: none;
		color: #000;
		font-size: 1.2rem;
		height: 2rem;
		line-height: 2rem;

		.font {
			display: flex;
		}
	}

	.copyright {
		text-align: center
	}
</style>