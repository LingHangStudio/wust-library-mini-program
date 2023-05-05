<template>
	<view class="search">
		<view class="select">
			<uni-data-select @change="isShowNext" :clear="false" placeholder="馆藏目录" v-model="choiceType"
				:localdata="searchType"></uni-data-select>
		</view>
		<view v-show="isShow" class="select">
			<uni-data-select :clear="false" placeholder="馆藏目录" v-model="choiceType"
				:localdata="searchType[0].array"></uni-data-select>
		</view>
		<view class="value">
			<uni-search-bar @confirm="search" v-model="searchValue" placeholder="搜索书名,作者,分类,ISBN" :radius="100"
				:clearButton="false" :cancelButton="false"></uni-search-bar>
		</view>
	</view>

	<uni-card class="recommend" title="热门检索" margin="0px"
		thumbnail="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
		<view class="">
			<view v-for="(item, index) in collectionHotWord" :key="index" @click="searchHot(item)">
				{{ item }}
			</view>
		</view>

	</uni-card>
	<uni-card title="大家都在看" class="hot" margin="0px"
		thumbnail="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
		<view class="hotBox">
		</view>
	</uni-card>
</template>

<script setup lang="ts">
	import { reactive, ref } from "vue"
	const searchValue = ref("")
	//馆藏目录：热门检索
	let collectionHotWord = reactive([])
	let searchType = reactive([
		{
			value: 0,
			text: "馆藏目录",
			array: [
				{
					value: 0,
					text: "题名",
				}, {
					value: 1,
					text: "作者",
				}, {
					value: 2,
					text: "主题",
				}, {
					value: 3,
					text: "刊名",
				},
			]
		}, {
			value: 1,
			text: "数据库"
		}, {
			value: 2,
			text: "站内检索"
		},
	])
	const choiceType = ref(0)
	const isShow = ref(true)
	const search = () => {
		console.log(choiceType);
		if (choiceType.value == searchType[2].value) {
			//站内检索
			uni.navigateTo({
				url: "/pages/service/list?keyword=" + searchValue.value
			})
		} else {
			//馆藏目录,数据库
			uni.navigateTo({
				url: "/pages/web-view?keyword=" + searchValue.value + "&strSearchType=" + choiceType.value
			})
		}
	}

	const isShowNext = (e) => {
		//如果是馆藏目录，就显示二级分类
		if (e == 0) {
			isShow.value = true
		} else {
			isShow.value = false
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
		collectionHotWord.push(item.title)
	})
	const searchHot = (item) => {

	}
</script>

<style scoped lang="scss">
	.search {
		display: flex;
		flex-direction: row;

		.select {}

		.value {}

	}
</style>