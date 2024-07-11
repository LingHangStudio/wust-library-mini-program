<template>
	<ListNavBar title="我的"></ListNavBar>
	<ListSkeleton v-if="loading" :loop="3" :row="4"></ListSkeleton>
	<view v-else class="">
		<uni-card padding="8px 4px">
			<view class="head">
				<img class="avatar" src="@/static/face1.png" alt="" />
				<view class="info">
					<view class="" style="">
						<span style="font-size: 1.2rem; padding: 3px; font-weight: bold">{{ userInfo.displayName }}</span>
						证件状态
						<uni-tag :type="userInfo.idStatusDesc === '有效' ? 'success' : 'warning'" :text="userInfo.idStatusDesc"
							circle></uni-tag>
					</view>
					<view>{{ userInfo.dept }}</view>
					<view><uni-icons type="phone"></uni-icons>{{ userInfo.mobile }}</view>
					<view class="">
						<uni-icons type="email">{{ userInfo.email }}</uni-icons>
					</view>
				</view>
			</view>

			<view class="overview">
				<view class="countItem">
					<view class="">
						{{ userInfo.credit }}
					</view>
					<view class=""> 我的积分 </view>
				</view>
				<view class="countItem" @tap="
						uni.navigateTo({
							url: '/page-center/mySubscribe?current=0',
						})
					">
					<view class="">
						{{ userInfo.currentLoanCount }}
					</view>
					<view class=""> 当前借阅 </view>
				</view>
				<view class="countItem" @tap="">
					<view>
						{{ userInfo.soonToExpireLoanCount }}
					</view>
					<view class=""> 即将到期 </view>
				</view>
				<view class="countItem" style="color: orangered">
					<view class="">
						{{ userInfo.fineAmount }}
					</view>
					<view class=""> 我的欠款 </view>
				</view>
			</view>
		</uni-card>
		<!-- 俩张图 -->
<!-- 		<qiun-data-charts type="line" canvas2d :opts="trendOpts" :chart-data="trendChart" />

		<view v-show="loan_type.length !== 0">
			<qiun-data-charts type="pie" canvas2d :opts="pieOpts" :chart-data="pieChart" />
		</view> -->
		<!-- 退出登录 -->
		<button class="button" type="warn" @tap="logoutTip.open">退出登录</button>
		<uni-popup ref="logoutTip" type="dialog" background-color="#fff">
			<uni-popup-dialog type="warn" cancel-text="关闭" confirm-text="退出" title="通知" content="是否退出登录？"
				@confirm="logout" @close="logoutTip.close()"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
	import { ref, Ref } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	// #ifndef APP-PLUS
	import { useStore } from "../store"
	// #endif
	// import { userInfoApi, typeListApi, trendListApi, statsApi } from "@/page-center/utils/huiwen/center"
	import { storeToRefs } from 'pinia'
	const loading = ref(true)
	const logoutTip = ref(null)
	// #ifndef APP-PLUS
	const store = useStore()
	// #endif
	// 画图的
	// const trendChart : Ref<any> = ref({})
	// const trendOpts = {
	// 	color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
	// 	padding: [15, 10, 0, 15],
	// 	enableScroll: false,
	// 	legend: {},
	// 	xAxis: {
	// 		disableGrid: true,
	// 	},
	// 	yAxis: {
	// 		gridType: "dash",
	// 		dashLength: 2,
	// 	},
	// 	extra: {
	// 		line: {
	// 			type: "straight",
	// 			width: 2,
	// 			activeType: "hollow",
	// 		},
	// 	},
	// }
	// const pieChart : Ref<any> = ref({})
	// const pieOpts = {
	// 	color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
	// 	padding: [5, 5, 5, 5],
	// 	enableScroll: false,
	// }
	const { userInfo } = storeToRefs(store);
	

	// const loan_range = ref({})
	// const getTrendChart = async () => {
	// 	const res = await trendListApi()
	// 	if (res) {
	// 		loan_range.value = res.data
	// 		trendChart.value = {
	// 			categories: Object.keys(loan_range.value).splice(-6),
	// 			series: [
	// 				{
	// 					name: "借阅量",
	// 					data: Object.values(loan_range.value).splice(-6),
	// 				},
	// 			],
	// 		}
	// 	}
	// }

	// // 借阅类型
	// const loan_type = ref([])
	// const getTypeChart = async () => {
	// 	const res = await typeListApi()
	// 	if (res) {
	// 		loan_type.value = res.data
	// 		// 需要 更换字段
	// 		pieChart.value = {
	// 			series: [
	// 				{
	// 					data: loan_type.value.map((item) => {
	// 						return { name: item.class, value: item.count }
	// 					}),
	// 				},
	// 			],
	// 		}
	// 	}
	// }



	onLoad(() => {
		// getTrendChart()
		// getTypeChart()
		loading.value = false
	})
//	退出登陆
	const logout = () => {
		// #ifndef APP-PLUS
		store.setloginState(false)
		// #endif
		uni.removeStorageSync('loginInfo')
		uni.reLaunch({
			url: "/pages/login/index"
		})
	}
</script>

<style scoped lang="scss">
	.head {
		display: flex;

		.avatar {
			width: 15vmin;
			height: 15vmin;
			padding: 10px;
		}

		.info {
			margin: 3px;
		}
	}

	.overview {
		display: flex;
		justify-content: center;
		margin: 6px;

		.countItem {
			border-right: 1px solid $theme-color;
			display: flex;
			padding: 0 5vw;
			flex-direction: column;
			text-align: center;
		}

		.countItem:last-child {
			border-right: 0px;
		}
	}

	.button {
		width: 90%;
		border-radius: 5px;
		text-align: center;
		margin: 30px auto 30px auto;
	}
</style>