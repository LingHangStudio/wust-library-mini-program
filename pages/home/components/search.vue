<!-- 本搜索框包括通告栏和搜索框 -->
<template>
	<view class="searchBox">
		<!-- 通告栏 -->
		<uni-notice-bar show-icon scrollable color="#fff" background-color="#39baf6"
			text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。" />
		<!-- 首页搜索框,readonly(只读）) -->
		<view @tap.stop="goTo('/page-home/search', 'inner')">
			<uni-search-bar readonly cancel-button="none" placeholder="搜索书名,作者,分类,IBSN" :radius="80"></uni-search-bar>
		</view>
	</view>

</template>

<script setup lang="ts">
	//搜索跳转函数
	const goTo = (url : string, type : string) => {
		if (type == "tsg") uni.navigateTo({ url: "/page-home/tsgview?url=" + url })
		else uni.navigateTo({ url: url })
	}
</script>
<style scoped lang="scss">
	.searchBox {
		background-color: #22b3f6;
	}
</style>