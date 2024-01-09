<template>
	<ListSkeleton v-if="loading" :rows="4" :loop="6"></ListSkeleton>
	<List v-else :list-length="searchList.length" :page="paginations.currentPage" :page-size="paginations.pageNum"
		@get-more="search(paginations.currentPage + 1, paginations.pageNum)">
		<uni-card v-for="item in searchList" :key="item.bibId" margin="8px" :extra="'可借' + item.itemCount"
			:title="item.title" @click="getDetails(item.bibId)">
			<view class="main">
				<view class="tag">
					<uni-tag :text="item.docTypeDesc" size="small" type="warning" circle inverted></uni-tag>
					{{ item.callno[0] }}
				</view>
				<view class="publish"> {{ item.author }}/{{ item.publisher }}/{{ item.pub_year }} </view>
				<template v-if="typeof item.abstract === 'string'">
					<view class="info">{{ item.abstract }}</view>
				</template>
			</view>
		</uni-card>
	</List>
</template>

<script setup lang="ts">
	//search-list页面是搜索的结果列表
	import { ref } from "vue"
	import { searchApi } from "@/api/huiwen/home"
	import { onLoad } from "@dcloudio/uni-app"
	import { ISearchReq } from "./utils/types"
	const loading = ref(true)
	//从搜索页传参
	const searchInput = ref("")
	const choiceType = ref("all")
	// 当前页的所有信息，存储
	const searchList = ref([])
	const paginations = ref({
		currentPage: 1,
		pageNum: 15,
		total: 0,
	})
	const search = async (currentPage : number, pageNum : number) => {
		let value = searchInput.value
		searchInput.value = ""
		let data = {
			queryFieldList: [
				{
					logic: 0,
					field: choiceType.value,
					operator: "*",
					values: [value],
				},
			],
			sortType: "desc",
			sortField: "relevance",
			indexName: "idx.opac",
			collapseField: "groupId",
			filterFieldList: [],
			page: currentPage,
			pageSize: pageNum,
		} as ISearchReq
		const res = await searchApi(data)
		try {
			if (res) {
				let resData = res.data
				paginations.value = {
					currentPage: resData.offset,
					pageNum: resData.limit,
					total: resData.actualTotal,
				}
				if (resData.dataList.length !== 0) {
					searchList.value = searchList.value.concat(resData.dataList)
				}
			}
		} catch (err) { }
		loading.value = false
	}

	const getDetails = (bibId : string) => {
		uni.navigateTo({
			url: "/page-home/detail?bibId=" + bibId,
		})
	}

	onLoad((e) => {
		if (e) {
			searchInput.value = e.keyword
			choiceType.value = e.choiceType
			search(paginations.value.currentPage, paginations.value.pageNum)
		}
	})
</script>

<style lang="scss" scoped>
	.info {
		color: grey;
		font-size: 0.8rem;
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