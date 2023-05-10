<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
	</view>
	<view class="content">
		<view v-if="current === 0"><text class="content-text">选项卡1的内容</text></view>
		<view v-if="current === 1"><text class="content-text">选项卡2的内容</text></view>
		<view v-if="current === 2"><text class="content-text">选项卡3的内容</text></view>
		<view v-if="current === 3"><text class="content-text">选项卡4的内容</text></view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const items = ref(["全部", "讲座", "培训", "阅读活动"])
	const current = ref(0)
	const onClickItem = (e) => {
		if (current.value != e.currentIndex)
			current.value = e.currentIndex
	}
</script>

<style>
</style>