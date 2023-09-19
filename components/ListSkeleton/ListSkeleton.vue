<template>
	<view v-show="isShow" class="loading">
		<view v-if="hasImage" class="image">
		</view>
		<view :class="display" class='content' v-for="index of loop" :key="index">
			<view v-for="childIndex in rows" :key="childIndex" class="description">
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	defineProps({
		isShow: {
			type: Boolean,
			default: true
		},
		hasImage: {
			type: Boolean,
			default: false,
		},
		rows: { // 一轮里有多少条
			type: Number,
			default: 4
		},
		loop: {// 多少轮
			type: Number,
			default: 1
		},
		display: { // 一条的排列方式
			type: String,
			default: "block"
		},
		width: {
			type: String,
			default: "100vw"
		}
	})
</script>

<style scoped lang="scss">
	.loading {
		width: v-bind(width);
		background-color: #fff;
		border-radius: 6px;
		overflow: hidden;
		// box-shadow: 0px 4px 6px rgba(0, 0, 0, .12);
		margin: 0 auto;

		.image {
			height: 200px;

			img {
				display: block;
				width: 100%;
				height: inherit;
				object-fit: cover;
			}
		}

		.content {
			

			.description {
				// font-size: 10px;
				// line-height: 14px;
				min-height: 1rem;
				border-radius: 4px;
				animation-delay: .06s;
			}
		}

		// 和content同级：区别为不同的排列方式
		.flex {
			padding: .2rem .5rem;
			display: flex;
			flex-wrap: wrap;

			.description {
				width: 20%;
				margin: 5px 5px;
			}
		}

		.block {
			margin: 0 auto;
			padding: .5rem 1.8rem;
			width: 80%;

			.description {
				margin: 10px 0;
			}
		}

	}

	// 动画的设置
	.loading .image,
	.loading .description {
		background-color: #ededed;
		background: linear-gradient(100deg,
				rgba(255, 255, 255, 0) 40%,
				rgba(255, 255, 255, .5) 50%,
				rgba(255, 255, 255, 0) 60%) #ededed;
		background-size: 200% 100%;
		background-position-x: 180%;
		animation: 1s loading ease-in-out infinite;
	}

	@keyframes loading {
		to {
			background-position-x: -20%;
		}
	}
</style>