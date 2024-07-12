<template>
	<view class="root">
		<!-- 搜索框 -->
		<Search></Search>
		<!-- 公众号轮播图 -->
		<OfficialSwiper></officialSwiper>
		<!-- 借阅服务列表 -->
		<Nav></Nav>
		<!-- 好书推荐 -->
		<Recommend></Recommend>
	</view>
</template>

<script setup lang="ts">
	import Nav from "@/pages/home/components/nav.vue"
	import Search from "@/pages/home/components/search.vue"
	import Recommend from "@/pages/home/components/recommend.vue"
	import OfficialSwiper from "@/pages/home/components/officialSwiper.vue"
</script>

<style lang="scss" scoped>
	swiper {
		height: 400rpx;

		image {
			width: 100vw;
		}
	}

	.img-area {
		transform: translateX(-160px) translateY(-30vh);
	}

	@media (prefers-color-scheme: dark) {
		.root {
			color: #fff;
			background-color: #000;
		}
	}
</style>