<template>
	<view v-if="searchList.length===0" class="">
		<image src="@/static/urban-no-data-found-2.png"></image>
		<div>这里什么都没有..试试其他关键词</div>
	</view>
	<scroll-view :lower-threshold="100" scroll-y
		@scrolltolower="search({currentPage:paginations.currentPage+1,pageNum:paginations.pageNum})" v-else>
		<view class="item" @click="getDetails(item.bibId)" v-for="(item,index) in searchList" :key="index">
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
					<uni-tag :text="item.docTypeDesc" size="small" type="warning" circle inverted></uni-tag>
					{{item.callno[0]}}
				</view>
				<view class="publish">
					{{item.author}}/{{item.publisher}}/{{item.pub_year}}
				</view>
				<view v-show="item.abstract!=[]" class="info">
					{{item.abstract}}
				</view>
			</view>
			<view class="right">
				可借{{item.itemCount}}
			</view>
		</view>
	</scroll-view>
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
	const paginations = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0
	})

	const search = async (pagination) => {
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
			page: pagination.currentPage,
			pageSize: pagination.pageNum
		}
		const res = await searchApi(data);
		try {
			if (res) {
				console.log("search", res)
				let resData = res.data
				paginations.value = {
					currentPage: resData.offset,
					pageNum: resData.limit,
					total: resData.actualTotal
				}
				searchList.value = resData.dataList
			}
		} catch (err) {

		}
	}

	const getDetails = (bibId) => {
		uni.navigateTo({
			url: "/page-home/detail?bibId=" + bibId
		})
	}

	onLoad((e) => {
		if (e) {
			searchInput.value = e.keyword
			choiceType.value = e.choiceType
			search(paginations.value)
		}
	})
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 1px;
		border-bottom: 1px solid lightgray;

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
				font-weight: bold;
				line-height: 1.2rem;
				padding: 2px 1px;
			}

			.tag {
				padding: 1px;
			}

			.publish {}

			.info {
				color: grey;
				font-size: .8rem;
			}
		}

		.right {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
		}
	}
</style>