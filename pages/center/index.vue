<template>
	<uni-card margin="10px 0px 5px 0px" padding="0px" spacing="0px">
		<!-- 当前没有登录功能 -->
		<view v-if="user" class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg');">
			<img class="header-image" :src="WechatInfo.avatarUrl" alt="avatar">
			<view v-if="user.username" class="info">
				{{user.username}}
			</view>
			<view v-else class="">
				{{WechatInfo.nickName}}
			</view>
			<!-- <view class="background">
				<img src="" alt="">
			</view> -->
		</view>
		<view v-else class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg')">
			<img class="header-image" :src="WechatInfo.avatarUrl" alt="avatar">
			<view  class="info">
				微信用户
			</view>
			<!-- <view  class="info">
				{{WechatInfo.nickName}}
			</view> -->
		</view>
	</uni-card>

	<uni-card title="">
		<view @click="goTo(item)" class="item" v-for="(item,index) in menu" :key="index">
			<!-- <p class="line"></p> -->
			<uni-icons :type="item.icon" size="40"></uni-icons>
			<view class="font">
				{{item.name}}
			</view>
			<view style="position:absolute;right:10px;" v-if="item.complete" class="">
				<uni-icons type="forward"></uni-icons>
			</view>
		</view>
		<view class="item">
			<uni-icons type="eye" size="40"></uni-icons>
			<view class="font">
				<!-- #ifdef MP-WEIXIN-->
				<button class="button" open-type="share">
					分享小程序
				</button>

				<!-- #endif -->
				<!-- #ifdef APP -->
				<button class="button" @tap="share">
					<text class="">分享应用</text>
				</button>
				<!-- #endif -->
			</view>
			<!-- <view style="position:absolute;right:10px;" class="">
				<uni-icons type="forward"></uni-icons>
			</view> -->
		</view>
		<!-- #ifdef MP-WEIXIN-->
		<view class="item">
			<uni-icons type="eye" size="40"></uni-icons>
			<view class="font">
				<button class="button" open-type="feedback">反馈意见</button>
			</view>
			<!-- <view style="position:absolute;right:10px;" class="">
				<uni-icons type="forward"></uni-icons>
			</view> -->
		</view>
		<!-- #endif -->
	</uni-card>


	<view class="copyright">
		<p>Copyright © 2023</p>
		<p>Version v1.0.0 test</p>
	</view>
</template>

<script setup lang="ts">
	const user = uni.getStorageSync("user")
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
		// 	url: "/page-service/foreign-webview",
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
			complete: "1"
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

	const share = () => {
		uni.share({
			provider: 'weixin',
			type: 0,//图文
			scene: 'WXSceneSession',//provider 为 weixin 时必选 WXSceneSession分享到聊天界面，WXSceneTimeline分享到朋友圈，WXSceneFavorite分享到微信收藏
			title: 'littlespring网页',
			summary: '',//分享内容的摘要
			href: 'http://www.lib.wust.edu.cn/',//跳转链接，type 为 0 时必选
			// imageUrl: 'http://116.62.61.65:8080/static/logo.png',//图片地址，type 为 0、2、5 时必选
			success(res) {
				//成功返回的参数
				console.log(res);
				uni.showToast({
					title: "分享成功",
					duration: 2000
				})
			},
			fail(err) {
				//失败返回的参数
				console.log(err);
				uni.showToast({
					title: "分享失败",
					duration: 2000
				})
			}
		})
	}

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
			width: 5rem;
			height: 5rem;
			// border: 1px solid green;
			margin: 5px auto;
		}



		.info {
			color: white;
			font-size: 2rem;
			margin: 0 auto;
			padding: 3px 0;
		}

		// .background {}
	}

	.item {
		font-size: 1.2rem;
		line-height: 1.2rem;
		display: flex;
		margin: .8rem 0;

		.line {
			border: 1px solid green;
			width: 3px;
			height: 1.2rem;
			background-color: forestgreen;
			margin: 0 3px 0 1px;
		}

		.font {
			// border: 1px solid red;
		}

	}

	.cu-btn {
		display: inline-block;
		width: 50vw;
		margin: 0 auto;

	}


	.copyright {
		text-align: center
	}



	.button {
		width: 100%;
		background: white;
		border: none;
		text-align: left;
		padding: 0px;
		margin: 0px;
		line-height: 1;
		border-radius: 0;
	}

	.button::after {
		border: none;
		border-radius: 0;
	}

	.button_title {
		// font-size: 1rem;
	}
</style>