<template>
	<uni-card padding="8px 4px">
		<view class="head">
			<img class="avatar" src="@/static/face1.png" alt="">
			<view class="info">
				<view class="" style="">
					<span style="font-size: 1.2rem;padding: 3px; font-weight: bold;">{{info.displayName}}</span>
					证件状态
					<uni-tag :text="info.idStatusDesc" circle></uni-tag>
				</view>
				<view>{{info.dept}}</view>
				<view><uni-icons type="phone"></uni-icons>{{info.mobile}}</view>
				<view class="">
					<uni-icons type="email">{{info.email}}</uni-icons>
				</view>
			</view>
		</view>

		<view class="overview">
			<view class="countItem">
				<view class="">
					{{stats.loanCount}}
				</view>
				<view class="">
					当前借阅
				</view>
			</view>
			<view class="countItem">
				<view>
					{{stats.expireCount}}
				</view>
				<view class="">
					即将到期
				</view>
			</view>
			<view class="countItem">
				<view class="">
					{{stats.booklistCount}}
				</view>
				<view class="">
					我的书单
				</view>
			</view>
		</view>
	</uni-card>

	<qiun-data-charts type="line" :opts="trendOpts" :chartData="trendChart" />

	<qiun-data-charts type="pie" :opts="pieOpts" :chartData="pieChart" />

</template>

<script setup lang="ts">
	import { ref, Ref } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	// import { typeListApi, trendListApi } from "@/api/huiwen/center.ts"
	// 画图的
	const trendChart : Ref<any> = ref({})
	const trendOpts = {
		color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
		padding: [15, 10, 0, 15],
		enableScroll: false,
		legend: {},
		xAxis: {
			disableGrid: true
		},
		yAxis: {
			gridType: "dash",
			dashLength: 2
		},
		extra: {
			line: {
				type: "straight",
				width: 2,
				activeType: "hollow"
			}
		}
	}
	const pieChart : Ref<any> = ref({})
	const pieOpts = {
		color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
		padding: [5, 5, 5, 5],
		enableScroll: false,

		extra: {
			pie: {
				// activeOpacity: 0.5,
				// activeRadius: 10,
				// offsetAngle: 0,
				// labelWidth: 15,
				// border: false,
				// borderWidth: 3,
				// borderColor: "#FFFFFF"
			}
		}
	}

	const info = ref({
		uid: 169272,
		instId: 1,
		userId: "202113407294",
		password: "",
		salt: "",
		idCard: null,
		"idCode": "202113407294",
		"idActivationDate": "2021-09-20",
		"idExpireDate": "2025-07-01",
		"idStatus": 0,
		"idStatusDesc": "有效",
		"idUpdatedBy": null,
		"idUpdatedDate": null,
		"firstName": null,
		"middleName": null,
		"lastName": null,
		"displayName": "唐*泉",
		"preferredLanguage": null,
		"preferredLanguageDesc": null,
		"gender": 0,
		"genderDesc": "男",
		"birthday": "2001-12-22",
		"nation": null,
		"dept": "计算机科学与技术学院",
		"occupation": "计算机科学与技术",
		"duty": null,
		"jobPost": null,
		"education": "本科",
		"address": "计算机科学与技术2021级5班",
		"phone": null,
		"email": null,
		"mobile": "183****3606",
		"userType": "user.patron",
		"userGroup": "user.grp.00",
		"userGroupDesc": "本科生",
		"jobCatalogDesc": null,
		"jobCatalog": null,
		"jobGroupDesc": null,
		"jobGroup": null,
		"department": "计算机科学与技术学院",
		"grade": "2021",
		"isRoot": 0,
		"isCheckedEmail": 0,
		"isLoginRestrict": 0,
		"isLoginRestrictDesc": null,
		"regDate": "2021-09-13 00:00:00",
		"logoutDate": null,
		"expireDate": "2025-07-01",
		"isNeedEditpwd": 0,
		"isNeedEditpwdDesc": null,
		"isLoginLimit": 0,
		"isLoginLimitDesc": null,
		"isIpopen": 0,
		"obligate": 0,
		"deposit": 0,
		"serviceCharge": 0,
		"voucher": 0,
		"credit": 59,
		"userStatus": 0,
		"userClass": "计算机科学与技术2021级5班",
		"userCountry": null,
		"userStatusDesc": "有效",
		"catalogLevel": 0,
		"loginLimitTime": null,
		"libCode": "00000",
		"libPath": "000/00000/",
		"loginNum": 0,
		"note": null,
		"lastLoginTime": null,
		"statusUpdatedBy": null,
		"statusUpdatedDate": null,
		"createdBy": null,
		"createdDate": "2021-09-13 00:00:00",
		"updatedBy": "shuzihua",
		"updatedDate": "2023-08-06 00:12:07",
		"userRoles": null,
		"userIdentifiers": null,
		"userExinfos": null,
		"photoName": null,
		"loanedCount": 0,
		"maxLoanCount": 0,
		"userTypeDesc": null,
		"catalogLevelDesc": null,
		"libCodeDesc": "总馆",
		"userOperations": null,
		"userTypes": null,
		"userTypesDesc": null,
		"userLocations": null
	})

	// 借阅概览
	const stats = ref({
		booklistCount: 0,// 我的书单
		requestCount: 0,//我的请求
		fineSum: 0,// 我的欠款
		expireCount: 0,// 即将到期
		deptRange: 100, //×
		loanCount: 0,// 当前借阅
		range: 1000 // ×
	})

	// 借阅时间分布
	const loan_range = ref()
	const getTrendChart = () => {
		const res = true //await trendListApi()
		if (res) {
			loan_range.value = {
				"2022-10": 1,
				"2022-11": 2,
				"2022-12": 0,
				"2023-01": 0,
				"2023-02": 10,
				"2023-03": 0,
				"2023-04": 11,
				"2023-05": 0,
				"2023-06": 5,
				"2023-07": 9,
				"2023-08": 0,
				"2023-09": 8
			}
			trendChart.value = {
				// categories: Object.keys(trendArr.data).splice(-6),
				categories: Object.keys(loan_range.value).splice(-6),
				series: [{
					name: '借阅量',
					// data: Object.values(trendArr.data).splice(-6),
					data: Object.values(loan_range.value).splice(-6),
				}],
			}
		}

	}

	// 借阅类型
	const loan_type = ref()
	const getTypeChart = () => {
		const res = true //await typeListApi()
		if (res) {
			loan_type.value = [
				{
					"count": 2,
					"class": "数理科学与化学"
				},
				{
					"count": 1,
					"class": "工业技术"
				}
			]

			// 需要 更换字段	
			pieChart.value = {
				series: [{
					data: loan_type.value.map(item => {
						return { name: item.class, value: item.count }
					})
				}],
			}
		}
	}

	onLoad(() => {
		getTrendChart()
		getTypeChart()
	})
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
		margin: 10px;

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
</style>