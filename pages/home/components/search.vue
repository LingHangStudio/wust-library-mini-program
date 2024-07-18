<!-- 本搜索框包括通告栏和搜索框 -->
<template>
	<view class="searchBox">
		<!-- 通告栏 -->
		<uni-notice-bar show-icon scrollable color="#fff" background-color="#39baf6" speed="50"
			:text="notice" />
		<!-- 首页搜索框,readonly(只读）) -->
		<view @tap.stop="goTo('/page-home/search', 'inner')" class="search">
			<uni-search-bar readonly cancel-button="none" placeholder="搜索书名,作者,分类,IBSN" :radius="60"></uni-search-bar>
		</view>
	</view>

</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { getNotice } from '../../../api/end';

	const notice = ref("")

	//搜索跳转函数
	const goTo = (url : string, type : string) => {
		if (type == "tsg") uni.navigateTo({ url: "/page-home/tsgview?url=" + url })
		else uni.navigateTo({ url: url })
	}
	//获取公告
	const getNoticeMessage = async () => {
		const res = await getNotice()
		if (res.code === 200) {
			notice.value = res.data.content;
		}
	}
	onMounted(() => {
		getNoticeMessage()
	})
</script>
<style scoped lang="scss">
	.searchBox {
		background-color: #22b3f6;

		.search {
			padding: 10px;
		}
	}
</style>