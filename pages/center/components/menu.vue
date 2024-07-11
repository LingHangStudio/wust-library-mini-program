<template>
	<uni-card title="">
		<template v-for="item in menu" :key="item.id">
			<button v-if="judgeAuth(item.meta)" class="item" @tap="goTo(item)">
				<view class="font">
					<uni-icons :type="item.icon" size="24"></uni-icons>
					<view>
						{{ item.name }}
					</view>
				</view>
				<view>
					<uni-tag v-if="item.meta.fineNum" type="error" size="small" circle :text="fineNum"></uni-tag>
					<uni-icons type="forward"></uni-icons>
				</view>
			</button>
		</template>
		<!-- #ifdef MP-WEIXIN-->
		<button class="item" open-type="share">
			<view class="font">
				<uni-icons type="compose" size="24"></uni-icons>
				<view> 分享小程序 </view>
			</view>
			<view>
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
			url: "/pages/login/index?e=center",
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
		{
			id: "",
			name: "关于我们",
			url: "/page-center/aboutMe",
			icon: "info",
			meta: {
				auth: "no",
			},
		},
	]

	// 通过权限判断显示和隐藏
	const judgeAuth = (meta : any) => {
		return (
			meta.auth === "no" || (meta.auth === "user" && uni.getStorageSync("loginState")) || (meta.auth === "visitor" && !uni.getStorageSync("loginState"))
		)
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