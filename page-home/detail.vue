<template>
	<ListNavBar title="书籍详情"></ListNavBar>
	<uni-card :title="baseInfo?.title" margin="5px" is-shadow :extra="extraInfo._clickCount + '浏览'">
		<view class="box-head">
			<view v-for="(val, key, index) in detailInfo" :key="index" class="info">
				<div class="tr">
					<div class="left-style">{{ key }}</div>
					:
					<div class="right-style"><span class="" v-html="val"></span></div>
				</div>
			</view>
		</view>
	</uni-card>
	<uni-collapse>
		<uni-collapse-item v-if="!holdError" open title-type title="馆藏查询" show-animation>
			<view class="">
				<uni-table>
					<uni-tr>
						<uni-th align="center">索书号</uni-th>
						<uni-th align="center">所属馆藏</uni-th>
						<uni-th align="center">书刊状态</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in holdingInfo" :key="index">
						<uni-td>{{ item.callNo }}</uni-td>
						<uni-td>{{ item.location }}</uni-td>
						<uni-td>{{ item.status }}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</uni-collapse-item>
		<uni-collapse-item v-if="otherInfo.content" title="书目简介" title-type open show-animation>
			<uni-card is-shadow>
				<view class="box-content" v-html="otherInfo.content"> </view>
			</uni-card>
		</uni-collapse-item>
		<uni-collapse-item v-if="otherInfo.authorInfo" title="作者" title-type open show-animation>
			<uni-card is-shadow>
				<view class="box-author" v-html="otherInfo.authorInfo"> </view>
			</uni-card>
		</uni-collapse-item>

		<uni-collapse-item v-if="otherInfo.catalog" title="目录" title-type show-animation>
			<uni-card margin="1px" padding="5px" is-shadow>
				<view class="box-catalog" v-html="otherInfo.catalog"> </view>
			</uni-card>
		</uni-collapse-item>
	</uni-collapse>

	<qiun-data-charts :ontouch="true" type="line" :chart-data="trendChart" />
</template>

<script setup lang="ts">
	// 书籍详情的接口：
	// infos 获取baseInfo，放在顶部
	// info 获取详细信息，放在下面：章节信息，作者简介，书目简介，封面
	// trend 获取图表
	// holdings 获取馆藏信息
	import { ref, Ref } from "vue"
	import { deatileApi, deatileExtApi, deatileTrendApi, deatileHoldingApi } from "@/api/huiwen/home"
	import { onLoad, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
	import type { baseInfoType, extraInfoType, otherInfoType } from "@/page-home/utils/types.d"

	const bookBibId = ref("")

	// infos接口的内容
	const baseInfo : Ref<baseInfoType> = ref({
		author: "",
		docType: "",
		isbn: "",
		title: "",
	})
	const detailInfo : Ref<any> = ref({})
	const extraInfo : Ref<extraInfoType> = ref({})

	// info接口下的内容
	const otherInfo : Ref<otherInfoType> = ref({
		catalog: "",
		content: "",
		imageUrl: "",
		authorInfo: ""
	}) //
	// 馆藏分布内容
	const holdingInfo : Ref<any> = ref([])
	const holdError : Ref<boolean> = ref(false)
	// trend 接口，趋势图
	const trendChart : Ref<any> = ref({})

	const getDetails = async (bibId : string) => {
		bookBibId.value = bibId
		const res = await deatileApi(bibId)
		if (res) {
			let info = res.data.map
			baseInfo.value = info.baseInfo.map
			detailInfo.value = info.detailInfo.map
			extraInfo.value = info.extraInfo.map
		}

		/*
		 * 获取馆藏分布,数据格式为字符串
		 * 将字符串转化为数组：
		 * 数据解析步骤:
		 * 1.去除首尾[]
		 * 2.去除所有的\
		 * 3.按照', '分割为数组
		 */
		try {
			const resHold = await deatileHoldingApi(bibId)
			if (resHold) {
				let tempString = resHold.data.holdings
				// 处理
				tempString = tempString.substr(1)
				tempString = tempString.slice(0, tempString.length - 1)
				tempString = tempString.replace(",{", ", {")
				let tempStringArr = tempString.split(", ")
				for (let i = 0, len = tempStringArr.length; i < len; i++) {
					tempStringArr[i] = JSON.parse(tempStringArr[i])
				}
				holdingInfo.value = tempStringArr
			}
		} catch (err) {
			// 字符串处理异常，就不显示馆藏分布
			holdError.value = true
		}

		// 通过baseInfo里的isbn，获取其他信息
		const resExt = await deatileExtApi(baseInfo.value.isbn)
		resExt && (otherInfo.value = resExt.data)

		// 获取趋势图 lineCanvas
		const trendArr = await deatileTrendApi(bibId)
		if (trendArr) {
			trendChart.value = {
				canvas2d: true,
				// 放不下，只留一部分
				categories: Object.keys(trendArr.data).splice(-6),
				enableScroll: true,
				animation: false,
				background: "#f5f5f5",
				series: [
					{
						name: "借阅量",
						data: Object.values(trendArr.data).splice(-6),
					},
				],
				yAxis: {
					title: "借阅量",
					min: 0,
				},
				dataLabel: false,
				extra: {
					lineStyle: "curve",
				},
			}
		}
	}
	onLoad((e) => e && getDetails(e.bibId))

	// #ifdef MP-WEIXIN
	// 涉及到onLoad的页面，需要单独设置一下分享
	// 并且要和 onLoad方法的参数相匹配
	onShareAppMessage(() => {
		//发送给朋友
		return {
			title: '科大图书精灵',
			path: "page-home/detail?bibId=" + bookBibId.value,
			success: () => {
				uni.showToast({
					icon: "success",
					title: "分享成功"
				})
			}, fail: () => {
				uni.showToast({
					icon: "fail",
					title: "分享失败"
				})
			}
		}
	})

	onShareTimeline(() => {
		//分享到朋友圈
		return {
			title: '科大图书精灵',
			path: "page-home/detail?bibId=" + bookBibId.value
		}
	})

	// #endif
</script>

<style scoped lang="scss">
	// 书籍介绍
	.tr {
		display: flex;
	}

	.left-style {
		width: 30%;
		text-align: right;
	}

	.right-style {
		text-align: left;
		width: 70%;
	}

	//
	.canvas {
		width: 750rpx;
		height: 500rpx;
	}
</style>