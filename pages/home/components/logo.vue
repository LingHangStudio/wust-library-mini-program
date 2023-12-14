<template>
	<view class="head">
		<view class="logo">
			<image class="logoImg" src="@/static/logo.png" alt=""></image>
		</view>
		<view class="font">
			<p class="chinese">
				武汉科技大学图书馆
			</p>
			<p class="english">
				Wuhan University of Science and Technology Library
			</p>
		</view>
		<view class="background">
			<image class="background-img"
				src="https://tse4-mm.cn.bing.net/th/id/OIP-C.KPb9J7dN2DZ28HNApCvnOAHaEo?pid=ImgDet&rs=1" alt=""/>
		</view>
	</view>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
	.head {
		display: flex;
		justify-content: space-around;
		position: relative;
		margin: 0 0 3rpx 0;
		overflow: hidden;

		.logo {
			margin: auto 0;

			.logoImg {
				width: 5rem;
				height: 5rem;
				border-radius: 50px;
				margin: auto 0;
			}
		}

		.font {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.chinese {
				font-family: Comic Sans MS;
				font-size: 1.8rem;
				line-height: 1.8rem;
			}

			.english {
				font-family: Comic Sans MS;
				font-size: .6rem;
				line-height: .6rem;
			}
		}

		.background {
			position: absolute;
			z-index: -1;
			width: 100vw;
			max-height: 10rem;
			overflow: hidden;

			.background-img {
				width: 100vw;
			}
		}
	}
</style>