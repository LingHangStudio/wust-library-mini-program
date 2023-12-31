<template>
	<view class="search">
		<view class="select">
			<uni-data-picker v-model="choiceType" placeholder="请选择检索范围" popup-title="请选择检索范围" :localdata="searchType"
				:clear-icon="false">
			</uni-data-picker>
		</view>
		<view class="value">
			<uni-search-bar v-model="searchValue" bg-color="#EBEDF0" placeholder="搜索书名,分类,ISBN" :radius="100"
				clear-button="none" cancel-button="none" @confirm="search"></uni-search-bar>
		</view>
	</view>
	<view v-if="searchHistory.length != 0" class="historyBox">
		<view class="head">
			<text> 检索历史 </text>
			<text @tap="clearHis"> 清空 </text>
		</view>
		<view class="history">
			<view v-for="(item, index) in searchHistory" :key="index" class="item" @tap="selectHistoryOne(item)">
				{{ item }}
			</view>
		</view>
	</view>

	<uni-card ref="topSearch" margin="7px" is-shadow>
		<template #title>
			<view class="card-header">
				<view class="card-header-content">
					<text class="card-header-content-title">热门检索词</text>
				</view>
				<view v-show="collectionHotWord.length !== 0" hover-class="rotate-2d" class="card-header-extra"
					@click="changeBatch('hot')">
					<uni-icons type="refresh" size="24" color="#142d88"></uni-icons>
				</view>
			</view>
		</template>
		<uni-transition mode-class="fade" :show="hotWordStatus.show">
			<ListSkeleton v-if="loading" :rows="12" display="flex" width="90%"></ListSkeleton>
			<view v-else-if="!loading && collectionHotWord.length === 0">
				<Empty description="暂无检索词" width="160px" height="120px"></Empty>
			</view>
			<view v-else class="topSearch">
				<view
					v-for="(item, index) in collectionHotWord.slice(8 * hotWordStatus.index, 8 + 8 * hotWordStatus.index)"
					:key="index" class="item" @tap="selectHistoryOne(item._1)">
					<uni-tag type="theme" circle inverted :text="item._1"></uni-tag>
				</view>
			</view>
		</uni-transition>
	</uni-card>
	<uni-card margin="7px" is-shadow>
		<template #title>
			<view class="card-header">
				<view class="card-header-content">
					<text class="card-header-content-title">大家都在看</text>
				</view>
				<view v-show="recommendList.length !== 0" hover-class="rotate-2d" class="card-header-extra"
					@click="changeBatch('recommend')">
					<uni-icons type="refresh" size="24" color="#142d88"></uni-icons>
				</view>
			</view>
		</template>
		<uni-transition mode-class="fade" :show="recommendStatus.show">
			<ListSkeleton v-if="loading" :rows="12" display="flex" width="90%"></ListSkeleton>
			<view v-else-if="!loading && recommendList.length === 0">
				<Empty width="160px" height="120px"></Empty>
			</view>
			<view v-else class="recommend">
				<view
					v-for="(item, index) in recommendList.slice(8 * recommendStatus.index, 8 + 8 * recommendStatus.index)"
					:key="index" class="item" @tap="getBookDetail(item.bibId)">
					<uni-tag type="theme" circle inverted :text="item.title"></uni-tag>
				</view>
			</view>
		</uni-transition>
	</uni-card>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { hotApi, topSearchApi } from "@/api/huiwen/home"
	const loading = ref(true)
	const searchValue = ref("")
	// Storage可以存储:数组和对象,不用序列化
	const searchHistory = uni.getStorageSync("searchHistory") ? ref(uni.getStorageSync("searchHistory")) : ref([])

	// 检索词列表，index用于换一换的序号,show用于过渡效果
	const collectionHotWord = ref([]) // 热门检索词列表
	const hotWordStatus = ref({
		// 热门检索词卡片状态
		index: 0,
		show: true
	})

	const recommendList = ref([]) // 大家都在看列表
	const recommendStatus = ref({
		// 大家都在看列表卡片状态
		index: 0,
		show: true
	})

	const searchType = ref([
		{
			value: "all",
			text: "关键词",
		},
		{
			value: "title",
			text: "题名",
		},
		{
			value: "callno",
			text: "索书号",
		},
	])
	const choiceType = ref("all")

	const search = async () => {
		let value = searchValue.value
		// 清空输入内容
		searchValue.value = ""
		searchHistory.value.unshift(value)
		// 处理检索历史的逻辑
		searchHistory.value = Array.from(new Set(searchHistory.value)) // 清除重复的检索项
		if (searchHistory.value.length > 7) {
			searchHistory.value.pop()
		}
		uni.setStorageSync("searchHistory", searchHistory.value)
		if (value) {
			uni.navigateTo({
				url: "/page-home/search-list?keyword=" + value + "&choiceType=" + choiceType.value,
			})
		}
	}

	const clearHis = () => {
		searchHistory.value = []
		uni.removeStorageSync("searchHistory")
	}
	const getHot = async () => {
		const res = await hotApi(15) // 获取15条，分两页
		res && (recommendList.value = res.data)
	}

	// 大家都在搜
	const getTopSearch = async () => {
		const res = await topSearchApi(15) // 获取15条，分两页
		res && (collectionHotWord.value = res.data)
		loading.value = false
	}

	// 点击历史搜索
	const selectHistoryOne = (item : any) => {
		searchValue.value = item
		search()
	}

	// 点击跳转
	const getBookDetail = (bibId : string) => {
		uni.navigateTo({
			url: "/page-home/detail?bibId=" + bibId,
		})
	}

	getHot()
	getTopSearch()

	// 换一换：改变展示的列表
	const changeBatch = (key : string) => {
		const indexMap = {
			"hot": hotWordStatus,
			"recommend": recommendStatus,
		};
		indexMap[key].value.show = false
		let timmer = setTimeout(() => {
			indexMap[key].value = {
				index: (indexMap[key].value.index + 1) % 2,
				show: true
			}
			// timmer.clear()
		}, 300)
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
			color: inherit;
			// color: #181963;
		}

		.history {
			display: flex;
			flex-wrap: wrap;
			margin-left: 3px;

			.item {
				font-size: 12px;
				color: inherit;
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
		color: inherit;

		.item {
			padding: 1px;
			margin: 3px;
		}
	}

	.recommend {
		display: flex;
		flex-wrap: wrap;
		color: inherit;

		.item {
			padding: 1px;
			margin: 3px;
		}
	}
</style>