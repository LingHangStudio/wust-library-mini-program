<template>
	<view class="search">
		<view class="select">
			<uni-data-picker placeholder="请选择检索范围" popup-title="请选择检索范围" :localdata="searchType" v-model="choiceType"
				@change="selectOneType" :clear-icon="false">
			</uni-data-picker>
		</view>
		<view class="value">
			<uni-search-bar @confirm="search" v-model="searchValue" placeholder="搜索书名,作者,分类,ISBN" :radius="100"
				:clearButton="false" :cancelButton="false"></uni-search-bar>
		</view>
	</view>
	<view v-if="searchHistory.length!=0" class="historyBox">
		<view class="head">
			<view class="">
				检索历史
			</view>

			<view @tap="clear" class="">
				清空
			</view>
		</view>

		<view class="history">
			<view @tap="selectHistoryOne(item)" class="item" v-for="(item, index) in searchHistory" :key="index">
				{{ item }}
			</view>

		</view>
	</view>
	<uni-card class="recommend" title="热门检索" margin="2px"
		thumbnail="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
		<view class="">
			<view v-for="(item, index) in collectionHotWord" :key="index" @click="searchHot(item)">
				{{ item }}
			</view>
		</view>

	</uni-card>
	<uni-card title="大家都在看" class="hot" margin="2px"
		thumbnail="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
		<view v-for="(item,index) in recommendList" :key="index" class="hotBox">
			{{}}
		</view>
	</uni-card>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { getDisciplineCate } from "@/api/api.js"
	// import { onShow } from "@dcloudio/uni-app"
	const searchValue = ref("")
	const searchHistory = uni.getStorageSync("searchHistory") ? ref(uni.getStorageSync("searchHistory")) : ref([])
	//馆藏目录：热门检索
	const collectionHotWord = ref([])
	const recommendList = ref([])
	const searchType = ref([
		{
			value: "0",
			text: "馆藏目录",
			children: [
				{
					value: "0-0",
					text: "题名",
				}, {
					value: "0-1",
					text: "作者",
				}, {
					value: "0-2",
					text: "主题",
				}, {
					value: "0-3",
					text: "刊名",
				},
			]
		}, {
			value: "1",
			text: "数据库"
		}, {
			value: "2",
			text: "站内检索"
		},
	])
	const choiceType = ref("0-0")
	const choiceType1 = ref("0")
	const choiceType2 = ref("0")
	const search = () => {
		let value = searchValue.value
		searchValue.value = ""
		searchHistory.value.unshift(value)
		if (searchHistory.value.length > 7) {
			searchHistory.value.pop()
		}
		uni.setStorageSync("searchHistory", searchHistory.value)
		if (choiceType1.value == searchType.value[2].value) {
			//站内检索
			uni.navigateTo({
				url: "/page-service/list?keyword=" + value
			})
		} else {
			//馆藏目录,数据库
			uni.navigateTo({
				url: "/page-home/search-webview?keyword=" + value + "&strSearchType1=" + choiceType1.value + "&strSearchType2=" + choiceType2.value
			})
		}
	}
	let list = [
		{
			bibId: 'mc5101f524146ee1dff259c41c29b9c68',
			rank: 6,
			hotValue: 8,
			isOpen: 1,
			pub_year: '2018',
			author: '刘伟成著',
			callno: null,
			isbn: '9787307199149',
			publisher: '武汉大学出版社',
			bibNo: '1801333133',
			_id: '285942',
			title: '数字信息资源检索',
		},
		{
			title: '耐火材料学',
		},
		{
			title: '平凡的世界',
		},
		{
			title: '毛泽东选集',
		},
	]
	list.forEach((item) => {
		collectionHotWord.value.push(item.title)
	})
	const searchHot = (item) => {

	}

	const clear = () => {
		searchHistory.value = []
		uni.removeStorageSync("searchHistory")
	}
	async function getRecomend() {
		const res = await getDisciplineCate()
		console.log(res);
	}

	const selectHistoryOne = (item) => {
		searchValue.value = item
		search()
	}
	const selectOneType = () => {
		let temp = choiceType.value.split("-")
		choiceType1.value = temp[0]
		choiceType2.value = temp[1]
	}

	getRecomend()
</script>

<style scoped lang="scss">
	.search {
		// display: flex;
		// flex-direction: row;

		.select {
			display: inline-block;
			// border: 1px solid red;
			margin: 8px 4px 1px 4px;
		}

		.value {}

	}

	.historyBox {
		.head {
			// display: inline-block;
			display: flex;
			justify-content: space-between;
			// border: 1px solid red;
			margin: 2px 5px 3px 20px;
			color: #181963;

			view {}
		}

		.history {
			display: flex;
			flex-wrap: wrap;
			margin-left: 3px;

			.item {
				background-color: #f6f7f8;
				color: #181963;
				// border: 1px solid red;
				margin: 0 5px;
				border-radius: 3px;
				padding: 8px 8px;
			}

		}
	}
</style>