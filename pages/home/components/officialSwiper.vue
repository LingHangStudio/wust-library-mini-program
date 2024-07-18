<!-- 仅仅只有轮比兔 -->
<template>
	<view class="swiperBox">
		<swiper class="swiper" :indicator-dots="true" circular :autoplay="true" :interval="2000">
			<swiper-item @tap="goto(item.url)" v-for="(item, index) in bannerList" :key="index">
				<image :src="item.pictureLink" alt="error" class="images" @click="goTo(item.articleLink)"></image>
			</swiper-item>
		</swiper>
	</view>

</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { getHomeArticle, swiperList } from '../../../api/end';
	const swiperArticle = ref<swiperList[]>([])
	const getSwiperArticle = async () => {
		const res = await getHomeArticle()
		if (res.code === 200) {
			swiperArticle.value = res.data;
		}
	}
	const bannerList = swiperArticle.value.slice(0, 2);

	//搜索跳转函数
	const goTo = (url : string) => {
		console.log(url)
	}
	onMounted(() => {
		getSwiperArticle()
	})
</script>
<style scoped lang="scss">
	.swiperBox {
		margin: 10px 8px 5px 8px;
		border-radius: 8px;
		overflow: hidden;

		.images {
			width: 400px;
		}
	}
</style>