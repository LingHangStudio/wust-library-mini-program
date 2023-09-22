<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
	</view>
	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<List v-else @getMore="getMyList(paginations.currentPage+1,paginations.pageNum)" :listLength="lists.length"
		:page="paginations.currentPage" :pageSize="paginations.pageNum">
		<template>
			<uni-card @tap="getInfo(index)" margin="8px" :title="item.title" v-for="(item,index) in lists"
				:key="item.bibId" class="item">
				<view>
					索书号：{{item.barCode}}</view>
				<view>借阅时间:{{item.loanDate}}</view>
				<view class="">
					归还时间:{{item.returnDate}}
				</view>
				<view class="">
					借阅地点:{{item.location}}
				</view>
			</uni-card>
		</template>
	</List>

	<uni-popup @change="hidePop" ref="popBook" background-color="#fff" type="bottom">
		<uni-card is-full :border="false" :title="currentBookInfo?.title">
			<view>索书号：{{currentBookInfo?.barCode}}</view>
			<view v-if="currentBookInfo?.bibAttrs">ISBN:{{currentBookInfo?.bibAttrs.isbn}}</view>
			<view>出版年:{{currentBookInfo?.bibAttrs.pub_year}}</view>
			<view class="">
				作者：{{currentBookInfo?.author}}
			</view>
			<view v-if="currentBookInfo?.bibAttrs" class="">
				出版社：{{currentBookInfo?.bibAttrs.publisher}}
			</view>
			<hr>
			<view>借阅时间:{{currentBookInfo?.loanDate}}</view>
			<view class="">
				归还时间:{{currentBookInfo?.returnDate}}
			</view>
			<view class="">
				借阅地点:{{currentBookInfo?.location}}
			</view>
		</uni-card>
	</uni-popup>
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref, Ref } from "vue"
	import { readListApi, histsListApi } from "@/page-center/utils/huiwen/center"
	import { paginationType } from "@/utils/types/list"
	const loading = ref(true)
	// 分栏信息
	const current = ref(0)
	const items = ref(['当前借阅', "借阅历史"])
	const onClickItem = (e : any) => {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex
			lists.value = []
			loading.value = true
			paginations.value = {
				currentPage: 1,
				pageNum: 10,
				total: 0
			}
			getMyList(1, 10)
		}
	}
	// 弹窗
	const popBook = ref(null)
	const currentBookInfo : Ref<any> = ref({
		"bibId": "",
		"bibAttrs": {
			"pub_year": "",
			"author": "",
			"callno": "",
			"isbn": "",
			classno: "",
			publisher: "",
			eisbn: "",
			title: ""
		},
		returnDate: "",
		attachment: null,
		author: "",
		loanDate: "",
		location: "",
		title: "",
		barCode: ""
	})
	const getInfo = (i : number) => {
		currentBookInfo.value = lists.value[i]
		popBook.value.open()
	}
	// 展示数据的弹窗
	const hidePop = (e) => {
		console.log(e)
		if (e.show) {

		} else {
			currentBookInfo.value = {
				bibId: "",
				bibAttrs: {
					"pub_year": "",
					"author": "",
					"callno": "",
					"isbn": "",
					"classno": "",
					"publisher": "",
					"eisbn": "",
					"title": ""
				},
				returnDate: "",
				attachment: null,
				author: "",
				loanDate: "",
				location: "",
				title: "",
				barCode: ""

			}
		}
	}

	// const user = uni.getStorageSync("user")
	const paginations : Ref<paginationType> = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0
	})
	const lists = ref([])
	const getMyList = async (page : number, pageSize : number) => {
		console.log("调用了，", page, pageSize, current.value)
		if (current.value === 0) {
			// 当前借阅
			const res = await readListApi(page, pageSize)
			console.log('list', res)
			if (res) {
				let temp = res.data
				lists.value = lists.value.concat(temp.items)
				paginations.value = {
					currentPage: temp.currentPage,
					pageNum: temp.pageSize,
					total: temp.total
				}
			}
		} else {
			// 历史借阅
			const res = await histsListApi(page, pageSize)
			console.log("hist", res)
			if (res) {
				let temp = res.data
				lists.value = lists.value.concat(temp.items)
				paginations.value = {
					currentPage: temp.currentPage,
					pageNum: temp.pageSize,
					total: temp.total
				}
			}
		}
	}
	onLoad((e) => {
		if (e?.current) {
			current.value = e.current
		}
	})

	getMyList(paginations.value.currentPage, paginations.value.pageNum)
</script>

<style scoped lang="scss">
	// .item {
	// 	margin: 3px 1px;
	// 	border-bottom: 1px solid black;
	// }
</style>