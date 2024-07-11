<template>
	<view>
		<uni-segmented-control style-type="text" :current="controlCurrent" active-color="#142d88" :values="controlItems"
			@click-item="onClickItem" />
	</view>
	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<List v-else :list-length="lists.length" :page="paginations.currentPage" :page-size="paginations.pageNum"
		empty-info="立学以读书为本" @get-more="getMyList(loginInfo.userName, 0,paginations.currentPage + 1, paginations.pageNum)">
		<view v-show="false" class="tag">
			<uni-tag type="theme" circle inverted text="导出海报" @tap="showShare = true"></uni-tag>
		</view>
		<uni-card v-for="(item, index) in lists" :key="item?.callNo" margin="8px" class="item" @tap="getInfo(index)">
			<template #title>
				<view class="card-header">
					<view class="card-header-content">
						<text class="card-header-content-title">{{item?.title}}</text>
					</view>
					<view class="card-header-extra">
						<uni-icons type="more-filled" size="24" color="#142d88"></uni-icons>
					</view>
				</view>
			</template>
			<view v-show="item?.callNo">索书号：{{ item?.callNo}}</view>
			<view>借阅时间:{{ item?.loanDate }}</view>
			<view v-show="item?.dueDate" class="">应还时间:{{ item?.dueDate }} </view>
			<view v-show="item?.returnDate" class="">归还时间:{{ item?.returnDate }} </view>
			<view v-show="item?.location" class="">借阅地点:{{ item?.location }} </view>
			<view v-show="controlCurrent!==HIST_NO">
				<uni-tag v-show="item?.isOverdue" type="error">已超期</uni-tag>
			</view>
		</uni-card>
	</List>
	<uni-popup ref="popBook" background-color="#fff" type="bottom" @change="hidePop">
		<uni-card v-if="controlCurrent!==OVERDUE_NO" is-full :border="false">
			<template #title>
				<view class="card-header">
					<view class="card-header-content">
						<text class="card-header-content-title">{{currentBookInfo?.title}}</text>
					</view>
					<view class="card-header-extra lightHight" @tap="reNewOpera(currentBookInfo?.barCode)">
						续借
					</view>
				</view>
			</template>
			<view>条码号：{{ currentBookInfo.barCode }}</view>
			<view>
				索书号：
				<span class="lightHight" 
					@tap="copyNo(currentBookInfo?.callNo)">{{ currentBookInfo?.callNo }}</span>
			</view>
			<view>ISBN:{{ currentBookInfo?.isbn  }}</view>
			<view>出版年:{{ currentBookInfo?.pubYear }}</view>
			<view class=""> 作者：{{ currentBookInfo?.author }} </view>
			<view class=""> 出版社：{{ currentBookInfo?.publisher }} </view>
			<view>借阅时间:{{ currentBookInfo?.loanDate }}</view>
			<view v-show="currentBookInfo?.dueDate" class="">应还时间:{{ currentBookInfo?.dueDate }} </view>
			<view v-show="currentBookInfo?.returnDate" class="">归还时间:{{ currentBookInfo?.returnDate }} </view>
			<view class=""> 借阅地点:{{ currentBookInfo?.locaCodeDesc }} </view>
		</uni-card>

		<uni-card v-else is-full :border=" false" :title="currentBookInfo?.item.bibAttrs.title">
			<template #title>
				<view class="card-header">
					<view class="card-header-content">
						<text class="card-header-content-title">{{currentBookInfo?.item.bibAttrs.title}}</text>
					</view>
					<view class="card-header-extra lightHight" @tap="reNewOpera(currentBookInfo?.barCode)">
						续借
					</view>
				</view>
			</template>

			<view>条码号：{{ currentBookInfo?.barCode }}</view>
			<view @tap="copyNo(currentBookInfo?.callNo)">
				索书号：
				<span class="lightHight">
					{{ currentBookInfo?.callNo }}
				</span>
			</view>
			<view>ISBN:{{ currentBookInfo?.isbn }}</view>
			<view>出版年:{{ currentBookInfo?.pubYear }}</view>
			<view class=""> 作者：{{ currentBookInfo?.author }} </view>
			<view class=""> 出版社：{{ currentBookInfo?.publisher }} </view>
			<view>借阅时间:{{ currentBookInfo?.loanDate }}</view>
			<view v-show="currentBookInfo?.dueDate" class="">应还时间:{{ currentBookInfo?.dueDate }} </view>
			<view v-show="currentBookInfo?.returnDate" class="">归还时间:{{ currentBookInfo?.returnDate }} </view>
		</uni-card>
	</uni-popup>

	<!-- 续借的弹窗提示 -->
	<uni-popup ref="renewMsgNode" type="message">
		<uni-popup-message :type="renewMsg.type" :message="renewMsg.content" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="messagess" type="message">
		<uni-popup-message type="error" message="还未登陆,请检查登录在进入改页面喔" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref, Ref } from "vue"
	import { paginationType } from "@/utils/types/list"
	import { bookInfoType } from "./utils/types.d"
	import { getHistoryList, getOverDueList, getReadList, reNewBook } from "../api/huiwen/center"
	//获取用户信息
	const loginInfo = uni.getStorageSync("loginInfo")
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

	const paginations : Ref<paginationType> = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0,
	})

	const getMyList = async (id : string, type : number, currentPage : number, pageSize : number) => {
		if (controlCurrent.value === LOAN_NO) {
			// 当前借阅
			const res = await getReadList({ id, type })
			if (res) {
				lists.value = res.data
			}
		} else if (controlCurrent.value === OVERDUE_NO) {
			// 即将到期
			const res = await getOverDueList({ id, type, beforeDays: 7 })
			if (res) {
				lists.value = res.data
			}
		} else {
			// 历史借阅
			const res = await getHistoryList({ id, type, currentPage, pageSize })
			if (res) {
				lists.value = res.data.items;
				paginations.value = {
					currentPage: res.data.currentPage,
					pageNum: res.data.pageSize,
					total: res.data.total,
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
			getMyList(loginInfo.userName, 0, 1, 10)
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

	const reNewOpera = async (barCode : string) => {
		if (barCode) {
			const res = await reNewBook({barCode})
			if (res && res?.code === 0) {
				lists.value = []
				// 成功，并刷新页面
				renewMsg.value = {
					content: res?.msg || "续借成功",
					type: "success"
				}
				getMyList(loginInfo.userName, 0, paginations.value.currentPage, paginations.value.pageNum)
			} else {
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
	const messagess = ref(null)
	onLoad((e) => {
		messagess.value.open();
		e?.current && (controlCurrent.value = e.current)
	})
	getMyList(loginInfo.userName,0,paginations.value.currentPage, paginations.value.pageNum)
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