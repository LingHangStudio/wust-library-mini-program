<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
	</view>
	<List @getMore="getMyList" :listLength="lists.length" :page="paginations.currentPage"
		:pageSize="paginations.pageNum">
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
	import List from "@/components/list.vue"
	import { ref, Ref } from "vue"
	// import { readListApi } from "@/api/huiwen/center.ts"
	import { paginationType } from "@/utils/types/list"
	// 分栏信息
	const current = ref(0)
	const items = ref(['当前借阅', "借阅历史"])
	const onClickItem = (e : any) => {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex
			// lists.value = e.currentIndex == 0 ? loanList.value : histList.value
			lists.value = []
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
			"classno": "",
			"publisher": "",
			"eisbn": "",
			"title": ""
		},
		"returnDate": "",
		"attachment": null,
		author: "",
		"loanDate": "",
		"location": "",
		"title": "",
		barCode: ""
	})
	const getInfo = (i : number) => {
		currentBookInfo.value = lists.value[i]
		popBook.value.open()
	}
	const hidePop = (e) => {
		console.log(e)
		if (e.show) {

		} else {
			currentBookInfo.value = {
				"bibId": "",
				"bibAttrs": {
					"pub_year": "",
					"author": "",
					"callno": "",
					"isbn": "",
					"classno": "",
					"publisher": "",
					"eisbn": "",
					"title": ""
				},
				"returnDate": "",
				"attachment": null,
				author: "",
				"loanDate": "",
				"location": "",
				"title": "",
				barCode: ""

			}
		}
	}

	const user = uni.getStorageSync("user")
	const paginations : Ref<paginationType> = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0
	})
	const lists = ref([])
	const getMyList = (page : number, pageSize : number) => {
		console.log("调用了，", page, pageSize)

		if (current.value === 0) {
			// 当前借阅
			const res = true //await readListApi(page,pageSize)
			if (res) {
				lists.value = lists.value.concat([
					{
						"bibId": "mbd9d59c362259b18142035f7e9e3e458",
						"bibAttrs": {
							"pub_year": "2015",
							"author": "主编王莉",
							"callno": "O13-44/618",
							"isbn": "978-7-04-042592-5",
							"classno": "O13-44",
							"publisher": "高等教育出版社",
							"eisbn": "",
							"title": "考研数学基础过关500题:高教版"
						},
						"returnDate": "2023-02-25 18:35",
						"attachment": null,
						"author": "主编王莉",
						"loanDate": "2022-11-07 21:39",
						"location": "总馆-黄家湖借还处",
						"title": "考研数学基础过关500题:高教版",
						"barCode": "A1507454"
					},
				])
			}
		} else {
			// 历史借阅
			const res = true //await 
			if (res) {
				lists.value = lists.value.concat([
					{
						"bibId": "mbd9d59c362259b18142035f7e9e3e458",
						"bibAttrs": {
							"pub_year": "2015",
							"author": "主编王莉",
							"callno": "O13-44/618",
							"isbn": "978-7-04-042592-5",
							"classno": "O13-44",
							"publisher": "高等教育出版社",
							"eisbn": "",
							"title": "考研数学基础过关500题:高教版"
						},
						"returnDate": "2023-02-25 18:35",
						"attachment": null,
						"author": "主编王莉",
						"loanDate": "2022-11-07 21:39",
						"location": "总馆-黄家湖借还处",
						"title": "考研数学基础过关500题:高教版",
						"barCode": "A1507454"
					},
				])
			}
		}
	}
	getMyList(paginations.value.currentPage, paginations.value.pageNum)
</script>

<style scoped lang="scss">
	// .item {
	// 	margin: 3px 1px;
	// 	border-bottom: 1px solid black;
	// }
</style>