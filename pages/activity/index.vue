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
	import { getArticleList, getArticleContent } from "@/api/api.js"
	const items = ref(["全部", "讲座", "培训", "阅读活动"])
	const readList = ref([])
	const lectureList = ref([])
	const trainList = ref([])
	const current = ref(0)
	const onClickItem = (e) => {
		if (current.value != e.currentIndex)
			current.value = e.currentIndex
	}


	async function getArticle() {
		//讲座活动列表
		const res1 = await getArticleList({
			categoryId: 39
		})

		lectureList.value = res1.data;

		//培训活动列表
		const res2 = await getArticleList({
			categoryId: 46,
		});
		console.log(res2);
		trainList.value = res2.data;

		//阅读活动列表
		const res3 = await getArticleList({
			categoryId: num
		})

		readList.value = res3.data;

	}
	getArticle()
</script>

<style scoped lang="scss">
</style>