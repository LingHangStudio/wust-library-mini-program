<template>
	<uni-card margin="10px 8px 5px 8px" spacing="0px" padding="0px">
		<view class="navTitle">借阅服务</view>
		<view class="navCard">
			<view v-for="(item, index) in menu" :key="index" class="navContent" @tap="goTo(item.url, item.type)">
				<uni-icons :type="item.icon" color="#F0E7FE" size="50"></uni-icons>
				<view>{{ item.name }}</view>
			</view>
		</view>
	</uni-card>
</template>

<script setup lang="ts">
	//借阅服务的数据列表
	const menu = [
		{
			id: "",
			name: "我的借阅",
			url: "/page-center/mySubscribe",
			icon: "calendar",
		},
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
	// 跳转页面
	const goTo = (url : string, type : string) => {
		if (type == "tsg") {
			uni.navigateTo({
				url: "/page-service/tsgview?url=" + url,
			})
		}
		else {
			uni.navigateTo({
				url: url,
			})
		}
	}
</script>

<style scoped lang="scss">
	.navTitle {
		padding: 10px;
		font-size: 15px;
		font-weight: 600;
	}

	.navCard {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		.navContent {
			display: flex;
			align-items: center;
			flex-direction: column;
			flex-wrap: wrap;
			width: 60px;
			padding: 10px 8px 10px 5px;
		}

		.navContent:nth-child(1) {
			padding: 10px 8px 10px 15px;
		}

		.navContent:nth-child(5) {
			padding: 10px 8px 10px 15px;
		}
	}
</style>