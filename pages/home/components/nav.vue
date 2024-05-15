<template>
	<uni-card margin="20px 1px 20px 1px" padding="1px" spacing="1px">
		<view class="homeMenu">
			<!--左边虚化-->
			<view class="hide-content-box hide-content-box-left"></view>
			<!--右边虚化-->
			<view class="hide-content-box hide-content-box-right"></view>
			<scroll-view scroll-x="true">
				<view v-for="(item, index) in menu" :key="index" class="item" :class="'nav-li bg-index' + (index + 1)"
					@tap="goTo(item.url, item.type)">
					<view class="icon">
						<uni-icons :type="item.icon" color="#F0E7FE" size="50"></uni-icons>
					</view>
					<view class="text">{{ item.name }}</view>
				</view>
			</scroll-view>
		</view>
	</uni-card>
	<!-- 	提示信息弹窗
	<uni-popup ref="message">
		<uni-popup-message type="warn" message="如果没有数据,请检查是否登录" :duration="2000"></uni-popup-message>
	</uni-popup> -->
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	// const message = ref(null);
	const menu = [
		{
			id: "",
			name: "我的借阅",
			url: "/page-center/mySubscribe",
			icon: "calendar",
		},
		{
			id: "",
			name: "智能答疑",
			url: "/page-home/consult",
			icon: "chatboxes",
			type: "inner",
		},
		// {
		// 	id: "",
		// 	name: "文献资源",
		// 	url: "https://tsg.wust.edu.cn/info/1691/4471.htm",
		// 	icon: "list",
		// 	type: "tsg",
		// },
		{
			id: "",
			name: "借阅服务",
			url: "https://tsg.wust.edu.cn/jyfw/gzjsysy.htm",
			icon: "star",
			type: "tsg",
		},
		{
			id: "",
			name: "科研服务",
			url: "https://tsg.wust.edu.cn/kyfw/xkfw.htm",
			icon: "paperplane",
			type: "tsg",
		},
		{
			id: "",
			name: "互动交流",
			url: "https://tsg.wust.edu.cn/hdjl/ygzydt.htm",
			icon: "chat",
			type: "tsg",
		},
		{
			id: "",
			name: "读者指南",
			url: "https://tsg.wust.edu.cn/dzzn/gzzd.htm",
			icon: "map",
			type: "tsg",
		},
		{
			id: "",
			name: "关于",
			url: "https://tsg.wust.edu.cn/gy.htm",
			icon: "flag",
			type: "tsg",
		},
	]
	// const messageToggle = () => {
	// 	message.value.open()
	// 	setTimeout(() => {
	// 		message.value.close();
	// 	}, 3000); // 3秒后关闭消息
	// }
	const goTo = (url : string, type : string) => {
		// if (url == "/page-center/mySubscribe") {
		// 	messageToggle();
		// }
		if (type == "tsg") {
			uni.navigateTo({
				url: "/page-service/tsgview?url=" + url,
			})

		} else {
			uni.navigateTo({
				url: url,
			})
		}
	}
</script>

<style scoped lang="scss">
	.homeMenu {
		flex-wrap: nowrap;
		overflow: hidden;
		white-space: nowrap;

		.item {
			display: inline-block;
			width: 5rem;
			height: 4rem;

			.text {
				font-size: 1.2rem;
				text-align: center;
				padding: auto;
			}

			.icon {
				padding: 0 auto;
				text-align: center;
				line-height: 60rpx;

				.uni-icons {}
			}
		}
	}

	.nav-li {
		padding: 40rpx 30rpx;
		width: 100%;
		background-image: url(https://s1.ax1x.com/2020/06/27/NyU04x.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-content {
		width: 100%;
		padding: 15rpx;
		display: inline-block;
		overflow-wrap: break-word;
		white-space: normal;
	}

	.nav-btn {
		width: 200rpx;
		height: 100rpx;
		margin: 8rpx auto;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
	}

	.bg-index1 {
		background-color: #19cf8a;
		color: #fff;
	}

	.bg-index2 {
		background-color: #954ff6;
		color: #fff;
	}

	.bg-index3 {
		background-color: #5177ee;
		color: #fff;
	}

	.bg-index4 {
		background-color: #f49a02;
		color: #fff;
	}

	.bg-index5 {
		background-color: #ff4f94;
		color: #fff;
	}

	.bg-index6 {
		background-color: #7fd02b;
		color: #fff;
	}

	.bg-index7 {
		background-color: #19cf8a;
		color: #fff;
	}

	.bg-index8 {
		background-color: #954ff6;
		color: #fff;
	}

	/*scroll-view外层*/
	.skill-sequence-panel-content-wrapper {
		margin: 30px 0 0 0;
		position: relative;
		white-space: nowrap;
		padding: 10rpx 0 10rpx 10rpx;
	}

	/*左右渐变遮罩*/
	.hide-content-box {
		position: absolute;
		top: 0;
		height: 100%;
		width: 10px;
		z-index: 2;
	}

	.hide-content-box-left {
		left: 0;
		background-image: linear-gradient(to left, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.hide-content-box-right {
		right: 0;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.kite-classify-scroll {
		width: 100%;
		height: 200rpx;
		overflow: hidden;
		white-space: nowrap;
		border: 1px solid red;
	}

	.kite-classify-cell {
		border: 1px solid green;
		display: inline-block;
		width: 266rpx;
		height: 200rpx;
		margin-right: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(26, 26, 26, 0.2);
	}
</style>