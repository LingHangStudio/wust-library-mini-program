<template>
	<view class="search">
		<view class="select">
			<uni-data-picker placeholder="请选择检索范围" popup-title="请选择检索范围" :localdata="searchType" v-model="choiceType"
				:clear-icon="false">
			</uni-data-picker>
		</view>
		<view class="value">
			<uni-search-bar bgColor="#EBEDF0" @confirm="search" v-model="searchValue" placeholder="搜索书名,分类,ISBN"
				:radius="100" clearButton="none" cancelButton="none"></uni-search-bar>
		</view>
	</view>
	<view v-if="searchHistory.length!=0" class="historyBox">
		<view class="head">
			<view class="">
				检索历史
			</view>
			<view @tap="clearHis" class="">
				清空
			</view>
		</view>

		<view class="history">
			<view @tap="selectHistoryOne(item)" class="item" v-for="(item, index) in searchHistory" :key="index">
				{{ item }}
			</view>
		</view>
	</view>
	<uni-card margin="7px" is-shadow>
		<template #title>
			<view class="card-header">
				<view class="card-header-content">
					<text class="card-header-content-title">热门检索词</text>
				</view>
				<view @click="changeBatch('hot')" class="card-header-extra">
					<uni-icons type="refresh" size="24" color="#142d88"></uni-icons>
				</view>
			</view>
		</template>
		<ListSkeleton :rows="12" display="flex" width="90%" v-if="loading"></ListSkeleton>
		<view v-else-if="!loading&&collectionHotWord.length===0">
			<Empty description="暂无检索词" width="160px" height="120px"></Empty>
		</view>
		<view v-else class="topSearch">
			<view class="item" v-for="(item, index) in collectionHotWord.slice(8*HotWordIndex,8+8*HotWordIndex)"
				:key="index" @tap="selectHistoryOne(item._1)">
				<uni-tag type="theme" circle inverted :text="item._1"></uni-tag>
			</view>
		</view>
	</uni-card>
	<uni-card margin="7px" is-shadow>
		<template #title>
			<view class="card-header">
				<view class="card-header-content">
					<text class="card-header-content-title">大家都在看</text>
				</view>
				<view @click="changeBatch('recommend')" class="card-header-extra">
					<uni-icons type="refresh" size="24" color="#142d88"></uni-icons>
				</view>
			</view>
		</template>
		<ListSkeleton :rows="12" display="flex" width="90%" v-if="loading"></ListSkeleton>
		<view v-else-if="!loading&&recommendList.length===0">
			<Empty width="160px" height="120px"></Empty>
		</view>
		<view v-else class="recommend">
			<view @tap="getBookDetail(item.bibId)"
				v-for="(item,index) in recommendList.slice(8*recommendIndex,8+8*recommendIndex)" :key="index"
				class="item">
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
	// Storage可以存储:数组和对象,不用序列化
	const searchHistory = uni.getStorageSync("searchHistory") ? ref(uni.getStorageSync("searchHistory")) : ref([])

	// 检索词列表，index用于换一换
	const collectionHotWord = ref([])
	const HotWordIndex = ref(0)
	const recommendList = ref([])
	const recommendIndex = ref(0)

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
		// 处理检索历史的逻辑
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

	const clearHis = () => {
		searchHistory.value = []
		uni.removeStorageSync("searchHistory")
	}
	const getHot = async () => {
		const res = await hotApi(15)// 获取15条，分两页
		if (res) {
			recommendList.value = res.data
		}
	}

	// 大家都在搜
	const getTopSearch = async () => {
		const res = await topSearchApi(15)// 获取15条，分两页
		if (res) {
			collectionHotWord.value = res.data
		}
		loading.value = false
	}

	// 点击历史搜索
	const selectHistoryOne = (item : any) => {
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

	// 换一换：改变展示的列表
	const changeBatch = (key : string) => {
		if (key === 'hot') {
			HotWordIndex.value = (HotWordIndex.value + 1) % 2
		}
		else {
			recommendIndex.value = (recommendIndex.value + 1) % 2
		}
	}
</script>

<style scoped lang="scss">
	.search {
		display: flex;
		flex-direction: row;

		.select {
			display: inline-block;
			margin: 8px 4px 1px 4px;
		}

		.value {
			width: 100%;
		}
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
				font-size: 12px;
				// background-color: #181963;
				color: #142d88;
				margin: 1px 5px;
				border: 1px solid #142d88;
				border-radius: 15px;
				padding: 4px 7px;
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


	.card-header {
		display: flex;
		border-bottom: 1px $uni-border-color solid;
		flex-direction: row;
		align-items: center;
		padding: 10px;
		overflow: hidden;

		.card-header-box {
			flex: 1;
			flex-direction: row;
			align-items: center;
			overflow: hidden;
		}

		.card-header-content {
			flex-direction: column;
			justify-content: center;
			flex: 1;
			// height: 40px;
			overflow: hidden;

			.card-header-content-title {
				font-size: 15px;
				color: #3a3a3a;
			}
		}

		.card-header-extra {
			align-items: center;
			line-height: 12px;
		}
	}
</style>