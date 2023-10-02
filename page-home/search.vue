<template>
	<view class="search">
		<view class="select">
			<uni-data-picker placeholder="请选择检索范围" popup-title="请选择检索范围" :localdata="searchType" v-model="choiceType"
				:clear-icon="false">
			</uni-data-picker>
		</view>
		<view class="value">
			<uni-search-bar @confirm="search" v-model="searchValue" placeholder="搜索书名,分类,ISBN" :radius="100"
				:clearButton="false" :cancelButton="false"></uni-search-bar>
		</view>
	</view>
	<view v-if="searchHistory.length!=0" class="historyBox">
		<view class="head">
			<view class="">
				检索历史
			</view>
			<view @tap="clearHot" class="">
				清空
			</view>
		</view>

		<view class="history">
			<view @tap="selectHistoryOne(item)" class="item" v-for="(item, index) in searchHistory" :key="index">
				{{ item }}
			</view>
		</view>
	</view>
	<uni-card title="热门检索词" margin="5px" is-shadow>
		<ListSkeleton :rows="12" display="flex" width="90%" v-if="loading"></ListSkeleton>
		<view v-else-if="!loading&&collectionHotWord.length===0">
			<Empty description="暂无检索词" width="160px" height="120px"></Empty>
		</view>
		<view v-else class="topSearch">
			<view class="item" v-for="(item, index) in collectionHotWord" :key="index" @tap="selectHistoryOne(item._1)">
				<uni-tag type="theme" circle inverted :text="item._1"></uni-tag>
			</view>
		</view>
	</uni-card>
	<uni-card title="大家都在看" margin="5px" is-shadow>
		<ListSkeleton :rows="12" display="flex" width="90%" v-if="loading"></ListSkeleton>
		<view v-else-if="!loading&&recommendList.length===0">
			<Empty width="160px" height="120px"></Empty>
		</view>
		<view v-else class="recommend">
			<view @tap="getBookDetail(item.bibId)" v-for="(item,index) in recommendList" :key="index" class="item">
				<uni-tag type="theme" circle inverted :text="item.title"></uni-tag>
			</view>
		</view>
	</uni-card>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { hotApi, topSearchApi } from "@/api/huiwen/home"
	const loading = ref(true)
	const searchValue = ref("")
	// localStorage可以存储数组和对象
	const searchHistory = uni.getStorageSync("searchHistory") ? ref(uni.getStorageSync("searchHistory")) : ref([])
	//馆藏目录：热门检索
	const collectionHotWord = ref([])
	const recommendList = ref([])
	const searchType = ref([
		{
			value: "all",
			text: "关键词",
		},
		{
			value: "title",
			text: "题名",
		}, {
			value: "callno",
			text: "索书号",
		}
	])
	const choiceType = ref("all")
	const search = async () => {
		let value = searchValue.value
		// 清空输入内容
		searchValue.value = ""
		searchHistory.value.unshift(value)
		searchHistory.value = Array.from(new Set(searchHistory.value))// 清除重复的检索项
		if (searchHistory.value.length > 7) {
			searchHistory.value.pop()
		}
		uni.setStorageSync("searchHistory", searchHistory.value)
		if (value) {
			uni.navigateTo({
				url: "/page-home/search-list?keyword=" + value + "&choiceType=" + choiceType.value
			})
		}
	}

	const clearHot = () => {
		searchHistory.value = []
		uni.removeStorageSync("searchHistory")
	}
	const getHot = async () => {
		const res = await hotApi(8)
		console.log("hot", res)
		if (res) {
			recommendList.value = res.data
		}
	}
	const getTopSearch = async () => {
		const res = await topSearchApi(8)
		if (res) {
			collectionHotWord.value = res.data
		}
		loading.value = false
	}
	// 点击历史搜索
	const selectHistoryOne = (item) => {
		searchValue.value = item
		search()
	}
	// 点击
	const getBookDetail = (bibId : string | number) => {
		uni.navigateTo({
			url: "/page-home/detail?bibId=" + bibId
		})
	}

	getHot()
	getTopSearch()
</script>

<style scoped lang="scss">
	.search {
		display: flex;
		flex-direction: row;

		.select {
			display: inline-block;
			margin: 8px 4px 1px 4px;
		}

		.value {}
	}

	.historyBox {
		.head {
			display: flex;
			justify-content: space-between;
			margin: 2px 5px 3px 20px;
			color: #181963;
		}

		.history {
			display: flex;
			flex-wrap: wrap;
			margin-left: 3px;

			.item {
				// background-color: #181963;
				color: #181963;
				margin: 1px 5px;
				border: 1px solid #181963;
				border-radius: 15px;
				padding: 7px 7px;
			}
		}
	}

	.topSearch {
		display: flex;
		flex-wrap: wrap;

		.item {
			padding: 1px;
			margin: 3px;
		}
	}

	.recommend {
		display: flex;
		flex-wrap: wrap;

		.item {
			padding: 1px;
			margin: 3px;
		}
	}
</style>