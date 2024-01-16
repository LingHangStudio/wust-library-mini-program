<template>
	<uni-card is-full padding="2px">
		<uni-collapse ref="collapse" :accordion="true">
			<uni-collapse-item title="主题设置">
				推荐颜色
				<view class="color-box">
					<view class="color-box-item" :style="{backgroundColor:item.color}" v-for="item in themeColorList"
						:key="item.color" @tap="setThemeColor(item.color)">
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</uni-card>
	<template v-for="item in buttonMenu" :key="item.id">
		<uni-card :title="item.name" is-full padding="2px" @tap="item.fun">
			<uni-icons :type="item.icon" size="24"></uni-icons>
		</uni-card>
	</template>
	<button class="button" @tap="toComment" type="default">体验评价</button>
</template>

<script setup lang="ts">
	import { ref } from "vue"

	const clearCache = () => {
		// 将localStorage的内容删除一部分，保留登录信息
		uni.showToast({
			title: "清除成功！",
			icon: "success"
		})
	}

	const buttonMenu = [
		{
			id: "cache",
			name: "清除缓存(不影响登录)",
			fun: () => clearCache(),
			icon: "",
		},
	]

	const toComment = () => {
		let plugin = requirePlugin("wxacommentplugin");
		plugin.openComment({
			success: (res) => {
				console.log('plugin.openComment success', res)
			},
			fail: (res) => {
				console.log('plugin.openComment fail', res)
			}
		})
	}

	const setThemeColor = (color : string) => {
		// 设置后，重启生效
		uni.setStorageSync("themeColor", color)
	}

	const themeColorList = [
		{
			color: "#142d88",
			name: "",
		}, {
			name: "",
			color: "#C74E23",
		}, {
			name: "绿色",
			color: "#118A17",
		},
	]
</script>

<style scoped lang="scss">
	.color-box {
		display: flex;

		&-item {
			width: 30px;
			height: 30px;
			margin: 3px;
		}
	}


	.button-item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		background: white;
		align-items: center;
		text-align: left;
		padding: 0px;
		margin: 10px 0px;
		border-bottom: 1px solid #e6e6e6;
		border-radius: 0;
		outline: none;
		color: #000;
		background-color: transparent;
		// font-size: 1.2rem;
		height: 2.3rem;
		line-height: 2.3rem;

		.font {
			display: flex;
			// font-size: 1.2rem;
			height: 2.3rem;
			line-height: 2.3rem;
			align-items: center;
		}
	}

	// 消除按钮的边框
	.item::after {
		display: none;
	}


	.button {
		color: #fff;
		width: 90%;
		border: 0;
		background-color: #142d88;
		border-radius: 5px;
		text-align: center;
		margin: 10px auto;
	}
</style>