<template>
	<uni-card margin="10px 8px 5px 8px" spacing="0px" padding="0px">
		<view class="navTitle">借阅服务</view>
		<view class="navCard">
			<view v-for="(item, index) in menu" :key="index" class="navContent" @tap="goTo(item.url, item.type)">
				<uni-icons :type="item.icon" color="#E7F1FE" size="50"></uni-icons>
				<view>{{ item.name }}</view>
			</view>
		</view>
	</uni-card>
	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="moreMsg" type="message">
			<uni-popup-message type="success" message="呜呜呜就这点功能,别点了" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	//更多点击弹窗
	const moreMsg = ref(null)
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
			name: "电子资源",
			url: "/page-home/resourceWebsite",
			icon: "bars",
		},
		{
			id: "",
			name: "座位预约",
			url: "http://ic.lib.wust.edu.cn/clientweb/xcus/ic2/Default.aspx",
			icon: "paperplane",
			type: "tsg",
		},
	{
			id: "",
			name: "馆藏服务",
			url: "https://tsg.wust.edu.cn/jyfw/fwsjygzfb.htm",
			icon: "chat",
			type: "tsg",
		},
		{
			id: "",
			name: "读者指南",
			url: "https://tsg.wust.edu.cn/info/1801/4941.htm",
			icon: "map",
			type: "tsg",
		},
		{
			id: "",
			name: "联系我们",
			url: "https://tsg.wust.edu.cn/bggk/lxwm.htm",
			icon: "star",
			type: "tsg",
		},
		{
			id: "",
			name: "更多",
			url: "",
			icon: "bars",
			type: "more"
		},
	]
	// 跳转页面
	const goTo = (url : string, type : string) => {
		if (type == "tsg") {
			uni.navigateTo({
				url: "/page-service/tsgview?url=" + url,
			})
		}
		else if (type == "more") {
			moreMsg.value.open();
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
		justify-content: space-around;

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