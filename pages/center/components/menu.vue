<template>
	<uni-card title="">
		<template v-for="item in menu" :key="item.id">
			<button v-if="judgeAuth(item.meta)" class="item" @tap="goTo(item)">
				<view class="font">
					<uni-icons :type="item.icon" size="24"></uni-icons>
					<view class="">
						{{ item.name }}
					</view>
				</view>
				<view class="">
					<uni-tag v-if="item.meta.fineNum" type="error" size="small" circle :text="fineNum"></uni-tag>
					<uni-icons type="forward"></uni-icons>
				</view>
			</button>
		</template>
		<!-- #ifdef MP-WEIXIN-->
		<button class="item" open-type="share">
			<view class="font">
				<uni-icons type="compose" size="24"></uni-icons>
				<view class=""> 分享小程序 </view>
			</view>
			<view class="">
				<uni-icons type="forward"></uni-icons>
			</view>
		</button>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN-->
		<button class="item" open-type="feedback">
			<view class="font">
				<uni-icons type="chatboxes" size="24"></uni-icons>
				<view class=""> 反馈意见 </view>
			</view>
			<view class="">
				<uni-icons type="forward"></uni-icons>
			</view>
		</button>
		<!-- #endif -->
	</uni-card>

	<button class="self-button" @tap="toComment" type="default">体验评价</button>
</template>

<script setup lang="ts">
	import { onShow } from "@dcloudio/uni-app"
	import { ref, Ref } from "vue"
	import type { centerMenuType } from "../utils/types.d"
	const fineNum : Ref<string> = ref("0")
	const menu : Readonly<centerMenuType[]> = [
		{
			id: "login",
			name: "绑定用户",
			url: "/page-center/login?e=center",
			icon: "locked",
			meta: {
				auth: "visitor", // 必须是未登录状态
			},
		},
		{
			id: "me",
			name: "我的",
			url: "/page-center/userInfo",
			icon: "locked",
			meta: {
				auth: "user",
				fineNum: true, //显示超期图标
			},
		},
		{
			id: "subscribe",
			name: "我的借阅",
			url: "/page-center/mySubscribe",
			icon: "eye",
			meta: {
				auth: "user",
			},
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
				auth: "no",
			},
		},
		// {
		// 	id: "",
		// 	name: "设置",
		// 	url: "/page-center/set",
		// 	icon: "settings",
		// 	meta: {
		// 		auth: "no",
		// 	},
		// },
	]

	// 通过权限判断显示和隐藏
	const judgeAuth = (meta : any) => {
		return (
			meta.auth === "no" || (meta.auth === "user" && uni.getStorageSync("loginState")) || (meta.auth === "visitor" && !uni.getStorageSync("loginState"))
		)
		// || (meta.auth === 'user' && store.loginState)
		// || (meta.auth === 'visitor' && !store.loginState)
	}


	const toComment = () => {
		let plugin = requirePlugin("wxacommentplugin");
		plugin.openComment({
			success: (res) => {
				console.log('plugin.openComment success', res)
			},
			fail: (res) => {
				uni.showToast({
					icon: "error",
					title: "跳转失败",
					duration: 2000
				})
				console.log('plugin.openComment fail', res)
			}
		})
	}

	onShow(() => fineNum.value = uni.getStorageSync("fineSum"))

	const goTo = (item : any) => {
		uni.navigateTo({
			url: item.url,
		})
	}
</script>

<style scoped lang="scss">
	.item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		background: white;
		align-items: center;
		text-align: left;
		padding: 0px;
		margin: 10px 0px;
		// border-bottom: 1px solid #e6e6e6;
		border-bottom: 1px solid #ccc;
		border-radius: 0;
		outline: none;
		color: #000000;
		background-color: transparent;
		font-size: 1.2rem;
		height: 2.3rem;
		line-height: 2.3rem;

		.font {
			display: flex;
			// font-size: 1.2rem;
			height: 2.3rem;
			line-height: 2.3rem;
			align-items: center;
		}
	}

	// 消除按钮的边框
	.item::after {
		display: none;
	}

	// .item:last-child {
	// 	border: 0;
	// }

	.self-button {
		width: 50%;
	}

	// @media (prefers-color-scheme: dark) {
	// 	.item {
	// 		 color: #fff;
	// 		 background-color: #000;
	// 	}
	// }
</style>