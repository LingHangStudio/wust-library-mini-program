<template>
	<uni-card margin="10px 0px 5px 0px" padding="0px" spacing="0px">
		<!-- 当前没有登录功能 -->
		<view v-if="user" class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg');">
			<img class="header-image" :src="WechatInfo.avatarUrl" alt="avatar">
			<view v-if="user.username" class="info">
				{{user.username}}
			</view>
			<view v-else class="info">
				{{WechatInfo.nickName}}
			</view>
		</view>
		<view v-else class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg')">
			<image class="header-image" src="@/static/face1.png" alt="avatar"></image>
			<view class="info">
				微信用户
			</view>
			<!-- <view  class="info">
				{{WechatInfo.nickName}}
			</view> -->
		</view>
	</uni-card>

	<uni-card title="">
		<button @click="goTo(item)" class="item" v-for="(item,index) in menu" :key="index">
			<view class="font">
				<uni-icons :type="item.icon" size="30"></uni-icons>
				<view class="">
					{{item.name}}
				</view>
			</view>
			<view class="">
				<uni-icons type="forward"></uni-icons>
			</view>
		</button>
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
		<!-- #ifdef APP -->
		<!-- <button class="button" @tap="share">
			<text class="">分享应用</text>
		</button> -->
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
	import { ref } from "vue"
	const user = uni.getStorageSync("user")
	const systemInfo = ref({})
	const WechatInfo = uni.getStorageSync("WechatInfo")
	const menu = [
		// {
		// 	id: "",
		// 	name: "绑定用户",
		// 	url: "/page-center/login",
		// 	icon: "locked",
		// 	inner: true,
		// 	complete: "1"
		// }, 
		// {
		// 	id: "",
		// 	name: "我的借阅",
		// 	url: "",
		// 	inner: false,
		// 	icon: "eye", complete: "1"
		// }, 
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
			inner: true,
		},
		// {
		// 	id: "",
		// 	name: "反馈意见",
		// 	url: "/page-center/feedback",
		// 	icon: "staff",
		// 	inner: true,
		// 	complete: "1",
		// }
	]

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
		if (item.inner) {
			uni.navigateTo({
				url: item.url
			})
		} else {
			uni.navigateTo({
				url: item.url
			})
		}

	}
</script>

<style lang="scss">
	.user {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// height: auto;
		// border: 1px solid green;


		.header-image {
			border-radius: 50%;
			display: block;
			width: 4rem;
			height: 4rem;
			// border: 1px solid green;
			margin: 5px auto;
		}



		.info {
			color: white;
			font-size: 1.5rem;
			margin: 0 auto;
			padding: 10px 0;
		}

		// .background {}
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

		// border: 1px solid red;
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