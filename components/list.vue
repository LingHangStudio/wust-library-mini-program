<template>
	<view class="">
		<view v-if="listLength===0" class="">
			<Empty description="暂无活动"></Empty>
		</view>
		<scroll-view @scroll="isShowArrow" :scroll-top="myScroll" scroll-y :lower-threshold="30" style="height: 100vh"
			@scrolltolower="getMoreFunc" enable-back-to-top v-else>
			<slot></slot>
			<view style="text-align: center;padding: 3px;">--到底啦！--</view>
		</scroll-view>
	</view>
	<uni-fab horizontal="right" vertical="bottom" v-show="topArrow" buttonColor="" backgroundColor=""
		:pattern="{type:'top'}" @fabClick="toTop" :popMenu="false" />
</template>

<script setup lang="ts">
	// @scrolltolower="getMyList({page:paginations.currentPage+1,pageSize:paginations.pageNum})"
	// 封装这个lits,目的是：简化置顶按钮的配置,简化scroll-view的配置
	import Empty from "@/components/Empty.vue"
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
		}
	})

	// 置顶按钮
	const myScroll = ref(0)
	const oldScrollTop = ref(0)
	const topArrow = ref(false)
	const toTop = () => {
		console.log("出发了",myScroll.value)
		myScroll.value = oldScrollTop.value
		nextTick(() => {
			myScroll.value = -20
		})
		topArrow.value = false
	}

	const isShowArrow = (e : any) => {
		oldScrollTop.value = e.detail.scrollTop
		if (e.detail.scrollTop > 0) topArrow.value = true
		else topArrow.value = false
	}

	const getMoreFunc = () => {
		emit('getMore', { page: props.page + 1, pageSize: props.pageSize })
	}
</script>

<style lang="scss" scoped>
</style>