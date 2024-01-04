<template>
	<view>
		<uni-segmented-control style-type="text" :current="controlCurrent" active-color="#142d88" :values="controlItems"
			@click-item="onClickItem" />
	</view>
	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<List v-else :list-length="lists.length" :page="paginations.currentPage" :page-size="paginations.pageNum"
		empty-info="立学以读书为本" @get-more="getMyList(paginations.currentPage + 1, paginations.pageNum)">
		<view v-show="false" class="tag">
			<uni-tag type="theme" circle inverted text="导出海报" @tap="showShare = true"></uni-tag>
		</view>
		<uni-card v-for="(item, index) in lists" :key="item?.bibId" extra="···" margin="8px"
			:title="item?.title || item?.item.bibAttrs.title" class="item" @tap="getInfo(index)">
			<view v-if="item?.item">索书号：{{ item?.item.callNo}}</view>
			<view v-else>索书号：{{ item?.bibAttrs.callno}}</view>
			<view>借阅时间:{{ item?.loanDate }}</view>
			<view v-show="item?.dueDate" class="">应还时间:{{ item?.dueDate }} </view>
			<view v-show="item?.returnDate" class="">归还时间:{{ item?.returnDate }} </view>
			<view v-show="item?.location" class="">借阅地点:{{ item?.location }} </view>
			<view v-show="controlCurrent!==HIST_NO">
				<uni-tag v-show="item?.isOverdue" type="error">已超期</uni-tag>
				<!-- <uni-tag v-show="!item?.isOverdue" type="success">未超期</uni-tag> -->
			</view>
		</uni-card>
	</List>
	<uni-popup ref="popBook" background-color="#fff" type="bottom" @change="hidePop">
		<uni-card v-if="controlCurrent!==OVERDUE_NO" is-full :border="false" :title="currentBookInfo?.title">
			<view v-if="currentBookInfo?.item">条码号：{{ currentBookInfo?.item.barCode }}</view>
			<view v-else>条码号：{{ currentBookInfo?.barCode }}</view>
			<view>
				索书号：
				<span class="lightHight" v-if="currentBookInfo?.item"
					@tap="copyNo(currentBookInfo?.item.callNo)">{{ currentBookInfo?.item.callNo }}</span>
				<span v-else class="lightHight"
					@tap="copyNo(currentBookInfo?.bibAttrs.callno)">{{ currentBookInfo?.bibAttrs.callno }}</span>
			</view>
			<view>ISBN:{{ currentBookInfo?.bibAttrs.isbn  }}</view>
			<view>出版年:{{ currentBookInfo?.bibAttrs.pub_year }}</view>
			<view class=""> 作者：{{ currentBookInfo?.author }} </view>
			<view class=""> 出版社：{{ currentBookInfo?.bibAttrs.publisher }} </view>
			<hr />
			<view>借阅时间:{{ currentBookInfo?.loanDate }}</view>
			<view v-show="currentBookInfo?.dueDate" class="">应还时间:{{ currentBookInfo?.dueDate }} </view>
			<view v-show="currentBookInfo?.returnDate" class="">归还时间:{{ currentBookInfo?.returnDate }} </view>
			<view class=""> 借阅地点:{{ currentBookInfo?.location }} </view>
			<view v-show="controlCurrent !== HIST_NO">
				<uni-tag v-show="currentBookInfo?.isOverdue" type="error">已超期</uni-tag>
				<!-- <uni-tag v-show="!item?.isOverdue" type="success">未超期</uni-tag> -->
				<span class="lightHight" @tap="reNewOpera(currentBookInfo?.loanId)">续借</span>
			</view>
		</uni-card>

		<uni-card v-else is-full :border="false" :title="currentBookInfo?.item.bibAttrs.title">
			<view>条码号：{{ currentBookInfo?.item.barCode }}</view>
			<view @tap="copyNo(currentBookInfo?.item.callNo)">
				索书号：
				<span class="lightHight">
					{{ currentBookInfo?.item.callNo }}
				</span>
			</view>
			<view>ISBN:{{ currentBookInfo?.item.bibAttrs.isbn }}</view>
			<view>出版年:{{ currentBookInfo?.item.bibAttrs.pub_year }}</view>
			<view class=""> 作者：{{ currentBookInfo?.item.bibAttrs.author }} </view>
			<view class=""> 出版社：{{ currentBookInfo?.item.bibAttrs.publisher }} </view>
			<hr />
			<view>借阅时间:{{ currentBookInfo?.loanDate }}</view>
			<view v-show="currentBookInfo?.dueDate" class="">应还时间:{{ currentBookInfo?.dueDate }} </view>
			<view v-show="currentBookInfo?.returnDate" class="">归还时间:{{ currentBookInfo?.returnDate }} </view>
			<!-- <view class=""> 归还时间:{{ currentBookInfo?.dueDate || currentBookInfo?.returnDate }} </view> -->
			<!-- <view class=""> 借阅地点:{{ currentBookInfo?.location }} </view> -->
			<view v-show="controlCurrent !== HIST_NO">
				<uni-tag v-show="currentBookInfo?.isOverdue" type="error">已超期</uni-tag>
				<!-- <uni-tag v-show="!item?.isOverdue" type="success">未超期</uni-tag> -->
				<span class="lightHight" @tap="reNewOpera(currentBookInfo?.loanId)">续借</span>
			</view>
		</uni-card>
	</uni-popup>

	<!-- 续借的弹窗提示 -->
	<uni-popup ref="renewMsgNode" type="message">
		<uni-popup-message :type="renewMsg.type" :message="renewMsg.content" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref, Ref } from "vue"
	import { readListApi, histsListApi, overDueListApi, renewApi } from "@/page-center/utils/huiwen/center"
	import { paginationType } from "@/utils/types/list"
	import { bookInfoType } from "./utils/types.d.ts"
	const loading = ref(true)
	const showShare = ref(false)

	const lists = ref([])

	// 定义常量:用在选择栏中
	const LOAN_NO = 0
	const OVERDUE_NO = 1
	const HIST_NO = 2

	// 续借提醒的节点
	const renewMsgNode = ref(null)
	const renewMsg = ref({
		content: "续借成功",
		type: "success"
	})

	// const user = uni.getStorageSync("user")
	const paginations : Ref<paginationType> = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0,
	})

	const getMyList = async (page : number, pageSize : number) => {
		if (controlCurrent.value === LOAN_NO) {
			// 当前借阅
			const res = await readListApi(page, pageSize)
			if (res) {
				let temp = res.data
				lists.value = lists.value.concat(temp.items)
				paginations.value = {
					currentPage: temp.currentPage,
					pageNum: temp.pageSize,
					total: temp.total,
				}
			}
		} else if (controlCurrent.value === OVERDUE_NO) {
			// 即将到期
			const res = await overDueListApi()
			if (res) {

				let temp = res.data
				lists.value = lists.value.concat(temp)
				// paginations.value = {
				// 	currentPage: temp.currentPage,
				// 	pageNum: temp.pageSize,
				// 	total: temp.total,
				// }
			}
		} else {
			// 历史借阅
			const res = await histsListApi(page, pageSize)
			if (res) {
				let temp = res.data
				lists.value = lists.value.concat(temp.items)
				paginations.value = {
					currentPage: temp.currentPage,
					pageNum: temp.pageSize,
					total: temp.total,
				}
			}
		}
		loading.value = false
	}

	// 分栏信息
	const controlCurrent = ref(0)
	const controlItems = ref(["当前借阅", "即将到期", "借阅历史"])
	const onClickItem = (e : any) => {
		if (controlCurrent.value != e.currentIndex) {
			controlCurrent.value = e.currentIndex
			// 切换列表时，清空内容
			lists.value = []
			loading.value = true
			paginations.value = {
				currentPage: 1,
				pageNum: 10,
				total: 0,
			}
			getMyList(1, 10)
		}
	}
	// 弹窗
	const popBook = ref(null)
	const currentBookInfo : Ref<bookInfoType> = ref({
		bibId: "",
		bibAttrs: {
			pub_year: "",
			author: "",
			callNo: "",
			isbn: "",
			classno: "",
			callno: "",
			publisher: "",
			eisbn: "",
			title: "",
		},
		item: {
			barCode: "",
			callNo: "",
			isbn: "",
			pub_year: "",
			bibAttrs: {
				barCode: "",
				callNo: "",
				isbn: "",
				pub_year: ""
			}
		},
		returnDate: "",
		isOverdue: 0,
		dueDate: "",
		attachment: null,
		author: "",
		loanDate: "",
		loanId: "",
		location: "",
		title: "",
		barCode: "",
	})

	// 获取书籍详情
	const getInfo = (i : number) => {
		currentBookInfo.value = lists.value[i]
		popBook.value.open()
	}
	// 展示数据的弹窗
	const hidePop = (e) => {
		if (!e.show) {
			currentBookInfo.value = {
				bibId: "",
				bibAttrs: {
					pub_year: "",
					author: "",
					callNo: "",
					isbn: "",
					classNo: "",
					publisher: "",
					eisbn: "",
					title: "",
				},
				item: {
					bibAttrs: {
						pub_year: "",
						author: "",
						callNo: "",
						isbn: "",
						classNo: "",
						publisher: "",
						eisbn: "",
						title: "",
					},
				},
				returnDate: "",
				dueDate: "",
				attachment: null,
				author: "",
				loanDate: "",
				loanId: "",
				location: "",
				title: "",
				barCode: "",
			}
		}
	}

	const reNewOpera = async (loanId : string) => {
		if (loanId) {
			const res = await renewApi(loanId)
			console.log("res inner", res)
			if (res && res?.code === 0) {
				lists.value = []
				// 成功，并刷新页面
				renewMsg.value = {
					content: res?.msg || "续借成功",
					type: "success"
				}
				getMyList(paginations.value.currentPage, paginations.value.pageNum)
				// uni.showToast({
				// 	title: "",
				// 	icon: "error"
				// })
			} else {
				// 失败
				renewMsg.value = {
					content: res?.msg || "续借失败",
					type: "error"
				}
			}
			renewMsgNode.value.open()
		}
	}

	// 复制索书号
	const copyNo = (c : string) => {
		uni.setClipboardData({
			data: c,
		})
	}

	onLoad((e) => e?.current && (controlCurrent.value = e.current))

	getMyList(paginations.value.currentPage, paginations.value.pageNum)
</script>

<style scoped lang="scss">
	// .item {
	// 	margin: 3px 1px;
	// 	border-bottom: 1px solid black;
	// }

	.tag {
		margin: 15px 10px;
	}

	.lightHight {
		color: $theme-color;
	}
</style>