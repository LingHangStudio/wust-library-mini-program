<template>
	<view class="background">
		<image style="width: 100vw"
			src="https://tse4-mm.cn.bing.net/th/id/OIP-C.KPb9J7dN2DZ28HNApCvnOAHaEo?pid=ImgDet&rs=1" mode="scaleToFill">
		</image>
	</view>

	<uni-card :title="aboutMeContent.title">
		<view v-html="aboutMeContent.content" class="">
		</view>
	</uni-card>

	<!-- <view class="about">
		<view class="titleZ text-center align-center margin-top-xl">
			<text class="text-bold">想学习？有需求？有项目？</text>
			<view class="contentZ margin-top-lg">
				<text class="text-xl text-bold">「宅家学」</text>
				<text class="text-xl">：软件技术开发培训（实战项目），1至4个月课程可随意选择，课程包含：UI设计、Web前端、Java后台等，挑战万元月薪，快来宅家学吧～</text>
			</view>
		</view>
	</view> -->
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	import { getArticleContent } from "@/api/api.js"
	const aboutMeContent = ref()
	async function getContent() {
		let res = await getArticleContent({ id: 56 });
		aboutMeContent.value = res.data
	}
	onLoad(() => {
		getContent()
	})
</script>

<style scoped lang="scss">
	.about {
		margin: 0;
		width: 100%;
		border: 1px solid red;
		height: 100vh;
		// padding-top: 20%;
		color: #fff;
		background: linear-gradient(-120deg, #F15BB5, #9A5CE5, #01BEFF, #00F5D4);
		/* background: linear-gradient(-120deg, #0976ea, #c471f5, #f956b6, #ea7e0a); */
		background-size: 500% 500%;
		animation: gradientBG 15s ease infinite;
	}

	.titleZ {
		width: 750rpx;
		font-size: 52rpx;
		// margin-top: 60rpx;
	}

	.contentZ {
		width: 650rpx;
		margin: 10rpx auto 0;
		text-align: left;
	}


	@keyframes gradientBG {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}
</style>