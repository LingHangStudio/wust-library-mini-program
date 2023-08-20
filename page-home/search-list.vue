<template>
	<view v-if="searchList.length===0" class="">
		<Empty></Empty>
	</view>
	<scroll-view :scroll-top="myScroll" scroll-with-animation style="height: 100vh" scroll-y :upper-threshold="30"
		:lower-threshold="30" enable-back-to-top @scroll="isShowArrow"
		@scrolltolower="search({currentPage:paginations.currentPage+1,pageNum:paginations.pageNum})" v-else>
		<view class="">
			<uni-card margin="5px" :extra="'可借'+item.itemCount" :title="item.title" @click="getDetails(item.bibId)"
				v-for="(item,index) in searchList" :key="index">
				<view class="main">
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
			</uni-card>
		</view>
		<view style="text-align: center;padding: 3px;">到底啦！</view>
	</scroll-view>

	<view @tap="toTop" v-show="topArrow" class="top">
		<uni-icons color="#142d88" type="top" size="30px"></uni-icons>
	</view>
</template>

<script setup lang="ts">
	//search-list页面是搜索的结果列表
	import Empty from "@/components/Empty.vue"
	import { ref, nextTick } from "vue"
	import { searchApi } from "@/api/huiwen/home.js"
	import { onLoad } from "@dcloudio/uni-app"
	// 滚动条位置
	const myScroll = ref(0)
	const oldScrollTop = ref(0)
	//从搜索页传参
	const searchInput = ref("")
	const choiceType = ref("all")
	// 当前页的所有信息，存储
	const searchList = ref([])
	const paginations = ref({
		currentPage: 1,
		pageNum: 15,
		total: 0
	})
	const topArrow = ref(false)
	const search = async (pagination) => {
		console.log("search api")
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
				if (resData.dataList.length === 0) {

				} else {
					searchList.value = searchList.value.concat(resData.dataList)
				}
			}
		} catch (err) {
		}
	}

	const getDetails = (bibId) => {
		uni.navigateTo({
			url: "/page-home/detail?bibId=" + bibId
		})
	}

	const isShowArrow = (e) => {
		oldScrollTop.value = e.detail.scrollTop
		if (e.detail.scrollTop != 0) topArrow.value = true
		else topArrow.value = false
	}

	const toTop = () => {
		myScroll.value = oldScrollTop.value
		nextTick(() => {
			myScroll.value = 0
		})
		topArrow.value = false
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
	// .item {
	// 	display: flex;
	// 	flex-direction: row;
	// 	justify-content: space-between;
	// 	margin: 1px;
	// 	margin-top: 5px;

	// 	.main {
	// 		width: 80vw;
	// 		margin: 2px;
	// 		display: flex;
	// 		flex-direction: column;
	// 		justify-content: center;

	// 		.name {
	// 			font-size: 1.2rem;
	// 			font-weight: bold;
	// 			line-height: 1.2rem;
	// 			padding: 2px 1px;
	// 		}

	// 		.tag {
	// 			padding: 1px;
	// 		}

	// 	}

	// 	.right {
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		text-align: center;
	// 	}
	// }

	.top {
		position: fixed;
		bottom: 40px;
		right: 15px;
		border-radius: 50%;
		border: 1px solid $theme-color;
		padding: 3px;
		background-color: #fff;
	}

	.info {
		color: grey;
		font-size: .8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*行数*/
		-webkit-box-orient: vertical;
		display: -moz-box;
		-moz-line-clamp: 2;
		-moz-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-all;
		white-space: normal;
	}
</style>