<template>
	<view v-if="searchList.length===0" class="">
		<image src="../../static/urban-no-data-found-2.png"></image>
		<div>这里什么都没有..试试其他关键词</div>
	</view>
	<view v-else v-for="(item,index) in searchList" :key="index" class="item">
		<view class="photo">
			<view v-if="item.icon" class="">
				<img :src="item.icon" alt="">
			</view>
			<view v-else class="">
				<img class="img" src="http://116.62.61.65:8080/static/logo.png" alt="">
			</view>
		</view>
		<view class="main">
			<view class="name">
				{{item.title}}
			</view>
			<view class="tag">
				<uni-tag>{{item.docTypeDesc}}</uni-tag> {{item.callno[0]}}
			</view>
			<view class="publish">
				{{item.auchor}}/{{item.publisher}}/{{item.pub_year}}
			</view>
			<view class="info">
				{{item.abstract}}
			</view>
		</view>
		<view class="right">
			<view class="">
				可借{{item.itemCount}}
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	//search-list页面是搜索的结果列表
	import { ref } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	import { searchApi } from "@/api/huiwen/home.js"
	//从搜索页传参
	const searchInput = ref("")
	const choiceType = ref("all")
	// 当前页的所有信息，存储
	const searchList = ref([])
	const pagination = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0
	})

	const search = async () => {
		let value = searchInput.value
		searchInput.value = ""
		let data = {
			queryFieldList: [
				{
					logic: 0,
					field: choiceType.value,
					operator: "*",
					values: [value]
				}
			],
			sortType: "desc",
			sortField: "relevance",
			indexName: "idx.opac",
			collapseField: "groupId",
			filterFieldList: [],
			page: pagination.value.currentPage,
			pageSize: pagination.value.pageNum
		}
		const res = await searchApi(data);
		try {
			if (res) {
				console.log("search", res)
				let resData = res.data
				pagination.value = {
					currentPage: resData.offset,
					pageNum: resData.limit,
					total: resData.actualTotal
				}
				
				searchList.value=resData.dataList
			}
		} catch (err) {

		}
	}

	onLoad((e) => {
		console.log(e);
		if (e) {
			searchInput.value = e.keyword
			choiceType.value = e.choiceType
			search()
		}
	})
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 1px;
		// border-bottom: .4px solid lightgray;
		/*首先我们设置边框只显示右侧，宽度为2px的实线。*/
		border-bottom: 1px solid lightgray;
		/*设置线性渐变*/
		// border-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, $uni-theme-color 20%, rgba(255, 255, 255, 0) 99%) 10;

		.photo {
			margin: 5px;

			.img {
				border-radius: 50%;
				width: 50px;
				height: 50px;
			}
		}

		.main {
			width: 80vw;
			margin: 2px;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.name {
				font-size: 1.2rem;
				line-height: 1.2rem;
				padding: 2px 1px;
			}

			.tag {}

			.publish {}

			.info {
				color: grey;
				font-size: .8rem;
			}
		}

		.right {
			display: flex;
			justify-content: center;
			align-content: center;

			.button {
				margin: auto 0;
				width: 20vw;
				font-size: .5rem;
			}
		}
	}
</style>