<template>
	<uni-card margin="10px 0px 5px 0px" padding="0px" spacing="0px">
		<view v-if="user" class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg');">
			<img class="header-image" :src="wechatUser.avatarUrl" alt="">
			<view v-if="user.username" class="info">
				{{user.username}}
			</view>
			<view v-else class="">
				{{wechatUser.nickName}}
			</view>
			<!-- <view class="background">
				<img src="" alt="">
			</view> -->
		</view>
		<view v-else class="">

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
	</uni-card>
	<view class="copyright">
		<p>Copyright © 2023</p>
		<p>Version v1.0.0 test</p>
	</view>
</template>

<script setup lang="ts">
	const user = uni.getStorageSync("user")
	const wechatUser = uni.getStorageSync("WechatUser")
	const menu = [
		{
			id: "",
			name: "绑定用户",
			url: "/page-center/login",
			icon: "locked",
			inner: true,
			complete: "1"
		}, {
			id: "",
			name: "我的借阅",
			url: "/page-service/foreign-webview",
			inner: false,
			icon: "eye", complete: "1"
		}, {
			id: "",
			name: "我的预约",
			url: "",
			inner: false,
			icon: "tune", complete: ""
		}, {
			id: "",
			name: "我的收藏",
			url: "",
			inner: false,
			icon: "folder-add", complete: ""
		}, {
			id: "",
			name: "关于我们",
			url: "/page-center/aboutMe",
			icon: "info",
			inner: true,
			complete: "1"
		}, {
			id: "",
			name: "反馈意见",
			url: "/page-center/feedback",
			icon: "staff",
			inner: true,
			complete: "1",
		}, {
			id: "",
			name: "test",
			url: "/page-service/test",
			icon: "",
			inner: true,
			complete: "1"
		},
	]
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

	.copyright {
		text-align: center
	}
</style>