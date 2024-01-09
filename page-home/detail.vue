<template>
	<ListNavBar title="书籍详情"></ListNavBar>
	<uni-card :title="baseInfo?.title" margin="0px" padding="4px" is-shadow :extra="extraInfo._clickCount + '浏览'">
		<view class="box-head">
			<view v-for="(val, key, index) in detailInfo" :key="index">
				<div class="tr">
					<div class="left-style">{{ key }}</div>
					<div class="right-style"><span v-html="val"></span></div>
				</div>
			</view>
			<view class="self-center-box">
				<uni-tag type="theme" circle inverted text="分享" @tap="showShareModel"></uni-tag>
			</view>
		</view>
	</uni-card>
	<uni-collapse>
		<template v-if="!holdError">
			<uni-collapse-item open title-type title="馆藏查询" show-animation>
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
			</uni-collapse-item>
		</template>
		<!-- lazy-tag是 懒加载 的标志，到这里，就请求下面的内容 -->
		<uni-collapse-item class="lazy-tag" title="书目简介" title-type open show-animation>
			<template v-if="otherInfo.content">
				<uni-card is-shadow>
					<view v-html="otherInfo.content"> </view>
				</uni-card>
			</template>
		</uni-collapse-item>
		<uni-collapse-item title="作者" title-type open show-animation>
			<template v-if="otherInfo.authorInfo">
				<uni-card is-shadow>
					<view v-html="otherInfo.authorInfo"> </view>
				</uni-card>
			</template>
		</uni-collapse-item>

		<uni-collapse-item title="目录" title-type show-animation>
			<template v-if="otherInfo.catalog">
				<uni-card margin="1px" padding="5px" is-shadow>
					<view class="box-catalog" v-html="otherInfo.catalog"> </view>
				</uni-card>
			</template>
		</uni-collapse-item>
	</uni-collapse>

	<qiun-data-charts :ontouch="true" type="line" :chart-data="trendChart" />
</template>

<script setup lang="ts">
	// 书籍详情的接口：
	// infos 获取baseInfo，放在顶部
	// info 获取详细信息(other)，放在下面：章节信息，作者简介，书目简介，封面
	// trend 获取图表
	// holdings 获取馆藏信息
	import { ref, Ref } from "vue"
	import { deatileApi, deatileExtApi, deatileTrendApi, deatileHoldingApi } from "@/api/huiwen/home"
	import { onLoad, onShareAppMessage, onShareTimeline, onReady } from "@dcloudio/uni-app"
	import type { baseInfoType, extraInfoType, otherInfoType } from "@/page-home/utils/types.d"

	const bookBibId = ref("")

	// infos接口的内容
	const baseInfo : Ref<baseInfoType> = ref({
		author: "",
		docType: "",
		isbn: "",
		title: "",
	})
	const detailInfo : Ref<any> = ref({})// 对象的键是中文
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

	// 获取书籍的基础信息
	const getBaseInfo = async (bibId : string) => {
		const res = await deatileApi(bibId)
		if (res) {
			let info = res.data.map
			baseInfo.value = info.baseInfo.map
			detailInfo.value = info.detailInfo.map
			extraInfo.value = info.extraInfo.map
		}
	}

	// 获取馆藏分布表格
	const getTableInfo = async (bibId : string) => {
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
	}

	// 获取图表信息
	const getEChartInfo = async (bibId : string) => {
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

	// 本页面一个 四个接口，先获取两个，再懒加载
	const getBookDetails = (bibId : string) => {
		bookBibId.value = bibId
		getBaseInfo(bibId)
		getTableInfo(bibId)
	}

	onLoad((e) => e && getBookDetails(e.bibId))

	// 懒加载
	onReady(() => {
		uni.createIntersectionObserver(this).relativeToViewport({ bottom: 30 }).observe('.lazy-tag', async (res) => {
			// 懒加载，获取剩余两个接口
			// 通过baseInfo里的isbn，获取其他信息
			const resExt = await deatileExtApi(baseInfo.value.isbn)
			resExt && (otherInfo.value = resExt.data)

			getEChartInfo(bookBibId.value)
		})
	})

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

	// 分享相关
	const savePage2Img = () => {

	}

	const saveCallNumber = () => {
		console.log("baseInfo", baseInfo.value)
		uni.setClipboardData({
			data: detailInfo.value["中图法分类号"] ?? ""
		})
	}

	const showShareModel = () => {
		uni.showActionSheet({
			itemList: ['图片分享', '复制索书号', '分享页面(暂不支持)'],
			success: (res) => {
				if (res.tapIndex === 0) {
					savePage2Img()
				} else if (res.tapIndex === 1) {
					saveCallNumber()
				} else {
					// uni.share({

					// })
				}
				console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
			},
			fail: (res) => {
				uni.showToast({
					title: "分享失败",
					icon: "error"
				})
			}
		});
	}
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

	.left-style::after {
		content: ":";
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