<template>
	<view v-if="listLength===0" class="">
		<Empty :description="emptyInfo"></Empty>
	</view>
	<view v-else class="root">
		<scroll-view @scroll="isShowArrow" :scroll-top="myScroll" scroll-y :lower-threshold="30" style="height: 100vh"
			@scrolltolower="getMoreFunc" enable-back-to-top>
			<slot></slot>
			<view style="text-align: center;padding: 3px;">--到底啦！共{{listLength}}条--</view>
		</scroll-view>
	</view>
	<view class="bgc">
	</view>
	<uni-fab icon="top" horizontal="right" vertical="bottom" v-show="topArrow" buttonColor="" backgroundColor=""
		@fabClick="toTop" :popMenu="false" />
</template>

<script setup lang="ts">
	import Empty from '@/components/Empty/Empty.vue'
	// @scrolltolower="getMyList({page:paginations.currentPage+1,pageSize:paginations.pageNum})"
	// 封装这个lits,目的是：简化置顶按钮的配置,简化scroll-view的配置
	import { ref, nextTick } from "vue"
	// 子传父方法
	const emit = defineEmits(['getMore'])

	// 父传子变量
	const props = defineProps({
		listLength: {
			type: Number,
			default: 0
		},
		page: {
			type: Number,
			default: 1,
		},
		pageSize: {
			type: Number,
			default: 20,
		},
		emptyInfo: {
			type: String,
			default: "暂无数据",
		}
	})

	// 置顶按钮
	const myScroll = ref(0)
	const oldScrollTop = ref(0)
	const topArrow = ref(false)
	const toTop = () => {
		console.log("出发了", myScroll.value)
		myScroll.value = oldScrollTop.value
		nextTick(() => {
			myScroll.value = -20
		})
		topArrow.value = false
	}

	const isShowArrow = (e : any) => {
		oldScrollTop.value = e.detail.scrollTop
		if (e.detail.scrollTop > 50) topArrow.value = true
		else topArrow.value = false
	}

	const getMoreFunc = () => {
		emit('getMore', { page: props.page + 1, pageSize: props.pageSize })
	}
</script>

<style lang="scss" scoped>
	// 给列表设计样式
	.root {
		// height: 100%;
		// background-color: #F5F7F9;
		// background: linear-gradient(to bottom, rgb(20, 45, 136), #F5F7F9);
		background: linear-gradient(to bottom, #142D87 0%, #F5F7F9 60%, #F5F7F9 100%);
	}

	.bgc {
		// position: relative;
		// width: 100vw;
		// height: 200px;
		// background: linear-gradient(to bottom right, rgb(20,45,136), rgb(149, 214, 240));
	}
</style>