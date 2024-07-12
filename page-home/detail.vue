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
			<view v-if="false" class="self-center-box">
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
		<!-- lazy-tag是 懒加载 的标志，可视区域滚动到这里，就请求下面的内容 -->
		<uni-collapse-item class="lazy-tag" title="书目简介" title-type open show-animation>
			<template v-if="otherInfo.content">
				<uni-card is-shadow>
					<view v-html="otherInfo.content"> </view>
				</uni-card>
			</template>
		</uni-collapse-item>
		<template v-if="otherInfo.authorInfo">
			<uni-collapse-item title="作者" title-type open show-animation>
				<uni-card is-shadow>
					<view v-html="otherInfo.authorInfo"> </view>
				</uni-card>
			</uni-collapse-item>
		</template>

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

	// const startDrawLoad = ref(true)
	const bookBibId = ref("")
	const baseInfoRef = ref(null)
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

	// 本页面一个 四个接口，先获取三个，再懒加载
	const getBookDetails = async (bibId : string) => {
		bookBibId.value = bibId
		await getBaseInfo(bibId)
		await getTableInfo(bibId)
		// 通过baseInfo里的isbn，获取其他信息
		const resExt = await deatileExtApi(baseInfo.value.isbn)
		resExt && (otherInfo.value = resExt.data)
	}


	// onLoad(e => e && getBookDetails(e.bibId))

	onLoad((option) => {
		if (option) {
			getBookDetails(option.bibId)

		}
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
	})

	// 懒加载,绑定监听
	onReady(() => {
		// 当前面的接口获取完成后，再监听交叉，
		// 防止没内容时，误触发
		let startTimer = setTimeout(() => {
			let observer = uni.createIntersectionObserver(this);
			observer.relativeToViewport({ bottom: 30 }).observe('.lazy-tag', async (res) => {
				// 懒加载，获取剩余一个接口
				getEChartInfo(bookBibId.value)
				observer.disconnect()// 解除监听
			})
			clearTimeout(startTimer)
		}, 2000)
	})

	// #ifdef MP-WEIXIN
	// 涉及到onLoad的页面，需要单独设置一下分享
	// 并且要和 onLoad方法的参数相匹配


	// #endif

	// 分享相关
	const savePage2Img = () => {
	}

	const saveCallNumber = () => {
		uni.setClipboardData({// 类型必须为字符串
			data: detailInfo.value["中图法分类号"] ?? ""
		})
	}

	const showShareModel = () => {
		// 将基本信息，画到canvas上
		setTimeout(() => {
			uni.createSelectorQuery().select('#baseInfo').fields({ node: true, size: true }).exec(res => {
				const canvas = res[0].node
				let ctx = canvas.getContext('2d')
				// 先配置ctx
				const dpr = uni.getSystemInfoSync().pixelRatio
				canvas.width = res[0].width * dpr
				canvas.height = res[0].height * dpr
				ctx.scale(dpr, dpr)
				console.log("ctx", ctx)
				// 画标题
				ctx.font = "20px"
				let tempList = {
					"ISBN及定价": "7-5628-1346-9 CNY15.00",
					"个人责任者": "<a style='color:#006fcc' href='{meta}/#/search?query=authors,*,%E8%AE%B8%E5%BF%97%E7%BE%8E'>许志美</a> 编著 <a style='color:#006fcc' href='{meta}/#/search?query=authors,*,%E5%BC%A0%E6%BF%82'>张濂</a> 编著 <a style='color:#006fcc' href='{meta}/#/search?query=authors,*,%E8%A2%81%E5%90%91%E5%89%8D'>袁向前</a> 编著",
					"中图法分类号": "TQ03-44",
					"书目附注": "有书目 (第224页)",
					"使用对象附注": "读者对象：一般读者。",
					"出版发行项": "上海:<a style='color:#006fcc' href='{meta}/#/search?query=publisher,*,%E5%8D%8E%E4%B8%9C%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6%E5%87%BA%E7%89%88%E7%A4%BE'>华东理工大学出版社</a>,2002",
					"学科主题": "<a style='color:#006fcc' href='{meta}/#/search?query=subjects,*,%E5%8C%96%E5%AD%A6%E5%8F%8D%E5%BA%94%E5%B7%A5%E7%A8%8B'>化学反应工程</a> 教学参考资料 <a style='color:#006fcc' href='{meta}/#/search?query=subjects,*,%E9%AB%98%E7%AD%89%E5%AD%A6%E6%A0%A1'>高等学校</a>",
					"并列正题名": "Chemical reaction engineering:",
					"提要文摘附注": "本书以例题与习题的形式把化学反应工程的基本概念、重要观点和工程分析方法加以再现。",
					"电子资源": "<a style='color:#006fcc' href='753734.htm'>753734.htm</a>",
					"相关题名附注": "封面英文题名：Chemical reaction engineering",
					"载体形态项": "224页:图;21cm",
					"题名/责任者": "化学反应工程原理例题与习题:许志美, 张濂, 袁向前编著",
				}

				ctx.fillText("sassasssassasa", 10, 20)
				// ctx.fillText(baseInfo.value?.title, 20, 40)
				// ctx.lineWidth(1)
				// 画书籍详情
				ctx.font = "14px"
				let showKeys = ['题名/责任者', 'ISBN及定价', '中图法分类号', '出版发行项', '学科主题']
				Object.keys(tempList).forEach((key : string, index : number) => {
					let isATag = tempList[key].match(/<a[^>]*>([^<]*)<\/a>/)
					let valueOfKey = isATag ? isATag[1] : tempList[key]
					ctx.fillText(key + ':' + valueOfKey, 10, 30 + index * 20)
				});
				// Object.keys(detailInfo.value).forEach((key : string, index : number) => {
				// 	ctx.fillText(key + ':' + detailInfo.value[key], 20, 42 + index * 20, 320)
				// });

				// ctx.draw()
			});
		}, 2000)

		// const ctx = uni.createCanvasContext('baseInfo',);

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