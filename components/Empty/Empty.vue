<template>
	<div class="m-empty">
		<template v-if="image==='empty'">
			<view class="image">
				<image src="@/static/empty.svg" :style="{width:width,height:height}" mode="scaleToFill" alt="empty">
				</image>
			</view>
		</template>
		<slot v-else>
			<img class="u-empty" :src="image" :style="imageStyle" alt="image" />
		</slot>
		<span v-if="description" class="u-description" :class="{gray: image === '2'}">
			<slot name="description">{{ description }}</slot>
		</span>
	</div>
</template>
<script setup lang="ts">
	const props = defineProps({
		description: {
			type: String,
			default: "暂无数据"
		},
		width: {
			type: String,
			default: "320px"
		},
		height: {
			type: String,
			default: "240px"
		},
		image: {
			type: String,
			default: "empty"
		},
		imageStyle: {
			type: () => { },
		}
	})
</script>
<style lang="less" scoped>
	.m-empty {
		text-align: center;

		.u-empty {
			display: inline-block;
			vertical-align: bottom;
		}

		.u-description {
			display: inline-block;
			margin-top: 8px;
			font-size: 14px;
			color: rgba(0, 0, 0, .88);
			line-height: 1.571;
		}

		.gray {
			color: rgba(0, 0, 0, .25);
		}

		@media (prefers-color-scheme: dark) {
			.u-description {
				color: rgba(255, 255, 255, .88);
			}

			.gray {
				// color: rgba(0, 0, 0, .25);
				color: rgba(255, 255, 255, .88);
			}
		}
	}
</style>