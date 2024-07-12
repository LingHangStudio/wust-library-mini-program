<!-- 仅仅只有轮比兔 -->
<template>
	<view class="swiperBox">
		<swiper class="swiper" :indicator-dots="true" circular :autoplay="true" :interval="2000">
			<swiper-item @tap="goto(item.url)" v-for="(item, index) in bannerList" :key="index">
				<image :src="item.url" alt="error" class="images"></image>
			</swiper-item>
		</swiper>
	</view>

</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const bannerList = ref([
		{
			url: "https://smarttool.wust.edu.cn:3001/images/background-img1.jpg",
			url2: ""
		},
		{
			url: "https://smarttool.wust.edu.cn:3001/images/background-img2.jpg",
			url2: ""
		},
	])

	//搜索跳转函数
	const goTo = (url : string) => {
		console.log("跳转")
	}
</script>
<style scoped lang="scss">
	.swiperBox {
		margin: 10px 8px 5px 8px;
		border-radius: 8px;
		overflow: hidden;
		.images{
			width:400px;
		}
	}
</style>