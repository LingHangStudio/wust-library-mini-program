<template>
	<view class="Title">{{title}}</View>
	<view class="content">{{content}}</View>
	<uni-card class="linkContainer">
		<view class="linkType">校外访问方式</View>
		<view class="linkDetail">校外直接复制链接访问</View>
		<view class="link">
			<view class="linkWord">{{outLink}}</view>
			<button @click="copy(outLink)" class="linkButton" type="primary">复制</button>
		</view>
	</uni-card>
	<uni-card class="linkContainer">
		<view class="linkType">校内访问方式</View>
		<view class="linkDetail">连接校内网进行访问</View>
		<view class="link">
			<view class="linkWord">{{inLink}}</view>
			<button @click="copy(inLink)" class="linkButton" type="primary">复制</button>
		</view>
	</uni-card>
</template>

<script setup lang="ts">
	import { ref, onMounted, } from "vue"
	import { useStore } from "../store";
	const store = useStore()
	const inLink = ref()
	const outLink = ref()
	const title = ref()
	const content = ref()


	//复制信息
	const copy = (value : string) => {
		uni.setClipboardData({
			data: value,
		})
	}
	onMounted(() => {
		return (inLink.value = store.link.inLink, outLink.value = store.link.outLink, title.value = store.link.title, content.value = store.link.content);
	})
</script>

<style scoped lang="scss">
	.Title {
		margin-top: 20px;
		text-align: center;
	}

	.content {
		text-align: center;
		padding: 0 30px;
		font-size: 14px;
		color: #9a9999;
	}

	.linkContainer {
		display: flex;
		flex-direction: column;

		.linkType {
			color: black;
			font-weight: bold;
			border-bottom: 1px solid black;
		}

		.linkDetail {}

		.link {

			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			width: 90%;

			.linkWord {
				width: 100%;
				font-size: 14px;
				color: #9a9999;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.linkButton {
				margin-left: 5px;
				padding: 0 5px 0 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 16px;
				font-size: 8px;
				width: 40px;
			}
		}
	}
</style>