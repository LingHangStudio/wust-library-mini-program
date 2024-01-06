<template>
	<view class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg');">
		<view class="header-image" hover-class="back">
			<!-- <img class="header-image" :src="WechatInfo.avatarUrl" alt="avatar"> -->
			<image class="header-image" src="@/static/face1.png" alt="avatar"></image>
		</view>
		<view class="info">
			<!-- #ifndef APP-PLUS -->
			{{store.userInfo.displayName}}
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			安卓用户
			<!-- #endif -->
		</view>
		<view>
			<view class="layer1"></view>
			<view class="layer2"></view>
			<view class="layer3"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
	// #ifndef APP-PLUS
	import { useStore } from "@/store"
	const store = useStore()
	// #endif
</script>

<style scoped lang="scss">
	.user {
		width: 100%;
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: center;
		background-image: linear-gradient(-225deg, #231557 0%,
				#43107a 29%, #FF1361 100%);

		#myCanvas {
			position: absolute;
		}

		.header-image {
			z-index: 100;
			border-radius: 50%;
			display: block;
			width: 4rem;
			height: 4rem;
			margin: 5px auto;

			position: relative;
			transform-style: preserve-3d;
			transition: 1s;
		}

		.info {
			color: white;
			font-size: 1.5rem;
			margin: 0 auto;
			padding: 10px 0;
		}
	}

	// 旋转到背面
	.back {
		transform: rotateY(180deg);
	}


	@function getShadows($n) {
		$shadows: '#{random($limit: 100)}vw #{random($limit: 100)}vh #fff';

		@for $i from 2 through $n {
			$shadows: '#{$shadows}, #{random($limit: 100)}vw #{random($limit: 100)}vh #fff';
		}

		@return unquote($shadows)
	}

	@keyframes moveUp {
		100% {
			transform: translateY(-100vh);
		}
	}

	$count: 1000;
	$duration: 1550s;

	@for $i from 1 through 3 {
		$duration: floor($duration / 2);
		$count: floor($count / 2);

		.layer#{$i} {
			$size: #{$i}px;
			position: fixed;
			width: $size;
			height: $size;
			border-radius: 50%;
			top: 0;
			left: 0;
			box-shadow: getShadows($count);
			animation: moveUp $duration linear infinite;

			&::after {
				content: "";
				position: fixed;
				left: 0;
				top: 100vh;
				width: $size;
				height: $size;
				border-radius: inherit;
				box-shadow: inherit;
			}
		}

	}
</style>