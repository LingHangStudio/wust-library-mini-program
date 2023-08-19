<template>
	<view v-if="!searchList" class="">
		<Empty></Empty>
	</view>
	<view v-else v-for="(item,index) in searchList" :key="index" class="">
		{{item.title}}
	</view>
</template>

<script setup lang="ts">
	import Empty from "@/components/Empty.vue"
	//list页面 可能是 文章列表，也有可能是 搜索的结果列表
	//list页面可能是主页跳过来的预约服务，借阅服务
	import { ref, onMounted, reactive } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	import { getArticleList, searchArticle } from "@/api/api.js"
	const searchInput = ref("") //从搜索页传参
	let searchList = reactive([])
	// 当前页 
	const currentPage = ref(1)
	// 页数
	const pageNum = ref(10)
	const err = ref(false)
	onLoad((e) => {
		console.log(e);
		if (e) {
			searchInput.value = e.keyword
		}
	})
	//获取检索列表:站内
	async function getSearch() {
		const res = await searchArticle({
			keyword: searchInput.value,
			currentPage: currentPage,
			pageNum: pageNum
		})
		if (res) {
			searchList = res.data
		} else {
			err.value = true
		}
	}

	//获取文章列表
	async function getArticle() {
		const res = await getArticleList()
		console.log(res);
	}

	onMounted(() => {
		console.log(searchInput);
		if (searchInput.value) {
			//站内检索
			console.log("我是搜索");
			getSearch()
		} else {
			console.log("我是文章列表");
			getArticle()
		}
	})
</script>

<style lang="scss" scoped>
	.err {
		uni-image {
			display: block;
			margin: 3px auto;
		}
	}
</style>