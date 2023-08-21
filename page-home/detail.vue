<template>
	<uni-card :title="baseInfo?.title" margin="5px" is-shadow>
		<view class="box-head">
			<view v-for="(val,key,index) in detailInfo" :key="index" class="info">
				<div class="tr">
					<div class="left-style">{{key}}</div>:
					<div class="right-style"><span v-html="val" class=""></span></div>
				</div>

			</view>
		</view>
	</uni-card>
	<view v-if="!holdError" class="">
		<uni-table>
			<uni-tr>
				<uni-th align="center">索书号</uni-th>
				<uni-th align="center">所属馆藏</uni-th>
				<uni-th align="center">书刊状态</uni-th>
			</uni-tr>
			<uni-tr v-for="(item,index) in holdingInfo" :index="index">
				<uni-td>{{item.callNo}}</uni-td>
				<uni-td>{{item.location}}</uni-td>
				<uni-td>{{item.status}}</uni-td>
			</uni-tr>
		</uni-table>
	</view>

	<uni-card title="书目简介" v-if="otherInfo.content" is-shadow>
		<!-- <template v-slot:title>
			<view class="" style="display: flex;justify-content: space-between;">
				<view class="">
					书目简介
				</view>
				<view class="">
					展开
				</view>
			</view>
		</template> -->
		<view v-html="otherInfo.content" class="box-content">
		</view>
	</uni-card>
	<uni-card v-if="otherInfo.authorInfo" title="作者" is-shadow>
		<view v-html="otherInfo.authorInfo" class="box-author">
		</view>
	</uni-card>
	<qiun-data-charts :ontouch="true" type="line" :chartData="trendChart" />

	<uni-card title="目录" margin="3px" v-if="otherInfo.catalog" class="目录" is-shadow>
		<view v-html="otherInfo.catalog" class="box-catalog">
		</view>
	</uni-card>
</template>


<script setup lang="ts">
	// 书籍详情的接口：
	// infos 获取baseInfo，放在顶部
	// info 获取详细信息，放在下面：章节信息，作者简介，书目简介，封面
	// trend 获取图表
	// holdings 获取馆藏信息
	import { ref } from "vue"
	import { deatileApi, deatileExtApi, deatileTrendApi, deatileHoldingApi } from "@/api/huiwen/home.js"
	import { onLoad } from "@dcloudio/uni-app"
	// infos接口的内容
	const baseInfo = ref({})
	const detailInfo = ref({})
	const extraInfo = ref({})
	// info接口下的内容
	const otherInfo = ref({}) //
	// 馆藏分布内容
	const holdingInfo = ref([])
	const holdError = ref(false)
	// trend 接口，趋势图
	const trendChart = ref({})
	const getDetails = async (bibId) => {
		const res = await deatileApi(bibId)
		if (res) {
			let info = res.data.map
			baseInfo.value = info.baseInfo.map
			detailInfo.value = info.detailInfo.map
			extraInfo.value = info.extraInfo.map
			// info.value=res.
		}

		// 获取馆藏分布
		/* 数据解析步骤
		* 去除首尾[]
		* 去除所有的\
		* 按照', '分割为数组
		* 
		*/
		try {
			const resHold = await deatileHoldingApi(bibId);
			if (resHold) {
				let tempString = resHold.data.holdings
				// 处理
				tempString = tempString.substr(1)
				tempString = tempString.slice(0, tempString.length - 1)
				let tempStringArr = tempString.split(', ')
				console.log(tempStringArr)
				for (let i = 0, len = tempStringArr.length; i < len; i++) {
					tempStringArr[i] = JSON.parse(tempStringArr[i])
				}
				console.log('tempStringArr', tempStringArr)
				holdingInfo.value = tempStringArr
			}
		} catch (err) {
			holdError.value = true
		}

		// 通过baseInfo里的isbn，获取其他信息
		const resExt = await deatileExtApi(baseInfo.value.isbn)
		if (resExt) {
			otherInfo.value = resExt.data
		}
		// 获取趋势图
		const trendArr = await deatileTrendApi(bibId)
		if (trendArr) {
			//lineCanvas
			trendChart.value = {
				canvas2d: true,
				categories: Object.keys(trendArr.data).splice(-6),
				enableScroll: true,
				animation: false,
				background: '#f5f5f5',
				series: [{
					name: '借阅量',
					data: Object.values(trendArr.data).splice(-6),
				}],
				yAxis: {
					title: '借阅量',
					min: 0
				},
				dataLabel: false,
				extra: {
					lineStyle: 'curve'
				}
			}
		}
	}
	onLoad((e) => {
		if (e) {
			getDetails(e.bibId)
		}

	})
</script>

<style scoped lang="scss">
	.tr {
		display: flex;
	}

	.left-style {
		width: 30%;
		/* justify-content: flex-end; */
		/* float: right; */
		text-align: right;
	}

	.right-style {
		text-align: left;
		width: 70%;
	}

	.canvas {
		width: 750rpx;
		height: 500rpx;
	}
</style>